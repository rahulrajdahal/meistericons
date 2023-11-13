import { getCurrentDir, readIconFiles } from "./helpers";
import path from "path";
import { appendFileSync, readdirSync } from "fs";

const currentDir = getCurrentDir(import.meta.url);
const iconsDir = path.resolve(currentDir, "../../icons");

const categories = readdirSync(iconsDir);

readdirSync(iconsDir).forEach((category: string) => {
  const categoryDir = path.resolve(iconsDir, category);
  const iconNames = readIconFiles(categoryDir);

  const categoryValues = categories.sort().reduce((acc: any, categoryName) => {
    if (category === categoryName) {
      acc[categoryName] = iconNames;
    }
    return acc;
  }, {});
  const iconContent = JSON.stringify(categoryValues, null, 2);

  appendFileSync(
    path.resolve(currentDir, "../../categories.json"),
    `${iconContent},`,
    "utf-8"
  );
});
