import path from "path";
import { readSvgMetaData, writeFile } from "./helpers.js";

const iconsDir = path.resolve(__dirname, "../../icons");
const icons = readSvgMetaData(iconsDir);

const tags = Object.keys(icons)
  .sort()
  .reduce((acc: any, iconName: string) => {
    acc[iconName] = icons[iconName].tags;

    acc[iconName].forEach((tag: string) => {
      if (tag == null) {
        const iconNameSplit = iconName.split("-");

        if (iconNameSplit.length > 0) {
          acc[iconName] = [
            iconName,
            ...iconNameSplit.filter((name) => name !== "-"),
          ];
        } else {
          acc[iconName] = [iconName];
        }
      }
    });

    return acc;
  }, {});

const tagsContent = JSON.stringify(tags, null, 2);

writeFile(tagsContent, "tags.json", path.resolve(process.cwd()));
