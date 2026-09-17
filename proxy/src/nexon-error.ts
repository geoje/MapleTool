export class NexonApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "NexonApiError";
  }
}

const KNOWN_ERRORS: Array<{ code: string; status: number; message: string }> = [
  { code: "OPENAPI00001", status: 502, message: "넥슨 API 에서 오류가 발생하였습니다." },
  { code: "OPENAPI00002", status: 500, message: "넥슨 API 권한이 없습니다." },
  { code: "OPENAPI00003", status: 500, message: "접속한지 오래 되었거나 유효하지 않은 식별자입니다." },
  { code: "OPENAPI00004", status: 400, message: "캐릭터가 존재하지 않거나 유효하지 않은 요청입니다." },
  { code: "OPENAPI00005", status: 500, message: "유효하지 않은 API 키입니다." },
  { code: "OPENAPI00006", status: 500, message: "유효하지 않은 게임 또는 API 경로입니다." },
  { code: "OPENAPI00007", status: 429, message: "호출 횟수가 많습니다. 잠시 후 다시 시도해주세요." },
  { code: "OPENAPI00009", status: 502, message: "넥슨 API 데이터 준비 중입니다." },
  { code: "OPENAPI00010", status: 502, message: "게임 점검 중입니다." },
  { code: "OPENAPI00011", status: 502, message: "넥슨 API 점검 중입니다." },
];

export async function toNexonApiError(response: Response): Promise<NexonApiError> {
  const body = await response.text().catch(() => "");
  const matched = KNOWN_ERRORS.find((error) => body.includes(error.code));

  if (matched) return new NexonApiError(matched.status, matched.message);

  return new NexonApiError(500, "서버에서 넥슨 API 호출 중 알 수 없는 문제가 발생하였습니다.");
}
