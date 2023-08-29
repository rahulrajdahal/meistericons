import { existsSync, mkdirSync } from "fs";
import getCliArguments from "minimist";
import path from "path";
import { readSvgDir } from "../scripts/helpers";
import renderIconsObject from "../scripts/renderIconsObject";
import generateIconFiles from "../scripts/generateIconFiles";
import generateExportFile from "../scripts/generateExportFile";

const cliArguments = getCliArguments(process.argv.slice(2));

const currentDir = path.resolve(__dirname, "../");

const iconsDir = path.resolve(currentDir, "../icons");
const outputDir = path.resolve(currentDir, "./");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

const {
  renderUniqueKey = false,
  templateSrc = "./exportTemplate",
  silent = false,
  iconFileExtension = ".js",
  exportFileName = "index.js",
  pretty = true,
} = cliArguments;

async function buildIcons() {
  if (templateSrc === null) {
    throw new Error(`No templateSrc provided.`);
  }

  const svgFiles = readSvgDir(iconsDir);
  const icons = renderIconsObject(svgFiles, iconsDir, renderUniqueKey);

  const { default: iconFileTemplate } = await import(
    path.resolve(__dirname, templateSrc)
  );

  generateIconFiles({
    iconNodes: icons,
    outputDir,
    template: iconFileTemplate,
    showLog: !silent,
    iconFileExt: iconFileExtension,
    pretty: JSON.parse(pretty),
    iconsDir,
  });

  generateExportFile(
    path.join(outputDir, "icons", exportFileName),
    path.join(outputDir, "icons"),
    icons,
    iconFileExtension
  );
}

try {
  buildIcons();
} catch (error) {
  console.error(error);
}
