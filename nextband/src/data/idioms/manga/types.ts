export interface MangaCharacter {
  name: string;
  avatar: "nobita" | "doraemon" | "suneo" | "chaien" | "shizuka" | "conan" | "kaito_kid" | "sensei" | string;
  emotion?: "crying" | "smug" | "angry" | "sweat" | "happy" | "surprised" | "neutral" | "sleepy" | "whistle" | "wave" | "scratch" | "point" | "smile" | "aodai" | string;
  line_en: string;
  line_vi: string;
}

export interface MangaComicDialogue {
  context_situation?: string;
  characterA: MangaCharacter;
  characterB: MangaCharacter;
  punchline_tip: {
    ordinary_way: string;
    punchline_idiom: string;
    why_it_hits: string;
  };
}
