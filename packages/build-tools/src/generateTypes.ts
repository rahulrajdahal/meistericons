import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getCurrentDir } from "../index";

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
};

export default (iconName: string, iconPackage: string) => {
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../../${iconPackage}/lib`);

  let pkg = (iconPackage.includes('../'))
    ? iconPackage.replaceAll('../', '') : iconPackage

  const vuePackage = pkg === 'vue' ? 'vue' : 'vue-latest'
  const typesFileName = `meistericons-${pkg === 'react' ? 'react' : vuePackage}.d.ts`;

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir);

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
  }

  const vueReturnType = pkg === 'vue-latest' ? 'Icon;' : "Component;"


  appendFileSync(
    path.resolve(targetDir, typesFileName),
    `export declare const ${iconName}: ${pkg === 'react' ? 'MeisterIcon;' : vueReturnType}\n`,
    "utf-8"
  );


  console.log(`Added ${iconName} icon type for meistericons-${pkg}`);
}





