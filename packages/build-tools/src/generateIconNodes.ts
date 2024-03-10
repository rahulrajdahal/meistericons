import * as icons from '@mni/static';
import crypto from 'node:crypto';
import { appendFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseSync } from 'svgson';
import { getCurrentDir, toKebabCase } from '..';


const currentDir = getCurrentDir(import.meta.url);
const targetDir = path.resolve(currentDir, `../../../static/icon-nodes.json`);

writeFileSync(targetDir, `[\n`);

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


        if (icon[0] === Object.keys(icons).at(-2)) {
            appendFileSync(targetDir, `${JSON.stringify({ [toKebabCase(icon[0])]: parsedSvg.children.map(({ name, attributes }) => [name, attributes]) })}\n`);
        } else {
            appendFileSync(targetDir, `${JSON.stringify({ [toKebabCase(icon[0])]: parsedSvg.children.map(({ name, attributes }) => [name, attributes]) })},\n`);
        }
    }
}
appendFileSync(targetDir, `\n]`);

