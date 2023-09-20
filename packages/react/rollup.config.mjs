import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import esbuild, { minify } from "rollup-plugin-esbuild";
import pkg from "./package.json" assert { type: "json" };

const inputs = [{ format: "esm" }, { format: "cjs" }, { format: "umd" }];

const output = inputs.map(({ format }) => ({
  file: `lib/${format}/meistericons-react.${format}.${
    format === "esm" ? "m" : format === "cjs" ? "c" : ""
  }js`,
  sourcemap: true,
}));

const minifyOutput = inputs.map(({ format }) => ({
  name: pkg.name,
  file: `lib/${format}/meistericons-react.${format}.min.${
    format == "esm" ? "m" : format === "cjs" ? "c" : ""
  }js`,
  plugins: [minify()],
  sourcemap: true,
}));

export default {
  input: "src/meistericons-react.ts",
  output: [...output, ...minifyOutput],
  external: ["react"],
  plugins: [
    esbuild(),
    sourcemaps(),
    resolve({ preferBuiltins: true }),
    commonjs(),
  ],
};
