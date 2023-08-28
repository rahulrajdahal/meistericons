import { existsSync, mkdirSync, promises } from "fs";
import path from "path";
import { readSvg, toPascalCase } from "./helpers";
import prettier from "prettier";

export default ({
  iconNodes,
  outputDir,
  template,
  showLog = true,
  iconFileExt = ".js",
  pretty = true,
  iconsDir,
}: {
  iconNodes: any;
  outputDir: string;
  template: any;
  showLog: boolean;
  iconFileExt: string;
  pretty: boolean;
  iconsDir: string;
}) => {
  const icons = Object.keys(iconNodes);
  const iconsDistDir = path.join(outputDir, "icons");

  if (!existsSync(iconsDistDir)) {
    mkdirSync(iconsDistDir);
  }

  const writeIconFiles = icons.map(async (iconName) => {
    const location = path.join(
      iconsDistDir,
      `${toPascalCase(iconName)}${iconFileExt}`
    );
    const componentName = toPascalCase(iconName);

    let { children } = iconNodes[iconName];
    children = children.map(
      ({ name, attributes }: { name: string; attributes: any }) => [
        name,
        attributes,
      ]
    );

    const getSvg = () => readSvg(iconsDir, `${iconName}.svg`);

    const elementTemplate = template({
      componentName,
      iconName,
      children,
      getSvg,
    });

    const output = pretty
      ? prettier.format(elementTemplate, {
          singleQuote: true,
          trailingComma: "all",
          parser: "babel",
        })
      : elementTemplate;

    // console.log(output, ";output",elementTemplate);

    await promises.writeFile(location, elementTemplate, "utf-8");
  });

  Promise.all(writeIconFiles)
    .then(() => {
      if (showLog) {
        console.log(`Generated.`, icons.length, "icons");
      }
    })
    .catch((e: any) => {
      throw new Error(`Something went wrong ${e}`);
    });
};
