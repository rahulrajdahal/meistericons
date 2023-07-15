import path from "path";
import tags from "../tags.json";
import { mergeArrays, readSvgMetaData, redSvgDir, writeFile } from "./helpers";

const iconsDir = path.resolve(__dirname, "../../icons");
const icons = readSvgMetaData(iconsDir);
const svgFiles = redSvgDir(iconsDir);

const iconNames = svgFiles.map((svg) => svg.split(".")[0]);

iconNames.forEach((iconName) => {
  icons[iconName] = icons[iconName] || {
    $schema: "../icons.schema.json",
    tags: [],
    categories: [],
  };
  icons[iconName].tags = mergeArrays(
    icons[iconName].tags,
    (tags as any)[iconName]
  );
  const iconContent = JSON.stringify(icons[iconName], null, 2);
  writeFile(
    iconContent,
    `${iconName}.json`,
    path.resolve(__dirname, "../../icons")
  );
});
