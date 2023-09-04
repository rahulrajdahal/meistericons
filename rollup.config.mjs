import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import tsPlugin from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import { dts } from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const extensions = [".js", ".ts"];

export default {
  input: "src/meistericons-react.ts",
  output: [
    {
      file: "lib/esm/meistericons-react.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "lib/esm/meistericons-react.esm.min.js",
      format: "esm",
      sourcemap: true,
      plugins: [esbuild({ minify: true })],
    },
    {
      file: "lib/cjs/meistericons-react.cjs.js",
      format: "cjs",
      name: "meistericons-react",
      sourcemap: true,
    },
    {
      file: "lib/cjs/meistericons-react.cjs.min.js",
      format: "cjs",
      name: "meistericons-react",
      sourcemap: true,
    },
    {
      file: "lib/umd/meistericons-react.umd.js",
      format: "umd",
      name: "meistericons-react",
      sourcemap: true,
    },
    {
      file: "lib/umd/meistericons-react.umd.min.js",
      format: "umd",
      name: "meistericons-react",
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    resolve({ extensions }),
    babel({
      babelHelpers: "bundled",
      include: ["src/**/*.ts"],
      extensions,
      exclude: "./node_modules/**",
    }),
    tsPlugin(),
    dts(),
    esbuild(),
  ],
};
