import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CharacterBasic } from "../../types/character/characterBasic";

export function useBasic(params: { name: string }) {
  return useQuery({
    queryKey: ["character:basic", params],
    enabled: !!params.name,
    queryFn: async () =>
      (await axios.get<CharacterBasic>("/api/character/basic", { params }))
        .data,
  });
}
