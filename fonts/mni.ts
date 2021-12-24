export type MniId =
  | "cricket-ball"
  | "football-a"
  | "football"
  | "hockey"
  | "rugby-helbet"
  | "tennis"
  | "yoga-mat";

export type MniKey =
  | "CricketBall"
  | "FootballA"
  | "Football"
  | "Hockey"
  | "RugbyHelbet"
  | "Tennis"
  | "YogaMat";

export enum Mni {
  CricketBall = "cricket-ball",
  FootballA = "football-a",
  Football = "football",
  Hockey = "hockey",
  RugbyHelbet = "rugby-helbet",
  Tennis = "tennis",
  YogaMat = "yoga-mat",
}

export const MNI_CODEPOINTS: { [key in Mni]: string } = {
  [Mni.CricketBall]: "61697",
  [Mni.FootballA]: "61698",
  [Mni.Football]: "61699",
  [Mni.Hockey]: "61700",
  [Mni.RugbyHelbet]: "61701",
  [Mni.Tennis]: "61702",
  [Mni.YogaMat]: "61703",
};
