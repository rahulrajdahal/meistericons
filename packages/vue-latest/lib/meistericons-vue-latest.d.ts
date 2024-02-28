import { FunctionalComponent, SVGAttributes } from "vue"
declare module 'meistericons-vue-latest'

interface SVGProps extends Partial<SVGAttributes> {
  size: 24;
  fill: "currentColor";
}

export type Icon = (props: SVGProps) => FunctionalComponent<SVGProps>;

// Generated icons
export declare const Technology: Icon;
export declare const Children: Icon;
export declare const Education: Icon;
export declare const Weather: Icon;
export declare const Users: Icon;
export declare const Transportation: Icon;
export declare const Layouts: Icon;
export declare const Images: Icon;
export declare const Music: Icon;
export declare const FilesAndFolders: Icon;
export declare const Code: Icon;
export declare const Arrows: Icon;
export declare const Design: Icon;
export declare const Gaming: Icon;
export declare const Nature: Icon;
export declare const ECommerce: Icon;
export declare const Date&time: Icon;
export declare const Medical: Icon;
export declare const Email: Icon;
export declare const Menu: Icon;
export declare const Security: Icon;
export declare const UiEssentials: Icon;
export declare const Food&drinks: Icon;
export declare const Charts: Icon;
export declare const MediaControls: Icon;
export declare const Communication: Icon;
export declare const ClothingAndFashion: Icon;
export declare const UserActions: Icon;
export declare const Maps&navigation: Icon;
export declare const Text: Icon;
export declare const Sports: Icon;
export declare const Business: Icon;
