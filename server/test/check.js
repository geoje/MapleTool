import http from "k6/http";
import { check } from "k6";

export let options = { vus: 1000, duration: "10s", rps: 1000 };

export default function () {
  let res = http.get(
    "http://be:8080/api/character/item-equipment/potentials?type=%EB%B8%94%EB%9E%99&part=%EB%AC%B4%EA%B8%B0&level=200"
  );

  check(res, {
    "is status 200": (r) => r.status === 200,
    "response time is less than 1000ms": (r) => r.timings.duration < 1000,
  });
}
