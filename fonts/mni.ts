export type MniId =
  | "address-book"
  | "archive"
  | "attachment"
  | "badge"
  | "bank"
  | "briefcase"
  | "calculator"
  | "calendar"
  | "card-swipe"
  | "cash-bag"
  | "chair"
  | "coffee-mug"
  | "copier"
  | "dashboard"
  | "documents"
  | "envelope"
  | "file-cabinet"
  | "file-folder"
  | "file"
  | "files"
  | "flag"
  | "headphones"
  | "lamp"
  | "letter-envelope"
  | "link"
  | "map"
  | "marketing"
  | "microhone"
  | "navigation"
  | "notepad"
  | "notification"
  | "oective"
  | "pen-holder"
  | "phone"
  | "pie"
  | "plant"
  | "poster"
  | "printer"
  | "projector"
  | "receipt"
  | "reception"
  | "shelf"
  | "sticky-note"
  | "tie"
  | "trophy"
  | "user-tie"
  | "vault"
  | "volume"
  | "wallet"
  | "webcam";

export type MniKey =
  | "AddressBook"
  | "Archive"
  | "Attachment"
  | "Badge"
  | "Bank"
  | "Briefcase"
  | "Calculator"
  | "Calendar"
  | "CardSwipe"
  | "CashBag"
  | "Chair"
  | "CoffeeMug"
  | "Copier"
  | "Dashboard"
  | "Documents"
  | "Envelope"
  | "FileCabinet"
  | "FileFolder"
  | "File"
  | "Files"
  | "Flag"
  | "Headphones"
  | "Lamp"
  | "LetterEnvelope"
  | "Link"
  | "Map"
  | "Marketing"
  | "Microhone"
  | "Navigation"
  | "Notepad"
  | "Notification"
  | "Oective"
  | "PenHolder"
  | "Phone"
  | "Pie"
  | "Plant"
  | "Poster"
  | "Printer"
  | "Projector"
  | "Receipt"
  | "Reception"
  | "Shelf"
  | "StickyNote"
  | "Tie"
  | "Trophy"
  | "UserTie"
  | "Vault"
  | "Volume"
  | "Wallet"
  | "Webcam";

export enum Mni {
  AddressBook = "address-book",
  Archive = "archive",
  Attachment = "attachment",
  Badge = "badge",
  Bank = "bank",
  Briefcase = "briefcase",
  Calculator = "calculator",
  Calendar = "calendar",
  CardSwipe = "card-swipe",
  CashBag = "cash-bag",
  Chair = "chair",
  CoffeeMug = "coffee-mug",
  Copier = "copier",
  Dashboard = "dashboard",
  Documents = "documents",
  Envelope = "envelope",
  FileCabinet = "file-cabinet",
  FileFolder = "file-folder",
  File = "file",
  Files = "files",
  Flag = "flag",
  Headphones = "headphones",
  Lamp = "lamp",
  LetterEnvelope = "letter-envelope",
  Link = "link",
  Map = "map",
  Marketing = "marketing",
  Microhone = "microhone",
  Navigation = "navigation",
  Notepad = "notepad",
  Notification = "notification",
  Oective = "oective",
  PenHolder = "pen-holder",
  Phone = "phone",
  Pie = "pie",
  Plant = "plant",
  Poster = "poster",
  Printer = "printer",
  Projector = "projector",
  Receipt = "receipt",
  Reception = "reception",
  Shelf = "shelf",
  StickyNote = "sticky-note",
  Tie = "tie",
  Trophy = "trophy",
  UserTie = "user-tie",
  Vault = "vault",
  Volume = "volume",
  Wallet = "wallet",
  Webcam = "webcam",
}

export const MNI_CODEPOINTS: { [key in Mni]: string } = {
  [Mni.AddressBook]: "61697",
  [Mni.Archive]: "61698",
  [Mni.Attachment]: "61699",
  [Mni.Badge]: "61700",
  [Mni.Bank]: "61701",
  [Mni.Briefcase]: "61702",
  [Mni.Calculator]: "61703",
  [Mni.Calendar]: "61704",
  [Mni.CardSwipe]: "61705",
  [Mni.CashBag]: "61706",
  [Mni.Chair]: "61707",
  [Mni.CoffeeMug]: "61708",
  [Mni.Copier]: "61709",
  [Mni.Dashboard]: "61710",
  [Mni.Documents]: "61711",
  [Mni.Envelope]: "61712",
  [Mni.FileCabinet]: "61713",
  [Mni.FileFolder]: "61714",
  [Mni.File]: "61715",
  [Mni.Files]: "61716",
  [Mni.Flag]: "61717",
  [Mni.Headphones]: "61718",
  [Mni.Lamp]: "61719",
  [Mni.LetterEnvelope]: "61720",
  [Mni.Link]: "61721",
  [Mni.Map]: "61722",
  [Mni.Marketing]: "61723",
  [Mni.Microhone]: "61724",
  [Mni.Navigation]: "61725",
  [Mni.Notepad]: "61726",
  [Mni.Notification]: "61727",
  [Mni.Oective]: "61728",
  [Mni.PenHolder]: "61729",
  [Mni.Phone]: "61730",
  [Mni.Pie]: "61731",
  [Mni.Plant]: "61732",
  [Mni.Poster]: "61733",
  [Mni.Printer]: "61734",
  [Mni.Projector]: "61735",
  [Mni.Receipt]: "61736",
  [Mni.Reception]: "61737",
  [Mni.Shelf]: "61738",
  [Mni.StickyNote]: "61739",
  [Mni.Tie]: "61740",
  [Mni.Trophy]: "61741",
  [Mni.UserTie]: "61742",
  [Mni.Vault]: "61743",
  [Mni.Volume]: "61744",
  [Mni.Wallet]: "61745",
  [Mni.Webcam]: "61746",
};
