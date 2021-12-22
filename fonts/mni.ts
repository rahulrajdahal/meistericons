export type MniId =
  | "calendar-a-add"
  | "calendar-a-dots"
  | "calendar-a"
  | "calendar-add"
  | "calendar-check"
  | "calendar-cross"
  | "calendar-dash"
  | "calendar-dot"
  | "calendar-lines"
  | "calendar-star"
  | "calendar"
  | "clock-circle";

export type MniKey =
  | "CalendarAAdd"
  | "CalendarADots"
  | "CalendarA"
  | "CalendarAdd"
  | "CalendarCheck"
  | "CalendarCross"
  | "CalendarDash"
  | "CalendarDot"
  | "CalendarLines"
  | "CalendarStar"
  | "Calendar"
  | "ClockCircle";

export enum Mni {
  CalendarAAdd = "calendar-a-add",
  CalendarADots = "calendar-a-dots",
  CalendarA = "calendar-a",
  CalendarAdd = "calendar-add",
  CalendarCheck = "calendar-check",
  CalendarCross = "calendar-cross",
  CalendarDash = "calendar-dash",
  CalendarDot = "calendar-dot",
  CalendarLines = "calendar-lines",
  CalendarStar = "calendar-star",
  Calendar = "calendar",
  ClockCircle = "clock-circle",
}

export const MNI_CODEPOINTS: { [key in Mni]: string } = {
  [Mni.CalendarAAdd]: "61697",
  [Mni.CalendarADots]: "61698",
  [Mni.CalendarA]: "61699",
  [Mni.CalendarAdd]: "61700",
  [Mni.CalendarCheck]: "61701",
  [Mni.CalendarCross]: "61702",
  [Mni.CalendarDash]: "61703",
  [Mni.CalendarDot]: "61704",
  [Mni.CalendarLines]: "61705",
  [Mni.CalendarStar]: "61706",
  [Mni.Calendar]: "61707",
  [Mni.ClockCircle]: "61708",
};
