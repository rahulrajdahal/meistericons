declare module 'meistericons-react'

export interface SVGProps extends Partial<SVGElement> {
  "xmlns": "http://www.w3.org/2000/svg",
  "viewBox": "0 0 24 24",
  "fill": "currentColor"
}

export declare type IconNodeChild = readonly [string, object];
export declare type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]];
export declare type CustomAttrs = { [attr:string]: any }
export type Icons = { [key: string]: IconNode }

export interface CreateIconsOptions {
 
  icons: Icons;

  
  nameAttr?: string;

  attrs?: CustomAttrs;
}

export function createElement(icon: IconNode): SVGSVGElement;
export function createIcons(options: CreateIconsOptions): void;

export declare const icons: Icons;

// Generated icons
export declare const ArrowBreakDown: IconNode;
export declare const ArrowBreakLeft: IconNode;
export declare const ArrowBreakRight: IconNode;
export declare const ArrowBreakTop: IconNode;
export declare const ArrowCircleDown: IconNode;
export declare const ArrowCircleDownleft: IconNode;
export declare const ArrowCircleDownright: IconNode;
export declare const ArrowCircleLeft: IconNode;
export declare const ArrowCircleRight: IconNode;
export declare const ArrowCircleTop: IconNode;
export declare const ArrowCircleTopleft: IconNode;
export declare const ArrowCircleTopright: IconNode;
export declare const ArrowCrashDown: IconNode;
export declare const ArrowCrashLeft: IconNode;
export declare const ArrowCrashRight: IconNode;
export declare const ArrowCrashTop: IconNode;
export declare const ArrowCurvedDownright: IconNode;
export declare const ArrowDoubleheadDA: IconNode;
export declare const ArrowDoubleheadD: IconNode;
export declare const ArrowDoubleheadH: IconNode;
export declare const ArrowDoubleheadV: IconNode;
export declare const ArrowDown: IconNode;
export declare const ArrowDownleft: IconNode;
export declare const ArrowDownright: IconNode;
export declare const ArrowDownwards: IconNode;
export declare const ArrowDuoDown: IconNode;
export declare const ArrowDuoLeft: IconNode;
export declare const ArrowDuoRight: IconNode;
export declare const ArrowDuoTop: IconNode;
export declare const ArrowLeft: IconNode;
export declare const ArrowLoopLeft: IconNode;
export declare const ArrowLoopRight: IconNode;
export declare const ArrowReverseDownleft: IconNode;
export declare const ArrowReverseLongh: IconNode;
export declare const ArrowReverseLongv: IconNode;
export declare const ArrowReverseShorth: IconNode;
export declare const ArrowReverseShortv: IconNode;
export declare const ArrowReverseTopleft: IconNode;
export declare const ArrowReverseTopright: IconNode;
export declare const ArrowRight: IconNode;
export declare const ArrowRoundedDownleft: IconNode;
export declare const ArrowRoundedDownright: IconNode;
export declare const ArrowRoundedTopleft: IconNode;
export declare const ArrowRoundedTopright: IconNode;
export declare const ArrowSort: IconNode;
export declare const ArrowSquareDown: IconNode;
export declare const ArrowSquareDownleft: IconNode;
export declare const ArrowSquareDownright: IconNode;
export declare const ArrowSquareLeft: IconNode;
export declare const ArrowSquareRight: IconNode;
export declare const ArrowSquareTop: IconNode;
export declare const ArrowSquareTopleft: IconNode;
export declare const ArrowSquareTopright: IconNode;
export declare const ArrowTop: IconNode;
export declare const ArrowTopleft: IconNode;
export declare const ArrowTopright: IconNode;
export declare const ArrowTvDouble: IconNode;
export declare const ArrowTvTriple: IconNode;
export declare const ArrowTv: IconNode;
export declare const ArrowUpwards: IconNode;
export declare const CaretDoubleLeft: IconNode;
export declare const CaretDoubleRight1: IconNode;
export declare const CaretDoubleRight: IconNode;
export declare const CaretDoubleTop: IconNode;
export declare const ChevronBreakDown: IconNode;
export declare const ChevronBreakLeft: IconNode;
export declare const ChevronBreakRight: IconNode;
export declare const ChevronBreakTop: IconNode;
export declare const ChevronCircleDown: IconNode;
export declare const ChevronCircleLeft: IconNode;
export declare const ChevronCircleRight: IconNode;
export declare const ChevronCircleTop: IconNode;
export declare const ChevronDoubleDown: IconNode;
export declare const ChevronDoubleDownleft: IconNode;
export declare const ChevronDoubleDownright: IconNode;
export declare const ChevronDoubleLeft: IconNode;
export declare const ChevronDoubleRight: IconNode;
export declare const ChevronDoubleTop: IconNode;
export declare const ChevronDoubleTopleft: IconNode;
export declare const ChevronDoubleTopright: IconNode;
export declare const ChevronDown: IconNode;
export declare const ChevronLeft: IconNode;
export declare const ChevronRight: IconNode;
export declare const ChevronSquareDown: IconNode;
export declare const ChevronSquareLeft: IconNode;
export declare const ChevronSquareRight: IconNode;
export declare const ChevronSquareTop: IconNode;
export declare const ChevronTop: IconNode;
export declare const CompassCircle: IconNode;
export declare const CompassCircleB: IconNode;
export declare const CompassSquare: IconNode;
export declare const CompassSquareB: IconNode;
export declare const EarthVarB: IconNode;
export declare const Earth: IconNode;
export declare const EarthB: IconNode;
export declare const MapAlt: IconNode;
export declare const MapPin: IconNode;
export declare const MapPinB: IconNode;
export declare const Map: IconNode;
export declare const MapB: IconNode;
export declare const NavAltVarB: IconNode;
export declare const NavAlt: IconNode;
export declare const NavAltB: IconNode;
export declare const NavDiag: IconNode;
export declare const NavDiagB: IconNode;
export declare const Nav: IconNode;
export declare const NavB: IconNode;
export declare const PinAdd: IconNode;
export declare const PinAddB: IconNode;
export declare const PinCircle: IconNode;
export declare const PinCircleB: IconNode;
export declare const PinCross: IconNode;
export declare const PinCrossB: IconNode;
export declare const Pin: IconNode;
export declare const PinB: IconNode;
