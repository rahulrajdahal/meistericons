import path from "path";
import categories from "../categories.json";
import { mergeArrays, readSvgMetaData, writeFile } from "./helpers.js";

const iconsDir = path.resolve(__dirname, "../../icons");
const icons = readSvgMetaData(iconsDir);

Object.keys(categories).forEach((categoryName: string) => {
  (categories as any)[categoryName].forEach((iconName: string) => {
    icons[iconName].categories = mergeArrays(icons[iconName].categories, [
      categoryName,
    ]);
  });
});

Object.keys(icons).forEach((iconName) => {
  const iconContent = JSON.stringify(icons[iconName], null, 2);
  writeFile(
    iconContent,
    `${iconName}.json`,
    path.resolve(__dirname, "../../icons")
  );
});
