import * as React from "react";
import defaultAttributes from "./defaultAttributes";
import camelcase from "camelcase";

export type IconNode = [
  elementName: keyof React.ReactSVG,
  attrs: Record<string, string>
][];

type SVGAttributes = Partial<React.SVGProps<SVGSVGElement>>;
type ComponentAttributes = React.RefAttributes<SVGSVGElement> & SVGAttributes;

export interface MeisterIconsProps extends ComponentAttributes {
  size?: string | number;
}

export type MeisterIcon = React.ForwardRefExoticComponent<MeisterIconsProps>;

const createMeisterIcons = (
  iconName: string,
  iconNode: IconNode
): MeisterIcon => {
  const Component = React.forwardRef<SVGSVGElement, MeisterIconsProps>(
    ({ color = "currentColor", size = 24, children, ...rest }, ref) =>
      React.createElement(
        "svg",
        {
          ref,
          width: size,
          height: size,
          className: `mni mni-${camelcase(iconName, { pascalCase: true })}`,
          ...defaultAttributes,
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)),
          Array.isArray(children ? children : [children]) || [],
        ]
      )
  );

  Component.displayName = iconName;

  return Component;
};

export default createMeisterIcons;
