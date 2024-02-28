import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { getCurrentDir, readIconFiles, readSvgCode } from "./helpers";

// export default async () => {

const currentDir = getCurrentDir(import.meta.url);
const targetDir = resolve(currentDir, "../../docs");
const iconsDir = resolve(currentDir, "../../icons");


const getIcons = async () => {
    const files = await Promise.all(readdirSync((iconsDir)).sort((a, b) => a.localeCompare(b)).map(async (iconDir) => {
        const categoryDir = resolve(iconsDir, iconDir);
        const iconCategories = readIconFiles(categoryDir).sort((a, b) => a.localeCompare(b))




        const categoryIcons = await Promise.all(iconCategories.map(async (iconFile, i) => {


            const svgFile = resolve(iconsDir, `${iconDir}/${iconFile}.svg`);
            const svgCode = await readSvgCode(svgFile);

            return `<a href="/icons/${iconFile}" title="${iconFile}">${svgCode.trim()}</a>`
        }))

return `

## ${iconDir}

<div class='all_icons_container'>
${categoryIcons}
</div>

        `

    }))


    return files;
}





const template = `# All Icons
    ${await getIcons()}
`
console.log(template, 'template')
writeFileSync(resolve(targetDir, `./icons.md`), template.replaceAll(',', '\n'), "utf-8");


// }