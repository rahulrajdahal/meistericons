import path from "path";
import { getCurrentDir, readIconFiles, toPascalCase } from "./helpers";
import { appendFileSync, writeFileSync } from "fs";

const currentDir = getCurrentDir(import.meta.url);

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
};

const targetDir = path.join(currentDir, "../../packages/react/lib");
const iconsDir = path.resolve(currentDir, "../../icons");
const typesFileName = "meistericons-react.d.ts";

// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
declare module 'meistericons-react'

export interface SVGProps extends Partial<SVGElement> ${JSON.stringify(
  defaultAttributes,
  null,
  2
)}

export declare type IconNodeChild = readonly [string, object];
export declare type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]];
export declare type CustomAttrs = { [attr:string]: any }
export type Icons = { [key: string]: IconNode }

export interface CreateIconsOptions {
 
  icons: Icons;

  
  nameAttr?: string;

  attrs?: CustomAttrs;
}

export function createElement(icon: IconNode): SVGSVGElement;
export function createIcons(options: CreateIconsOptions): void;

export declare const icons: Icons;

// Generated icons
`;

writeFileSync(path.resolve(targetDir, typesFileName), typeDefinitions, "utf-8");

const iconFiles = readIconFiles(iconsDir);

iconFiles.forEach((iconFile) => {
  const namePascal = toPascalCase(iconFile);

  appendFileSync(
    path.resolve(targetDir, typesFileName),
    `export declare const ${namePascal}: MeisterIcon;\n`,
    "utf-8"
  );
});

console.log(`Generated ${typesFileName} file with`, iconFiles.length, "icons");
