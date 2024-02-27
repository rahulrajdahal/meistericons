import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { getCurrentDir, readIconFiles, readSvgCode } from "./helpers";

export default async () => {

    const currentDir = getCurrentDir(import.meta.url);
    const targetDir = resolve(currentDir, "../../docs");
    const iconsDir = resolve(currentDir, "../../icons");


    const getIcons = async () => {
        const files = await Promise.all(readdirSync((iconsDir)).sort((a, b) => a.localeCompare(b)).map(async (iconDir) => {
            const categoryDir = resolve(iconsDir, iconDir);
            const iconCategories = readIconFiles(categoryDir).sort((a, b) => a.localeCompare(b))

            return await Promise.all(iconCategories.map(async (iconFile) => {
                const svgFile = resolve(iconsDir, `${iconDir}/${iconFile}.svg`);
                const svgCode = await readSvgCode(svgFile);

                return `<a href="/icons/${iconFile}" title="${iconFile}">${svgCode}</a>`
            }))
        }))

        return files;
    }





    const template = `# All Icons
    
<div class="all_icons_container">
${(await getIcons()).join('\n')}
</div>
`
    writeFileSync(resolve(targetDir, `./icons.md`), template.replaceAll(',', '\n'), "utf-8");


}