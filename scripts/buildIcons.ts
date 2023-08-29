import { existsSync, mkdirSync } from "fs";
import getCliArguments from "minimist";
import path from "path";
import { getCurrentDirPath, readSvgDir } from "./helpers.js";
import renderIconsObject from "./renderIconsObject.js";
import generateIconFiles from "./generateIconFiles.js";
import generateExportFile from "./generateExportFile.js";
import generateIconNodes from "./generateIconNodes.js";
import readSvgs from "./readSvgs.js";
import { parseSync } from "svgson";

const cliArguments = getCliArguments(process.argv.slice(2));

const currentDir = getCurrentDirPath(import.meta.url)
const iconsDir = path.resolve(currentDir, "../../icons");
const outputDir = path.resolve(process.cwd(), "./react");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

const {
  output = outputDir,
  renderUniqueKey = false,
  templateSrc = "./exportTemplate.js",
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

  const svgs = readSvgs(svgFiles, iconsDir)
  
  const parsedSvgs = svgs.map(({ name, contents }) => ({ name, contents, parsedSvgs: contents?parseSync(contents):'' }))

  generateIconNodes(parsedSvgs, currentDir)

  const templatePath = path.resolve('./dist/scripts/', templateSrc)

  const { default: iconFileTemplate } = await import(
    `file://${templatePath}`
  );


  generateIconFiles({
    iconNodes: icons,
    outputDir: output,
    template: iconFileTemplate,
    showLog: !silent,
    iconFileExt: iconFileExtension,
    pretty: JSON.parse(pretty),
    iconsDir,
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
