import { PathLike, readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

export const writeFile = (
  content: string,
  fileName: string,
  outputDir: string
) => writeFileSync(path.join(outputDir, fileName), content, "utf-8");

export const readSvgMetaData = (dir: string) =>
  readdirSync(dir)
    .filter((svg) => path.extname(svg) === ".json")
    .reduce((acc: any, fileName: string, i) => {
      acc[path.basename(fileName, ".json")] = readSvgMeta(dir, fileName);
      return acc;
    }, {});

export const readSvgMeta = (dir: string, fileName: string) =>
  JSON.parse(readFileSync(path.join(dir, fileName), "utf-8"));

export const redSvgDir = (dir: string, fileExt = ".svg") =>
  readdirSync(dir).filter((file) => path.extname(file) === fileExt);

export const mergeArrays = (a: any[], b: any) => {
  a = a.concat(b);
  return a.filter((aa, i) => a.indexOf(aa) === i);
};
