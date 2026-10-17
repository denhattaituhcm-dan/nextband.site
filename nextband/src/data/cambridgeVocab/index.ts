import { CambridgeUnitData } from "./types";
import { unit01Data } from "./unit01";
import { unit02Data } from "./unit02";
import { unit03Data } from "./unit03";
import { unit04Data } from "./unit04";
import { unit05Data } from "./unit05";
import { unit06Data } from "./unit06";
import { unit07Data } from "./unit07";
import { unit08Data } from "./unit08";
import { unit09Data } from "./unit09";
import { unit10Data } from "./unit10";
import { unit11Data } from "./unit11";
import { unit12Data } from "./unit12";
import { unit13Data } from "./unit13";
import { unit14Data } from "./unit14";
import { unit15Data } from "./unit15";
import { unit16Data } from "./unit16";
import { unit17Data } from "./unit17";
import { unit18Data } from "./unit18";
import { unit19Data } from "./unit19";
import { unit20Data } from "./unit20";
import { CAMBRIDGE_VOCAB_UNITS } from "./unitsMeta";

export * from "./types";
export * from "./unitsMeta";
export * from "./unit01";
export * from "./unit02";
export * from "./unit03";
export * from "./unit04";
export * from "./unit05";
export * from "./unit06";
export * from "./unit07";
export * from "./unit08";
export * from "./unit09";
export * from "./unit10";
export * from "./unit11";
export * from "./unit12";
export * from "./unit13";
export * from "./unit14";
export * from "./unit15";
export * from "./unit16";
export * from "./unit17";
export * from "./unit18";
export * from "./unit19";
export * from "./unit20";

const unitsDataMap: Record<number, CambridgeUnitData> = {
  1: unit01Data,
  2: unit02Data,
  3: unit03Data,
  4: unit04Data,
  5: unit05Data,
  6: unit06Data,
  7: unit07Data,
  8: unit08Data,
  9: unit09Data,
  10: unit10Data,
  11: unit11Data,
  12: unit12Data,
  13: unit13Data,
  14: unit14Data,
  15: unit15Data,
  16: unit16Data,
  17: unit17Data,
  18: unit18Data,
  19: unit19Data,
  20: unit20Data
};

export function getCambridgeUnitData(unitId: number): CambridgeUnitData | null {
  return unitsDataMap[unitId] || null;
}
