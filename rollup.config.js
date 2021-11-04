import svgr from "@svgr/rollup";

const config = [
  {
    input: "index.js",
    output: {
      dir: "react",
      format: "module",
    },
    plugins: [svgr()],
  },
];

export default config;
