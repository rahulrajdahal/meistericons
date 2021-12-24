export type MniId =
  | "calendar-a-add"
  | "calendar-a"
  | "calendar";

export type MniKey =
  | "CalendarAAdd"
  | "CalendarA"
  | "Calendar";

export enum Mni {
  CalendarAAdd = "calendar-a-add",
  CalendarA = "calendar-a",
  Calendar = "calendar",
}

export const MNI_CODEPOINTS: { [key in Mni]: string } = {
  [Mni.CalendarAAdd]: "61697",
  [Mni.CalendarA]: "61698",
  [Mni.Calendar]: "61699",
};
