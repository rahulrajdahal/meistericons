import { basename } from "path";
import { readSvg } from "./helpers.js";

export default (svgFiles:any[], iconsDirectory:string) =>
  svgFiles.map(svgFile => {
    const name = basename(svgFile, '.svg');
    const contents = readSvg(iconsDirectory, svgFile);

    return { name, contents };
  })