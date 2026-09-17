import { Hono } from "hono";
import { nexon } from "../nexon.js";
import { requireName, toProblemResponse } from "../problem-detail.js";

export const union = new Hono();

union.get("/basic", async (c) => {
  try {
    const name = requireName(c);
    return c.json(await nexon.getUnionBasic(name));
  } catch (error) {
    const { body, status } = toProblemResponse(error);
    return c.json(body, status as never);
  }
});

union.get("/artifact", async (c) => {
  try {
    const name = requireName(c);
    return c.json(await nexon.getUnionArtifact(name));
  } catch (error) {
    const { body, status } = toProblemResponse(error);
    return c.json(body, status as never);
  }
});
