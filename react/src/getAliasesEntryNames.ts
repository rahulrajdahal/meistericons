import path from "path";
import getAliases from "../../scripts/getAliases";

const iconsDir = path.resolve("../../icons");

export default async function getAliasesEntryNames() {
  const metaJsonFiles = await getAliases(iconsDir);

  const iconWithAliases = Object.values(metaJsonFiles).filter(
    ({ aliases }: any) => aliases !== null
  );

  const aliases = iconWithAliases.flatMap(({ aliases }: any) => aliases);

  return aliases.map((alias) => path.join("src/icons", `${alias}.ts`));
}
