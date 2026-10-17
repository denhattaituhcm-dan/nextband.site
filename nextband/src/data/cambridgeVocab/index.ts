import { CambridgeUnitData } from "./types";
import { unit01Data } from "./unit01";
import { unit02Data } from "./unit02";
import { unit03Data } from "./unit03";
import { unit04Data } from "./unit04";
import { unit05Data } from "./unit05";
import { unit06Data } from "./unit06";
import { CAMBRIDGE_VOCAB_UNITS } from "./unitsMeta";

export * from "./types";
export * from "./unitsMeta";

const unitsDataMap: Record<number, CambridgeUnitData> = {
  1: unit01Data,
  2: unit02Data,
  3: unit03Data,
  4: unit04Data,
  5: unit05Data,
  6: unit06Data
};

export function getCambridgeUnitData(unitId: number): CambridgeUnitData | null {
  return unitsDataMap[unitId] || null;
}
