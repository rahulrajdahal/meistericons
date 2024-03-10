import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import esbuild, { minify } from "rollup-plugin-esbuild";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json" assert { type: "json" };

const inputs = [{ format: "es" }, { format: "cjs" }, { format: "umd" }];

const outputFileExt = (format) => {
  switch (format) {
    case "es":
      return "mjs";

    case "cjs":
      return "cjs";

    default:
      return "js";
  }
};

const output = inputs.map(({ format }) => ({
  file: `lib/${format}/build-icons.${format}.${outputFileExt(format)}`,
}));

const minifyOutput = inputs.map(({ format }) => ({
  name: pkg.name,
  file: `lib/${format}/build-icons.${format}.min.${outputFileExt(format)}`,
  plugins: [minify(), terser()],
}));

export default {
  input: "./index.ts",
  output: [...output, ...minifyOutput],
  plugins: [
    esbuild({}),
    resolve({ preferBuiltins: true, browser: true }),
    commonjs(),
    visualizer(),
  ],
};
