import { config } from "./config.js";
import { toNexonApiError } from "./nexon-error.js";

type NexonJson = Record<string, unknown>;

async function getJson(path: string, params: Record<string, string>): Promise<NexonJson> {
  const url = new URL(config.nexon.baseUrl + path);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const response = await fetch(url, {
    headers: { "x-nxopen-api-key": config.nexon.apiKey },
  });

  if (!response.ok) throw await toNexonApiError(response);

  return (await response.json()) as NexonJson;
}

async function getOcid(characterName: string): Promise<string> {
  const result = await getJson("/id", { character_name: characterName });
  return result.ocid as string;
}

export const nexon = {
  getOcid,
  getCharacterBasic: async (characterName: string) =>
    getJson("/character/basic", { ocid: await getOcid(characterName) }),
  getCharacterItemEquipment: async (characterName: string) =>
    getJson("/character/item-equipment", { ocid: await getOcid(characterName) }),
  getUnionBasic: async (characterName: string) =>
    getJson("/user/union", { ocid: await getOcid(characterName) }),
  getUnionArtifact: async (characterName: string) =>
    getJson("/user/union-artifact", { ocid: await getOcid(characterName) }),
};
