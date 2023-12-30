import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import esbuild, { minify } from "rollup-plugin-esbuild";
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
  file: `lib/${format}/meistericons-vue.${format}.${outputFileExt(format)}`,
  // sourcemap: true,
}));

const minifyOutput = inputs.map(({ format }) => ({
  name: pkg.name,
  file: `lib/${format}/meistericons-vue.${format}.min.${outputFileExt(format)}`,
  plugins: [minify()],
  // sourcemap: true,
}));

export default {
  input: "src/meistericons-vue.ts",
  output: [...output, ...minifyOutput],
  external: ["vue"],
  plugins: [
    esbuild(),
    sourcemaps(),
    resolve({ preferBuiltins: true }),
    commonjs(),
  ],
};
