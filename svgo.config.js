module.exports = {
  multipass: true, // boolean. false by default
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          convertShapeToPath: false,
          mergePaths: false,
          removeViewBox: false,
        },
      },
    },
    { name: "removeDimensions", active: true },
    { name: "sortAttrs" },
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke)",
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attribute: { fill: "currentColor" },
      },
    },
  ],
};
