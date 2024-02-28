import crypto from 'crypto';
import { appendFileSync, readdirSync } from "fs";
import path, { resolve } from "path";
import { parseSync } from "svgson";
import generateDoc from './generateDoc';
import generateExportFile from "./generateExportFile";
import generateIconFile from "./generateIconFile";
import { getCurrentDir, readIconFiles, readSvgCode } from "./helpers";

const currentDir = getCurrentDir(import.meta.url);
const iconsDir = resolve(currentDir, "../../icons");


const buildIcons = async () => {
  let totalIcons = 0

  readdirSync(iconsDir).forEach(async (category: string) => {
    const categoryDir = path.resolve(iconsDir, category);
    const iconCategories = readIconFiles(categoryDir).sort((a, b) => a.localeCompare(b))

    iconCategories.forEach(async (iconFile) => {
      const svgFile = resolve(iconsDir, `${category}/${iconFile}.svg`);

      const svgCode = await readSvgCode(svgFile);

      const parsedSvg = parseSync(svgCode);


      parsedSvg.children.forEach((child) => {

        if (!child.attributes.key) {
          child.attributes.key = crypto.randomBytes(20).toString('hex');
        }


        if (child.attributes.fill === "#000") {
          child.attributes.fill = "currentColor";
        }
      });

      const iconNodes = iconCategories.reduce((acc: any, { name }: any) => {
        acc[iconFile] = parsedSvg.children.map(({ name, attributes }: any) => [
          name,
          attributes,
        ]);

        return acc;
      }, {});

      const iconNodesJson = resolve(currentDir, "../../icon-nodes.json");

      appendFileSync(iconNodesJson, `${JSON.stringify(iconNodes, null, 2)},`);
      generateIconFile(iconNodes);
      generateIconFile(iconNodes, 'vue');
      generateIconFile(iconNodes, 'vue-latest');
      generateExportFile(iconFile);
      generateExportFile(iconFile, 'vue');
      generateExportFile(iconFile, 'vue-latest');
    });
    await generateDoc();

    totalIcons += iconCategories.length

    console.log(`Generated ${iconCategories.length} icons for ${category} category`);

  })
  console.log(`Generated ${totalIcons} icons.`);



};

buildIcons();
