import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild, { minify } from "rollup-plugin-esbuild";
import pkg from "./package.json" assert { type: "json" };
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

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
  file: `lib/${format}/meistericons-react.${format}.${outputFileExt(format)}`,
  // sourcemap: true,
}));

const minifyOutput = inputs.map(({ format }) => ({
  name: pkg.name,
  file: `lib/${format}/meistericons-react.${format}.min.${outputFileExt(
    format
  )}`,
  plugins: [minify(), terser()],
  // sourcemap: true,
}));

export default {
  input: "src/meistericons-react.ts",
  output: [...output, ...minifyOutput],
  external: ["react"],
  plugins: [
    esbuild({ optimizeDeps: { include: ["react"] } }),
    resolve({ preferBuiltins: true, browser: true }),
    commonjs(),
    visualizer(),
  ],
};
