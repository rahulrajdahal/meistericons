module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    { name: "preset-default" },
    "sortAttrs",
    "removeScriptElement",
    "removeDimensions",
    "removeScriptElement",
    "removeDimensions",
    { name: "removeAttrs", params: { attrs: "fill" } },
    {
      name: "addAttributesToSVGElement",
      params: { attribute: { fill: "currentColor" } },
    },
  ],
};
