export type MniId =
  | "user-circle-block"
  | "user-circle-code"
  | "user-sqaure-code";

export type MniKey =
  | "UserCircleBlock"
  | "UserCircleCode"
  | "UserSqaureCode";

export enum Mni {
  UserCircleBlock = "user-circle-block",
  UserCircleCode = "user-circle-code",
  UserSqaureCode = "user-sqaure-code",
}

export const MNI_CODEPOINTS: { [key in Mni]: string } = {
  [Mni.UserCircleBlock]: "61697",
  [Mni.UserCircleCode]: "61698",
  [Mni.UserSqaureCode]: "61699",
};
