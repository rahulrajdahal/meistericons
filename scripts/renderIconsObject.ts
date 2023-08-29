import { basename } from "path";
import { generateHashKey, hasDuplicateChildren, readSvg } from "./helpers.js";
import { parseSync } from "svgson";

export default (
  svgFiles: string[],
  iconsDir: string,
  renderUniqueKey = false
) =>
  svgFiles
    .map((svgFile) => {
      const name = basename(svgFile, ".svg");
      const svg = readSvg(iconsDir, svgFile);
      const contents = parseSync(svg);

      if (!contents.children?.length) {
        throw new Error(`${name}.svg has no children contents`);
      }

      // if (hasDuplicateChildren(contents.children)) {
      //   throw new Error(`${name}.svg. Duplicated children found!`);
      // }

      if (renderUniqueKey) {
        contents.children = contents.children.map((child) => {
          child.attributes.key = generateHashKey(child);

          return child;
        });
      }
      return { name, contents };
    })
    .reduce((acc: any, icon) => {
      acc[icon.name] = icon.contents;
      return acc;
    }, {});
