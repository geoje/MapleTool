import http from "k6/http";
import { check } from "k6";

export const options = { vus: 100, duration: "1m", rps: 100 };

export default function () {
  const res = http.get(
    "http://be:8080" +
      "/api/character/item-equipment/potentials" +
      "?type=%EB%B8%94%EB%9E%99&part=%EB%AC%B4%EA%B8%B0&level=200"
  );

  check(res, {
    "is status 200": (r) => r.status === 200,
    // "response time is less than 1000ms": (r) => r.timings.duration < 1000,
  });

  console.log(res.status_text, res.body.length);
}
