import { getCurrentDir, readIconFiles, readSvgCode } from "./helpers";
import { parseSync } from "svgson";
import { appendFileSync, readdirSync } from "fs";
import generateIconFile from "./generateIconFile";
import generateExportFile from "./generateExportFile";
import getCliArguments from "minimist";
import path from "path";

const { outdir, ext = "js" } = getCliArguments(process.argv.slice(2));

const currentDir = getCurrentDir(import.meta.url);
const iconsDir = path.resolve(currentDir, "../../icons");

let totalIcons=0;

const buildIcons = async () => {
  readdirSync(iconsDir).forEach((category: string) => {
    const categoryDir = path.resolve(iconsDir, category);
    const iconFiles = readIconFiles(categoryDir);

    iconFiles.forEach(async (iconFile) => {
      const svgFile = path.resolve(categoryDir, `${iconFile}.svg`);

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
      const targetDir = path.resolve(currentDir, `../../${outdir}`);

      const iconNodesJson = path.resolve(currentDir, "../../icon-nodes.json");
      appendFileSync(iconNodesJson, `${JSON.stringify(iconNodes, null, 2)},`);
      generateIconFile(iconNodes, targetDir, ext);
      generateExportFile(iconFile, targetDir, ext);
      
    });
    console.log(
      `${category.toLocaleUpperCase()}: Generated ${iconFiles.length} icons`
    );
    totalIcons+=iconFiles.length

  });


  console.log(`Generated ${totalIcons} icons`);
};

buildIcons();
