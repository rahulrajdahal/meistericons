import path from "path";
import {
  appendFile,
  getCurrentDirPath,
  readSvgDir,
  readSvgMeta,
  readSvgMetaData,
  writeFile,
} from "./helpers";
import renderIconsObject from "./renderIconsObject";

const outputFileName = "icon-nodes.new.json";
const iconsDir = path.resolve(__dirname, "../../icons");
const svgFiles = readSvgDir(iconsDir);
const icons = renderIconsObject(svgFiles, iconsDir, false);

const iconNames = svgFiles.map((svg) => svg.split(".")[0]);

iconNames.forEach((iconName) => {
  const content = [["path", { d: icons[iconName].children[0].attributes.d }]];

  const iconContent = JSON.stringify(content, null, 2);
  appendFile(
    `"${iconName}": ${iconContent}\n,`,
    outputFileName,
    path.resolve(__dirname, "../../")
  );
});
