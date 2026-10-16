import { CambridgeUnitData } from "./types";
import { unit05Data } from "./unit05";
import { CAMBRIDGE_VOCAB_UNITS } from "./unitsMeta";

export * from "./types";
export * from "./unitsMeta";

const unitsDataMap: Record<number, CambridgeUnitData> = {
  5: unit05Data
};

export function getCambridgeUnitData(unitId: number): CambridgeUnitData | null {
  return unitsDataMap[unitId] || null;
}
