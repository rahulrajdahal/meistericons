

import { generateExportFile, generateIconFile, getCurrentDir, readIconFiles, readSvgCode } from '@mni/build-tools';
import crypto from 'crypto';
import getCliArguments from 'minimist';
import { appendFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import path from "node:path";
import { parseSync } from "svgson";

const { pkg = 'react' } = getCliArguments(process.argv.slice(2))

const currentDir = getCurrentDir(import.meta.url);
const iconsDir = path.resolve(currentDir, "../../static/icons");
const iconNodesJson = path.resolve(currentDir, "../../static/icon-nodes.json");
const targetDir = path.resolve(currentDir, `../../${pkg}/icons`);

let totalIcons = 0

if (existsSync(`${targetDir}/index.ts`)) {
    unlinkSync(`${targetDir}/index.ts`)
}

if (existsSync(targetDir)) {
    unlinkSync(iconNodesJson)
}

readdirSync(iconsDir).forEach(async (category: string, i) => {
    if(category!=='index.ts')
        
       { const categoryDir = path.resolve(iconsDir, category);
    const iconCategories = readIconFiles(categoryDir).sort((a, b) => a.localeCompare(b))
    
    iconCategories.forEach(async (iconFile) => {
        const svgFile = path.resolve(iconsDir, `${category}/${iconFile}.svg`);
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
}})

console.log(`Generated ${totalIcons} icons.- ${pkg}`);