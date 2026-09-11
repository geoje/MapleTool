import ProblemDetail from "./problemDetail";

export default interface QueryError {
  status?: number;
  data?: ProblemDetail;
}
