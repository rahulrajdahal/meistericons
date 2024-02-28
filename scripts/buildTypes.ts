import { appendFileSync, readdirSync, writeFileSync } from "fs";
import getCliArguments from 'minimist';
import path from "path";
import { getCurrentDir, readIconFiles, toPascalCase } from "./helpers";

const currentDir = getCurrentDir(import.meta.url);
const { pkg = 'react' } = getCliArguments(process.argv.slice(2))

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
};

const targetDir = path.join(currentDir, `../../packages/${pkg}/lib`);
const iconsDir = path.resolve(currentDir, "../../icons");

const vuePackage = pkg === 'vue' ? 'vue' : 'vue-latest'
const typesFileName = `meistericons-${pkg === 'react' ? 'react' : vuePackage}.d.ts`;

const vueImport = pkg === 'vue' ? `import { Component } from "vue"` : `import { FunctionalComponent, SVGAttributes } from "vue"`
const importStatement = pkg === 'react' ? `import { MeisterIcon } from '../src/createMeisterIcons'` : vueImport


const types = pkg === 'vue-latest' ? `interface SVGProps extends Partial<SVGAttributes> {
  size: 24;
  fill: "currentColor";
}

export type Icon = (props: SVGProps) => FunctionalComponent<SVGProps>;
`: `export interface SVGProps extends Partial<SVGElement> ${JSON.stringify(
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
`


// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
${importStatement}
declare module 'meistericons-${pkg}'

${types}
// Generated icons
`;

writeFileSync(path.resolve(targetDir, typesFileName), typeDefinitions, "utf-8");

const iconFiles = readIconFiles(iconsDir);

const vueReturnType = pkg === 'vue-latest' ? 'Icon;' : "Component"

let totalIcons = 0;

readdirSync(iconsDir).forEach(async (category: string) => {
  const categoryDir = path.resolve(iconsDir, category);
  const iconCategories = readIconFiles(categoryDir).sort((a, b) => a.localeCompare(b))

  iconCategories.forEach(async (iconFile) => {

    const namePascal = toPascalCase(iconFile);
    appendFileSync(
      path.resolve(targetDir, typesFileName),
      `export declare const ${namePascal}: ${pkg === 'react' ? 'MeisterIcon;' : vueReturnType}\n`,
      "utf-8"
    );
    totalIcons++
  })
  console.log(`Generated ${iconCategories.length} icon files for`, category, "icon");
})

console.log(`Generated ${typesFileName} file with`, totalIcons, "icons");



