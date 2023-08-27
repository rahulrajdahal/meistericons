import pkg from "./package.json" assert { type: "json" };
import { dts } from "rollup-plugin-dts";
import replace from "@rollup/plugin-replace";
import plugins from "./plugins.mjs";

const packageName = "MeistericonsReact";
const outputFileName = "meistericons";
const outputDir = "dist";
const inputs = ["src/meistericons-react.ts"];

const bundles = [
  { format: "umd", inputs, outputDir, minify: true },
  { format: "umd", inputs, outputDir },
  { format: "cjs", inputs, outputDir, aliasesSupport: true },
  {
    format: "esm",
    inputs,
    outputDir,
    preserveModules: true,
    aliasesSupport: true,
  },
];

const configs = bundles
  .map(
    ({ inputs, outputDir, format, minify, preserveModules, aliasesSupport }) =>
      inputs.map((input) => ({
        input,
        plugins: [
          ...(!aliasesSupport
            ? [
                replace({
                  "export * as icons from './icons';": "",
                  delimiters: ["", ""],
                  preventAssignment: false,
                }),
              ]
            : []),
          ...plugins(pkg, minify),
        ],
        external: ["react", "prop-types"],
        output: {
          name: packageName,
          ...(preserveModules
            ? { dir: `${outputDir}/${format}` }
            : {
                file: `${outputDir}/${format}/${outputFileName}${
                  minify ? ".min" : ""
                }.js`,
              }),
          format,
          sourcemap: true,
          preserveModules,
          globals: {
            react: "react",
            "prop-types": "PropTypes",
          },
        },
      }))
  )
  .flat();

export default [
  {
    input: inputs[0],
    output: [{ file: `dist/$${outputFileName}.d.ts`, format: "es" }],
    plugins: [dts()],
  },
  ...configs,
];
