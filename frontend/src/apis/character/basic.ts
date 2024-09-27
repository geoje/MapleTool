import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "/api/character/basic";

export default const 
export function useBasic(params: { name: string }) {
  return useQuery({
    queryKey: [ENDPOINT, params],
  });
}
