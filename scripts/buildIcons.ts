import { resolve } from "path";
import { getCurrentDir, readIconFiles, readSvgCode } from "./helpers";
import { parseSync } from "svgson";
import { pathToFileURL } from "bun";
import { appendFileSync, writeFileSync } from "fs";
import generateIconFile from "./generateIconFile";
import generateExportFile from "./generateExportFile";

const buildIcons = async () => {
  const currentDir = getCurrentDir(import.meta.url);
  const iconsDir = resolve(currentDir, "../../icons");

  const iconFiles = readIconFiles(iconsDir);

  iconFiles.forEach(async (iconFile) => {
    const svgFile = resolve(iconsDir, `${iconFile}.svg`);

    const svgCode = await readSvgCode(svgFile);

    const parsedSvg = parseSync(svgCode);

    parsedSvg.children.forEach((child) => {
      if (child.attributes.fill === "#000") {
        child.attributes.fill = "currentColor";
      }
    });

    const iconNodes = iconFiles.reduce((acc: any, { name }: any) => {
      acc[iconFile] = parsedSvg.children.map(({ name, attributes }: any) => [
        name,
        attributes,
      ]);

      return acc;
    }, {});

    const iconNodesJson = resolve(currentDir, "../../icon-nodes.json");

    appendFileSync(
      iconNodesJson,
      `${JSON.stringify(iconNodes, null, 2)},`,
      "utf-8"
    );
    generateIconFile(iconNodes);
    generateExportFile(iconFile);
  });

  console.log(`Generated ${iconFiles.length} icons`);
};

buildIcons();
