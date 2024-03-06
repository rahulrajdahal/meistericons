import { getCurrentDir, readIconFiles, readSvgCode } from 'build-tools/helpers';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { resolve } from "path";

const currentDir = getCurrentDir(import.meta.url);
const iconsDir = resolve(currentDir, '../icons');

let totalIcons = 0

readdirSync(iconsDir).forEach((category: string) => {
    const categoryDir = resolve(iconsDir, category);
    const iconCategories = readIconFiles(categoryDir);

    iconCategories.forEach(async (iconFile) => {

        const svgFile = resolve(iconsDir, `${category}/${iconFile}.svg`);
        const svgCode = await readSvgCode(svgFile);
        const outputDir = resolve(currentDir, `../fonts`);
        const fontIconsDir = resolve(currentDir, '../fontIcons')

        if (!existsSync(outputDir)) {
            mkdirSync(outputDir)
        }
        if (!existsSync(fontIconsDir)) {
            mkdirSync(fontIconsDir)
        }

        writeFileSync(resolve(fontIconsDir, `${iconFile}.svg`), svgCode, 'utf-8')
    })
})
console.log(`Creating fonts...`)
