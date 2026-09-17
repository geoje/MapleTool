import { Hono } from "hono";
import { nexon } from "../nexon.js";
import { requireName, toProblemResponse } from "../problem-detail.js";

export const character = new Hono();

character.get("/basic", async (c) => {
  try {
    const name = requireName(c);
    return c.json(await nexon.getCharacterBasic(name));
  } catch (error) {
    const { body, status } = toProblemResponse(error);
    return c.json(body, status as never);
  }
});

character.get("/item-equipment", async (c) => {
  try {
    const name = requireName(c);
    return c.json(await nexon.getCharacterItemEquipment(name));
  } catch (error) {
    const { body, status } = toProblemResponse(error);
    return c.json(body, status as never);
  }
});
