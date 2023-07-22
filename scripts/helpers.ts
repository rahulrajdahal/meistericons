import { PathLike, readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

export const toCamelCase = (string: string) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

export const toKebabCase = (string: string) =>
  string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

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

export const readSvg = (dir: string, fileName: string) =>
  readFileSync(path.join(dir, fileName), "utf-8");

export const readSvgMeta = (dir: string, fileName: string) =>
  JSON.parse(readFileSync(path.join(dir, fileName), "utf-8"));

export const redSvgDir = (dir: string, fileExt = ".svg") =>
  readdirSync(dir).filter((file) => path.extname(file) === fileExt);

export const mergeArrays = (a: any[], b: any) => {
  a = a.concat(b);
  return a.filter((aa, i) => a.indexOf(aa) === i);
};

const hash = (string: any, seed = 5381) => {
  let i = string.length;

  while (i) {
    seed = (seed * 33) ^ string.charCodeAt(--i);
  }

  return (seed >>> 0).toString(36).substring(0, 6);
};

export const generateHashKey = ({
  name,
  attributes,
}: {
  name: string;
  attributes: any;
}) => hash(JSON.stringify([name, attributes]));

export const hasDuplicateChildren = (
  children: { name: string; attributes: any }[]
) => {
  const hashedKeys = children.map(generateHashKey);

  return !hashedKeys.every(
    (key, idx) => idx === hashedKeys.findIndex((child) => child === key)
  );
};
