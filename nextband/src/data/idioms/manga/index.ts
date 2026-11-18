import { MangaComicDialogue } from "./types";

import { UNIT_01_MANGA } from "./unit01";
import { UNIT_02_MANGA } from "./unit02";
import { UNIT_03_MANGA } from "./unit03";
import { UNIT_04_MANGA } from "./unit04";
import { UNIT_05_MANGA } from "./unit05";
import { UNIT_06_MANGA } from "./unit06";
import { UNIT_07_MANGA } from "./unit07";
import { UNIT_08_MANGA } from "./unit08";
import { UNIT_09_MANGA } from "./unit09";
import { UNIT_10_MANGA } from "./unit10";
import { UNIT_11_MANGA } from "./unit11";
import { UNIT_12_MANGA } from "./unit12";
import { UNIT_13_MANGA } from "./unit13";
import { UNIT_14_MANGA } from "./unit14";
import { UNIT_15_MANGA } from "./unit15";
import { UNIT_16_MANGA } from "./unit16";
import { UNIT_17_MANGA } from "./unit17";
import { UNIT_18_MANGA } from "./unit18";
import { UNIT_19_MANGA } from "./unit19";
import { UNIT_20_MANGA } from "./unit20";

export const MANGA_BY_UNIT: Record<number, Record<string, MangaComicDialogue>> = {
  1: UNIT_01_MANGA,
  2: UNIT_02_MANGA,
  3: UNIT_03_MANGA,
  4: UNIT_04_MANGA,
  5: UNIT_05_MANGA,
  6: UNIT_06_MANGA,
  7: UNIT_07_MANGA,
  8: UNIT_08_MANGA,
  9: UNIT_09_MANGA,
  10: UNIT_10_MANGA,
  11: UNIT_11_MANGA,
  12: UNIT_12_MANGA,
  13: UNIT_13_MANGA,
  14: UNIT_14_MANGA,
  15: UNIT_15_MANGA,
  16: UNIT_16_MANGA,
  17: UNIT_17_MANGA,
  18: UNIT_18_MANGA,
  19: UNIT_19_MANGA,
  20: UNIT_20_MANGA,
};

export * from "./types";
