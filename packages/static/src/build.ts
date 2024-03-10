import { getCurrentDir, readIconFiles, readSvgCode, toPascalCase } from '@mni/build-tools';
import { appendFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';



const currentDir = getCurrentDir(import.meta.url)
const iconsDir = resolve(currentDir, '../../icons')

const writeFile = resolve(currentDir, '../../icons/index.ts')

if (existsSync(writeFile)) {
    unlinkSync(writeFile)
}

readdirSync(iconsDir).forEach(async (category: string, i) => {
    const categoryDir = resolve(iconsDir, category);
    const iconCategories = readIconFiles(categoryDir).sort((a, b) => a.localeCompare(b))


    iconCategories.forEach(async (iconFile) => {
        const svgFile = resolve(iconsDir, `${category}/${iconFile}.svg`)
        const svgCode = await readSvgCode(svgFile)

        appendFileSync(writeFile, `export const ${toPascalCase(iconFile)} = \`${svgCode}\`;\n`)
    })
})


