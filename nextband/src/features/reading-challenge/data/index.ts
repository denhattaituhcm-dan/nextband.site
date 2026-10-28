import { UnitConfig } from '../types';
import { unit01 } from './units/unit01';
import { unit02 } from './units/unit02';
import { unit03 } from './units/unit03';
import { unit04 } from './units/unit04';
import { unit05 } from './units/unit05';
import { unit06 } from './units/unit06';
import { unit07 } from './units/unit07';
import { unit08 } from './units/unit08';
import { unit09 } from './units/unit09';
import { unit10 } from './units/unit10';
import { unit11 } from './units/unit11';
import { unit12 } from './units/unit12';
import { unit13 } from './units/unit13';
import { unit14 } from './units/unit14';
import { unit15 } from './units/unit15';
import { unit16 } from './units/unit16';
import { unit17 } from './units/unit17';
import { unit18 } from './units/unit18';
import { unit19 } from './units/unit19';
import { unit20 } from './units/unit20';

export const UNITS_CATALOG: UnitConfig[] = [
  unit01,
  unit02,
  unit03,
  unit04,
  unit05,
  unit06,
  unit07,
  unit08,
  unit09,
  unit10,
  unit11,
  unit12,
  unit13,
  unit14,
  unit15,
  unit16,
  unit17,
  unit18,
  unit19,
  unit20,
];

export function getUnitByNumber(unitNumber: number): UnitConfig | undefined {
  return UNITS_CATALOG.find((u) => u.unitNumber === unitNumber);
}

