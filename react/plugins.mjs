import bundleSize from "@atomico/rollup-plugin-sizes";
import license from "rollup-plugin-license";
import esbuild from "rollup-plugin-esbuild";
import { visualizer } from "rollup-plugin-visualizer";

const plugins = (pkg, minify, esbuildOptions = {}) =>
  [
    esbuild({
      minify,
      ...esbuildOptions,
    }),
    license({
      banner: `${pkg.name} v${pkg.version} - ${pkg.license}`,
    }),
    bundleSize(),
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? "-min" : ""}.html`,
    }),
  ].filter(Boolean);

export { bundleSize, license, visualizer };

export default plugins;
