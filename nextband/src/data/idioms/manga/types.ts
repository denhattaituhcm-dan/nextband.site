export interface MangaCharacter {
  name: string;
  avatar:
    | "nobita"
    | "doraemon"
    | "suneo"
    | "chaien"
    | "shizuka"
    | "dekisugi"
    | "conan"
    | "kaito_kid"
    | "sensei"
    | string;
  emotion?:
    | "crying"
    | "smug"
    | "angry"
    | "sweat"
    | "happy"
    | "surprised"
    | "neutral"
    | "sleepy"
    | "whistle"
    | "wave"
    | "scratch"
    | "point"
    | "smile"
    | "aodai"
    | "exhausted"
    | "sad"
    | "wink"
    | string;
  line_en: string;
  line_vi: string;
}

export interface MangaComicDialogue {
  context_situation?: string;
  /** Flexible 2-4 dialogue turns (prioritize 3 turns: Setup -> Idiom/Twist -> Punchline) */
  turns?: MangaCharacter[];
  /** Backward-compatible 2-turn fields (used if `turns` is not provided) */
  characterA?: MangaCharacter;
  characterB?: MangaCharacter;
  punchline_tip: {
    ordinary_way: string;
    punchline_idiom: string;
    why_it_hits: string;
  };
}
