import { C2UnitData } from "./types";
import unit01 from "./units/unit_01.json";
import unit02 from "./units/unit_02.json";
import unit03 from "./units/unit_03.json";
import unit04 from "./units/unit_04.json";
import unit05 from "./units/unit_05.json";
import unit06 from "./units/unit_06.json";
import unit07 from "./units/unit_07.json";
import unit08 from "./units/unit_08.json";
import unit09 from "./units/unit_09.json";
import unit10 from "./units/unit_10.json";
import unit11 from "./units/unit_11.json";
import unit12 from "./units/unit_12.json";

export const VOCAB_C2_UNITS: C2UnitData[] = [
  unit01 as unknown as C2UnitData,
  unit02 as unknown as C2UnitData,
  unit03 as unknown as C2UnitData,
  unit04 as unknown as C2UnitData,
  unit05 as unknown as C2UnitData,
  unit06 as unknown as C2UnitData,
  unit07 as unknown as C2UnitData,
  unit08 as unknown as C2UnitData,
  unit09 as unknown as C2UnitData,
  unit10 as unknown as C2UnitData,
  unit11 as unknown as C2UnitData,
  unit12 as unknown as C2UnitData,
];

export function getC2UnitByNumber(unitNumber: number): C2UnitData {
  const match = VOCAB_C2_UNITS.find((u) => u.unitNumber === unitNumber);
  return match || VOCAB_C2_UNITS[0];
}

export function getAllC2UnitMetas() {
  return VOCAB_C2_UNITS.map((u) => ({
    unitNumber: u.unitNumber,
    unitCode: u.unitCode,
    titleEn: u.titleEn,
    titleVi: u.titleVi,
    themeSummaryVi: u.themeSummaryVi,
    pdfPages: u.pdfPages,
    isFullVerticalSlice: u.isFullVerticalSlice,
    lexiconCount:
      u.schemaItems.length +
      u.collocationPairs.length +
      u.domainSortItems.length +
      u.triLockPuzzles.length +
      u.personaCards.length +
      u.binaryPrecisionPairs.length,
  }));
}
