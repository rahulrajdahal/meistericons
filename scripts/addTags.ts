import { getCurrentDir, readIconFiles } from "./helpers";
import path from "path";
import { appendFileSync, readdirSync } from "fs";

const currentDir = getCurrentDir(import.meta.url);
const iconsDir = path.resolve(currentDir, "../../icons");
const iconNames = readIconFiles(iconsDir);

readdirSync(iconsDir).forEach((category) => {
  const categoryDir = path.resolve(iconsDir, category);
  const iconNames = readIconFiles(categoryDir);

  iconNames.sort().forEach((iconName) => {
    const iconNameSplit = iconName.split("-");

    let tags: string[];
    if (iconNameSplit.length > 1) {
      tags = [iconName, ...iconNameSplit];
    } else {
      tags = [iconName];
    }

    const tagValues = iconNames.sort().reduce((acc: any, tagName) => {
      if (iconName === tagName) {
        acc[tagName] = tags;
      }
      return acc;
    }, {});
    const iconContent = JSON.stringify(tagValues, null, 2);

    appendFileSync(
      path.resolve(currentDir, "../../tags.json"),
      `${iconContent},`
    );
  });
});
