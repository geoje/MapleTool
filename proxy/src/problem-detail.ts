import type { Context } from "hono";
import { NexonApiError } from "./nexon-error.js";

export class ValidationError extends Error {
  constructor(public readonly fields: Record<string, string>) {
    super("입력 값이 잘못되었습니다.");
    this.name = "ValidationError";
  }
}

export function requireName(c: Context): string {
  const name = c.req.query("name");
  if (!name || !name.trim()) {
    throw new ValidationError({ name: "필수 입력 값 입니다." });
  }
  return name;
}

export function toProblemResponse(error: unknown): { body: Record<string, unknown>; status: number } {
  if (error instanceof ValidationError) {
    return {
      status: 400,
      body: { title: "Bad Request", status: 400, detail: error.message, fields: error.fields },
    };
  }

  if (error instanceof NexonApiError) {
    return {
      status: error.status,
      body: { title: "Nexon API Error", status: error.status, detail: error.message },
    };
  }

  return {
    status: 500,
    body: { title: "Internal Server Error", status: 500, detail: "서버에 문제가 발생하였습니다." },
  };
}
