import defaultAttributes from "./defaultAttributes";
import { FunctionalComponent, SVGAttributes, h } from "vue";

export type IconNode = [
  elementName: keyof React.ReactSVG,
  attrs: Record<string, string>
][];

export interface SVGProps extends Partial<SVGAttributes> {
  size: 24;
  fill: "currentColor";
}

export const toKebabCase = (string: string) =>
  string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const createMeisterIcons =
  (iconName: string, iconNode: IconNode): FunctionalComponent<SVGProps> =>
  ({ fill = "currentColor", size = 24, ...props }, { attrs, slots }) => {
    return h(
      "svg",
      {
        class: [`mni mni-${toKebabCase(iconName)}`],
        size,
        ...attrs,
        ...defaultAttributes,
        fill,
        ...props,
      },
      [
        ...iconNode.map((node) => h(...node)),
        ...(slots?.default ? [slots.default()] : []),
      ]
    );
  };

export default createMeisterIcons;
