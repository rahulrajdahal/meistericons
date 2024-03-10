import { appendFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

var generateExportFile = (iconFile, pkg = "react") => {
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../../${pkg}/icons`);
  const importIconString = `export {default as  ${toPascalCase(
    iconFile
  )}} from './${toPascalCase(iconFile)}';
`;
  appendFileSync(path.resolve(targetDir, `index.ts`), importIconString, "utf-8");
};

var generateIconFile = (iconNodes, iconPackage = "react") => {
  const name = iconNodes[0];
  const paths = iconNodes[1];
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../../${iconPackage}/icons`);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir);
  }
  const template = `
  import createMeisterIcons from '../src/createMeisterIcons';

  const ${toPascalCase(name)} = createMeisterIcons("${name}", ${JSON.stringify(
    paths
  )})


  export default ${toPascalCase(name)}
  `;
  writeFileSync(path.join(targetDir, `${toPascalCase(name)}.ts`), template, "utf-8");
};

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor"
};
var generateTypes = (iconName, iconPackage) => {
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../../${iconPackage}/lib`);
  let pkg = iconPackage.includes("../") ? iconPackage.replaceAll("../", "") : iconPackage;
  const vuePackage = pkg === "vue" ? "vue" : "vue-latest";
  const typesFileName = `meistericons-${pkg === "react" ? "react" : vuePackage}.d.ts`;
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir);
    const vueImport = pkg === "vue" ? `import { Component } from "vue"` : `import { FunctionalComponent, SVGAttributes } from "vue"`;
    const importStatement = pkg === "react" ? `import { MeisterIcon } from '../src/createMeisterIcons'` : vueImport;
    const types = pkg === "vue-latest" ? `interface SVGProps extends Partial<SVGAttributes> {
        size: 24;
        fill: "currentColor";
      }
      
      export type Icon = (props: SVGProps) => FunctionalComponent<SVGProps>;
      ` : `export interface SVGProps extends Partial<SVGElement> ${JSON.stringify(
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
      `;
    const typeDefinitions = `    ${importStatement}
    declare module 'meistericons-${pkg}'
    
    ${types}
    // Generated icons
    `;
    writeFileSync(path.resolve(targetDir, typesFileName), typeDefinitions, "utf-8");
  }
  const vueReturnType = pkg === "vue-latest" ? "Icon;" : "Component;";
  appendFileSync(
    path.resolve(targetDir, typesFileName),
    `export declare const ${iconName}: ${pkg === "react" ? "MeisterIcon;" : vueReturnType}
`,
    "utf-8"
  );
  console.log(`Added ${iconName} icon type for meistericons-${pkg}`);
};

const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toPascalCase = (string) => toCamelCase(string).charAt(0).toUpperCase() + toCamelCase(string).slice(1);
const getCurrentDir = (filePath) => fileURLToPath(new URL(filePath));
const readIconFiles = (iconDir) => readdirSync(iconDir).map((iconFile) => iconFile.replace(/.svg/, ""));
const readSvgCode = async (file) => readFileSync(file);
const readAllMetadata = (dir) => readdirSync(dir).reduce((acc, fileName, i) => {
  acc[path.basename(fileName, ".svg")] = readSvgCode(fileName);
  return acc;
}, {});

export { generateExportFile, generateIconFile, generateTypes, getCurrentDir, readAllMetadata, readIconFiles, readSvgCode, toCamelCase, toKebabCase, toPascalCase };
