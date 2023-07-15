import path from "path";
import { readSvgMetaData, writeFile } from "./helpers";

const iconsDir = path.resolve(__dirname, "../../icons");
const icons = readSvgMetaData(iconsDir);

const newCategories: { [x: string]: string[] } = {};

Object.keys(icons).forEach((iconName) => {
  icons[iconName].categories.forEach((categoryName: string) => {
    newCategories[categoryName] = newCategories[categoryName] || [];
    newCategories[categoryName].push(iconName);
  });
});

const categories = Object.keys(newCategories)
  .sort()
  .reduce((acc: any, iconName: string) => {
    acc[iconName] = newCategories[iconName];
    return acc;
  }, {});

const categoriesContent = JSON.stringify(categories, null, 2);

writeFile(categoriesContent, "categories.json", path.resolve(process.cwd()));
