import { getCurrentDir, readSvgCode } from "@mni/build-tools";
import { writeFileSync } from 'fs';
import { resolve } from "path";

const currentDir = getCurrentDir(import.meta.url);
const iconNodesJson = resolve(currentDir, "../../../../static/icon-nodes.json");

const iconNodesContent = await readSvgCode(iconNodesJson)

const template = `[${(iconNodesContent)}]`

writeFileSync(iconNodesJson, template.replace(',\n]', ']'), 'utf-8')
