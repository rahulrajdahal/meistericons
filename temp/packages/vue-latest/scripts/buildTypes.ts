import { appendFileSync, writeFileSync } from "fs";
import {
  getCurrentDir,
  readIconFiles,
  toPascalCase,
} from "../../../scripts/helpers";
import path from "path";

const currentDir = getCurrentDir(import.meta.url);
const targetDir = path.join(currentDir, "../../lib");
const iconsDir = path.resolve(currentDir, "../../../../icons");
const typesFileName = "meistericons-vue-latest.d.ts";

const typeDefinitions = `\
import { FunctionalComponent, SVGAttributes} from "vue";

interface SVGProps extends Partial<SVGAttributes> {
    size: 24;
    fill: "currentColor";
}

export type Icon = (props:SVGProps)=>FunctionalComponent<SVGProps>

// Generated icons
`;

writeFileSync(path.resolve(targetDir, typesFileName), typeDefinitions, "utf-8");

const iconFiles = readIconFiles(iconsDir);

iconFiles.forEach((iconFile) => {
  const namePascal = toPascalCase(iconFile);

  appendFileSync(
    path.resolve(targetDir, typesFileName),
    `export declare const ${namePascal}: Icon;\n`,
    "utf-8"
  );
});

console.log(`Generated ${typesFileName} file with`, iconFiles.length, "icons");
