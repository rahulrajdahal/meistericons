import crypto from 'crypto';
import { appendFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import getCliArguments from 'minimist';
import path, { resolve } from "node:path";
import { parseSync } from "svgson";
import generateDoc from './generateDoc';
import generateExportFile from './generateExportFile';
import generateIconFile from './generateIconFile';
import { getCurrentDir, readIconFiles, readSvgCode } from "./helpers";

const { pkg='react' } = getCliArguments(process.argv.slice(2))


const currentDir = getCurrentDir(import.meta.url);
const iconsDir = resolve(currentDir, "../../static/icons");
const iconNodesJson = resolve(currentDir, "./../../static/icon-nodes.json");
const targetDir = resolve(currentDir, `../../${pkg}/icons`);


let totalIcons = 0

if (existsSync(targetDir)) {
  unlinkSync(`${targetDir}/index.ts`)
}

if (existsSync(targetDir)) {
  unlinkSync(iconNodesJson)
}

const buildIcons = async () => {
  readdirSync(iconsDir).forEach(async (category: string, i) => {
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

      appendFileSync(iconNodesJson, `${JSON.stringify(iconNodes, null, 2)},\n`);
      generateIconFile(iconNodes, pkg);
      generateExportFile(iconFile, pkg);
    })
    totalIcons += iconCategories.length

    console.log(`Generated ${iconCategories.length} icons for ${category} category`);



  })
  console.log(`Generated ${totalIcons} icons.`);
  await generateDoc();
}

buildIcons()







