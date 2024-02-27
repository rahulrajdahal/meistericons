import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { optimize } from "svgo";
import { getCurrentDir, readIconFiles, readSvgCode } from './helpers';


const currentDir = getCurrentDir(import.meta.url);
const iconsDir = resolve(currentDir, "../../icons");

let totalIcons = 0

readdirSync(iconsDir).forEach((category: string) => {
    const categoryDir = resolve(iconsDir, category);
    const iconCategories = readIconFiles(categoryDir);

    iconCategories.forEach(async (iconFile) => {
        const svgFile = resolve(iconsDir, `${category}/${iconFile}.svg`);

        const svgCode = await readSvgCode(svgFile);

        const optimizedResult = optimize(svgCode, {
            multipass: true,
            js2svg: {
                indent: 2,
                pretty: true,
            },
            plugins: [
                { name: "preset-default", params: { overrides: { removeViewBox: false } } },
                "removeDimensions",
                "sortAttrs",
                "prefixIds",
                {
                    name: "removeAttrs",
                    params: {
                        attrs: ["fill-rule", "clip-rule"],
                        elemSeparator: ":",
                        preserveCurrentColor: false,
                    },
                },
            ],
        });
        writeFileSync(resolve(iconsDir, `${category}/${iconFile}.svg`), optimizedResult.data, 'utf-8')
    })



    console.log(`Optimized ${iconCategories.length} icons for ${category} Category`)
    totalIcons += iconCategories.length
})
console.log(`Optimized ${totalIcons} icons.`)
