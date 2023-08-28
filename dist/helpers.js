"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDirPath = exports.hasDuplicateChildren = exports.generateHashKey = exports.mergeArrays = exports.readSvgDir = exports.readSvgMeta = exports.readSvg = exports.readSvgMetaData = exports.resetFile = exports.appendFile = exports.writeFile = exports.toPascalCase = exports.toKebabCase = exports.toCamelCase = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
exports.toCamelCase = toCamelCase;
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
exports.toKebabCase = toKebabCase;
const toPascalCase = (string) => (0, exports.toCamelCase)(string).charAt(0).toUpperCase() + (0, exports.toCamelCase)(string).slice(1);
exports.toPascalCase = toPascalCase;
const writeFile = (content, fileName, outputDir) => (0, fs_1.writeFileSync)(path_1.default.join(outputDir, fileName), content, "utf-8");
exports.writeFile = writeFile;
const appendFile = (content, fileName, outputDir) => (0, fs_1.appendFileSync)(path_1.default.join(outputDir, fileName), content, "utf-8");
exports.appendFile = appendFile;
const resetFile = (fileName, outputDir) => (0, fs_1.writeFileSync)(path_1.default.join(outputDir, fileName), "", "utf-8");
exports.resetFile = resetFile;
const readSvgMetaData = (dir) => (0, fs_1.readdirSync)(dir)
    .filter((svg) => path_1.default.extname(svg) === ".json")
    .reduce((acc, fileName, i) => {
    acc[path_1.default.basename(fileName, ".json")] = (0, exports.readSvgMeta)(dir, fileName);
    return acc;
}, {});
exports.readSvgMetaData = readSvgMetaData;
const readSvg = (dir, fileName) => (0, fs_1.readFileSync)(path_1.default.join(dir, fileName), "utf-8");
exports.readSvg = readSvg;
const readSvgMeta = (dir, fileName) => JSON.parse((0, fs_1.readFileSync)(path_1.default.join(dir, fileName), "utf-8"));
exports.readSvgMeta = readSvgMeta;
const readSvgDir = (dir, fileExt = ".svg") => (0, fs_1.readdirSync)(dir).filter((file) => path_1.default.extname(file) === fileExt);
exports.readSvgDir = readSvgDir;
const mergeArrays = (a, b) => {
    a = a.concat(b);
    return a.filter((aa, i) => a.indexOf(aa) === i);
};
exports.mergeArrays = mergeArrays;
const hash = (string, seed = 5381) => {
    let i = string.length;
    while (i) {
        seed = (seed * 33) ^ string.charCodeAt(--i);
    }
    return (seed >>> 0).toString(36).substring(0, 6);
};
const generateHashKey = ({ name, attributes, }) => hash(JSON.stringify([name, attributes]));
exports.generateHashKey = generateHashKey;
const hasDuplicateChildren = (children) => {
    const hashedKeys = children.map(exports.generateHashKey);
    return !hashedKeys.every((key, idx) => idx === hashedKeys.findIndex((child) => child === key));
};
exports.hasDuplicateChildren = hasDuplicateChildren;
const getCurrentDirPath = (currentPath) => path_1.default.dirname((0, url_1.fileURLToPath)(currentPath));
exports.getCurrentDirPath = getCurrentDirPath;
