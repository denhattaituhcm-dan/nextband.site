export type MangaAvatarId =
  | "nobita"
  | "doraemon"
  | "suneo"
  | "chaien"
  | "shizuka"
  | "dekisugi"
  | "conan"
  | "kaito_kid"
  | "sensei";

export type MangaEmotionId =
  | "angry"
  | "happy"
  | "sad"
  | "whistle"
  | "wink"
  | "exhausted"
  | "point"
  | "scratch"
  | "smug"
  | "smile"
  | "aodai";

export interface MangaCharacter {
  name: string;
  avatar: MangaAvatarId;
  emotion?: MangaEmotionId;
  line_en: string;
  line_vi: string;
}

export interface MangaComicDialogue {
  context_situation?: string;
  /** Flexible 2-4 dialogue turns (standard 3 turns: Setup -> Idiom/Twist -> Punchline) */
  turns: MangaCharacter[];
  punchline_tip: {
    ordinary_way: string;
    punchline_idiom: string;
    why_it_hits: string;
  };
}
