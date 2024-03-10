import { generateExportFile, generateIconFile, generateTypes, getCurrentDir, toKebabCase } from '@mni/build-tools';
import * as icons from '@mni/static';
import getCliArguments from 'minimist';
import crypto from 'node:crypto';
import { existsSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { parseSync } from 'svgson';

const currentDir = getCurrentDir(import.meta.url);

const { pkg } = getCliArguments(process.argv.slice(2))

const targetDir = path.resolve(currentDir, `../../${pkg}`);



if (existsSync(targetDir)) {
    unlinkSync(`${targetDir}/icons/index.ts`)
    unlinkSync(`${targetDir}/lib/meistericons-${pkg}.ts`)
}

for (const icon of Object.entries(icons)) {
    if (icon[0] !== 'icons') {
        const parsedSvg = parseSync(icon[1] as string);

        parsedSvg.children.forEach((child) => {
            if (!child.attributes.key) {
                child.attributes.key = crypto.randomBytes(20).toString('hex');
            }

            if (child.attributes.fill === "#000") {
                child.attributes.fill = "currentColor";
            }
        });


        const iconNodes = [toKebabCase(icon[0]), parsedSvg.children.map(({ name, attributes }) => [name, attributes])]

        generateIconFile(iconNodes, pkg);
        generateExportFile(iconNodes[0] as string, pkg);
        generateTypes(icon[0], pkg);

    }
}

