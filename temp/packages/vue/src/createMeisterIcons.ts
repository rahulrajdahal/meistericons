import { Component } from "vue";
import defaultAttributes from "./defaultAttributes";

export type IconNode = [
  elementName: keyof React.ReactSVG,
  attrs: Record<string, string>
][];

export default (iconName: string, iconNode: IconNode): Component => ({
  name: iconName,
  functional: true,
  props: {},
  render: (createElement, { props, data, children = [] }) => {
    return createElement(
      "svg",
      {
        class: [
          data.class,
          data.staticClass,
          data.attrs && data.attrs.class,
        ].filter(Boolean),
        style: [
          data.style,
          data.staticStyle,
          data.attrs && data.attrs.style,
        ].filter(Boolean),
        attrs: {
          ...defaultAttributes,
          ...data.attrs,
        },
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, { attrs })),
        ...children,
      ]
    );
  },
});
