export type MniId =
  | "user-add"
  | "user-check"
  | "user-circle-block"
  | "user-circle-code"
  | "user-circle"
  | "user-cross"
  | "user-sqaure-block"
  | "user-sqaure-check"
  | "user-sqaure-code"
  | "user-square-add"
  | "user-square"
  | "users";

export type MniKey =
  | "UserAdd"
  | "UserCheck"
  | "UserCircleBlock"
  | "UserCircleCode"
  | "UserCircle"
  | "UserCross"
  | "UserSqaureBlock"
  | "UserSqaureCheck"
  | "UserSqaureCode"
  | "UserSquareAdd"
  | "UserSquare"
  | "Users";

export enum Mni {
  UserAdd = "user-add",
  UserCheck = "user-check",
  UserCircleBlock = "user-circle-block",
  UserCircleCode = "user-circle-code",
  UserCircle = "user-circle",
  UserCross = "user-cross",
  UserSqaureBlock = "user-sqaure-block",
  UserSqaureCheck = "user-sqaure-check",
  UserSqaureCode = "user-sqaure-code",
  UserSquareAdd = "user-square-add",
  UserSquare = "user-square",
  Users = "users",
}

export const MNI_CODEPOINTS: { [key in Mni]: string } = {
  [Mni.UserAdd]: "61697",
  [Mni.UserCheck]: "61698",
  [Mni.UserCircleBlock]: "61699",
  [Mni.UserCircleCode]: "61700",
  [Mni.UserCircle]: "61701",
  [Mni.UserCross]: "61702",
  [Mni.UserSqaureBlock]: "61703",
  [Mni.UserSqaureCheck]: "61704",
  [Mni.UserSqaureCode]: "61705",
  [Mni.UserSquareAdd]: "61706",
  [Mni.UserSquare]: "61707",
  [Mni.Users]: "61708",
};
