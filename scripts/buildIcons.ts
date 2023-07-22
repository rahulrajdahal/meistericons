import { existsSync, mkdirSync } from "fs";
import getCliArguments from "minimist";
import path from "path";
import { redSvgDir } from "./helpers.js";
import renderIconsObject from "./renderIconsObject.js";

const cliArguments = getCliArguments(process.argv.slice(2));
const currentDir = process.cwd();
const iconsDir = path.resolve(__dirname, "./icons");
const ouputDir = path.resolve(__dirname, cliArguments.output || "./dist");

if (!existsSync(ouputDir)) {
  mkdirSync(ouputDir);
}

const {
  renderUniqueKey = false,
  templateSrc,
  silent = false,
  iconFileExtension = ".js",
  exportFileName = "index.js",
  pretty = true,
} = cliArguments;

async function buildIcons() {
  try {
    if (templateSrc === null) {
      throw new Error(`No templateSrc provided.`);
    }

    const svgFiles = redSvgDir(iconsDir);
    const icons = renderIconsObject(svgFiles, iconsDir, renderUniqueKey);

    const { default: iconFileTemplate } = await import(
      path.resolve(currentDir, templateSrc)
    );

    //   generateIconFiles({});
  } catch (error) {}
}

buildIcons();
