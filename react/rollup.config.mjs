import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json" assert { type: "json" };
import sourcemaps from "rollup-plugin-sourcemaps";

export default {
  input: `src/meistericons-react.ts`,
  output: [
    {
      file: pkg["main:umd"],
      name: "MeistericonsReact",
      format: "umd",
      sourcemap: true,
      globals: { react: "react" },
    },
    {
      file: pkg.main,
      name: "MeistericonsReact",
      format: "cjs",
      sourcemap: true,
      globals: { react: "react" },
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      globals: { react: "react" },
    },
  ],
  external: ["react"],
  watch: { include: "src/**" },
  plugins: [
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    resolve({ preferBuiltins: true }),
    sourcemaps(),
  ],
};
