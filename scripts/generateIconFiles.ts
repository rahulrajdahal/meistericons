import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import { transform } from "@svgr/core";
import * as babel from "@babel/core";
import { minify } from "terser";
import camelCase from "camelcase";

const svgToJSX = async (
  file: string,
  componentName: string,
  format: "cjs" | "esm"
) => {
  const content = await readFile(`./icons/${file}`, "utf-8");

  const reactSvgContent = await transform(
    content,
    {
      icon: true,
      replaceAttrValues: { "#00497A": "{props.color || '#00497A'}" },
      svgProps: {
        width: "24",
        height: "24",
      },
    },
    { componentName }
  );

  const { code } = await babel.transformFileAsync(reactSvgContent, {
    presets: [["@babel/preset-react", { useBuiltIns: true }]],
  });

  if (format === "esm") {
    const { code: minifiedCode } = await minify(code);
    return minifiedCode;
  }

  const cjs = code
    .replace(
      'import * as React from "react";',
      'const React = require("react");'
    )
    .replace("export default", "module.exports =");

  const { code: minifiedCode } = await minify(cjs);

  return minifiedCode;
};

const indexFile = (
  files: string[],
  format: "esm" | "cjs",
  includeExtension = true
) => {
  let content = "";
  const extension = includeExtension ? ".js" : "";
  files.map((fileName) => {
    const componentName = `${camelCase(fileName.replace(/svg/g, ""), {
      pascalCase: true,
    })}`;
    const dirString = `'./${componentName}${extension}'`;
    content +=
      format === "esm"
        ? `export { default as ${componentName} } from ${dirString};\n`
        : `module.exports.${componentName} = require(${dirString});\n`;
  });
  return content;
};

const outPath = "./react";

async function generateIconFiles(format: "esm" | "cjs" = "esm") {
  let outDir = outPath;
  if (format === "esm") {
    outDir = `${outPath}/esm`;
  } else {
    outDir = `${outPath}/cjs`;
  }

  await mkdir(outDir, { recursive: true });

  const files = await readdir("./icons", "utf-8");

  await Promise.all(
    files.flatMap(async (fileName) => {
      const componentName = `${camelCase(fileName.replace(/svg/g, ""), {
        pascalCase: true,
      })}`;
      const content = await svgToJSX(fileName, componentName, format);
      const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;\nexport default ${componentName};\n`;

      if (content) {
        await writeFile(`${outDir}/${componentName}.js`, content, "utf-8");
        await writeFile(`${outDir}/${componentName}.d.ts`, types, "utf-8");
      }
    })
  );

  console.log(`Creating files: index.js`);

  await writeFile(`${outDir}/index.js`, indexFile(files, format), "utf-8");
  await writeFile(
    `${outDir}/index.d.ts`,
    indexFile(files, "esm", false),
    "utf-8"
  );
}

(function main() {
  console.log("Generating icon files...");
  new Promise((resolve) => {})
    .then(() =>
      Promise.all([generateIconFiles("cjs"), generateIconFiles("esm")])
    )
    .then(() => console.log("Finished generating icon files"));
})();

export default generateIconFiles;
