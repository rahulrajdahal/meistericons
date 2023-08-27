import path from "path";
import defaultAttributes from "./defaultAttributes";
import {
  writeFile,
  readSvgDir,
  toPascalCase,
  appendFile,
  getCurrentDirPath,
} from "./helpers";

const typesFilename = "meistericons.d.ts";

const targetDir = path.join(__dirname, "../../react/src");
const iconsDir = path.resolve(process.cwd(), "./icons");

const typeDefinitions = `\
declare module "meistericons";

export interface SVGProps extends Partial<SVGElement> ${JSON.stringify(
  defaultAttributes,
  null,
  2
)}

export declare type IconNodeChild = readonly [string, object];
export declare type IconNode = readonly [tag:string, attrs:SVGProps, children?: IconNodeChild[]];
export declare type CustomAttrs = { [attr: string]: any };
export type Icons = { [key: string]: IconNode };

export interface CreateIconsOptions {
    icons: Icons;

    nameAttr?: string;

    attrs?: CustomAttrs
}

export function createElement(icon: IconNode): SVGElement;
export function createIcons(options: CreateIconsOptions): void;

export declare const icons: Icons;
`;

writeFile(typeDefinitions, typesFilename, targetDir);

const svgFiles = readSvgDir(iconsDir);

svgFiles.forEach((svgFile) => {
  const svgName = path.basename(svgFile, ".svg");
  const pascalCaseName = toPascalCase(svgName);

  appendFile(
    `export declare const ${pascalCaseName}: IconNode;\n`,
    typesFilename,
    targetDir
  );
});

console.log(`Generated ${typesFilename} file`);
