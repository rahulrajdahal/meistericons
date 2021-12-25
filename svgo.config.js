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
          mergePaths: false,
          removeViewBox: false,
        },
      },
    },
    "removeDimensions",
    "sortAttrs",
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke|fill-rule|clip-rule)",
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
