import { existsSync, mkdirSync } from "fs";
import getCliArguments from "minimist";
import path from "path";
import { readSvgDir } from "./helpers.js";
import renderIconsObject from "./renderIconsObject.js";
import generateIconFiles from "./generateIconFiles.js";
import generateExportFile from "./generateExportFile.js";

const cliArguments = getCliArguments(process.argv.slice(2));
// const currentDir =process.cwd()
const currentDir = path.resolve(__dirname, "./");
const iconsDir = path.resolve(__dirname, "../../icons");
const outputDir = path.resolve(__dirname, "../../react/src");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

const {
  output = outputDir,
  renderUniqueKey = false,
  templateSrc = "./reactExportTemplate",
  silent = false,
  iconFileExtension = ".ts",
  exportFileName = "index.ts",
  pretty = true,
} = cliArguments;

async function buildIcons() {
  if (templateSrc === null) {
    throw new Error(`No templateSrc provided.`);
  }

  const svgFiles = readSvgDir(iconsDir);
  const icons = renderIconsObject(svgFiles, iconsDir, renderUniqueKey);

  const { default: iconFileTemplate } = await import(
    path.resolve(currentDir, templateSrc)
  );

  generateIconFiles({
    iconNodes: icons,
    outputDir: output,
    template: iconFileTemplate,
    showLog: !silent,
    iconFileExt: iconFileExtension,
    iconsDir,
    pretty: JSON.parse(pretty),
  });

  generateExportFile(
    path.join(output, "icons", exportFileName),
    path.join(output, "icons"),
    icons,
    iconFileExtension
  );
}

try {
  buildIcons();
} catch (error) {
  console.error(error);
}
