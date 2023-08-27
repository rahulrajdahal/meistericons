import path from "path";
import { readSvgDir } from "./helpers";

async function getAliases(iconDir: string) {
  const iconJsons = readSvgDir(iconDir, ".json");
  const aliasesEntries = await Promise.all(
    iconJsons.map(async (json) => {
      const file = await import(path.join(iconDir, json));
      return [path.basename(json, ".json"), file.default];
    })
  );

  return Object.fromEntries(aliasesEntries);
}

export default getAliases;
