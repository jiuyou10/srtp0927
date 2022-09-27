export interface EysenckFormResult {
  eTScore: string;
  pTScore: string;
  nTScore: string;
  lTScore: string;
}

export interface YamlBrownResult {
  yaleBrownMind: number;
  yaleBrownBehavior: number;
  yaleBrownTotal: number;
}

export interface PsssResult {
  psssTotal: number;
  psssP: number;
  psssS: number;
}

export interface MdqResult {
  mdqTotal: number;
  isMdqTwoSituationsHappenAtSameTime: boolean;
  mdqInfluence: number;
}

export interface PsqiResult {
  psqiA: number;
  psqiB: number;
  psqiC: number;
  psqiD: number;
  psqiE: number;
  psqiF: number;
  psqiG: number;
  psqiTotal: number;
}

export interface PhcssResult {
  phcssTotal: number;
  phcss1: number;
  phcss2: number;
  phcss3: number;
  phcss4: number;
  phcss5: number;
  phcss6: number;
}

export interface EmbuResult {
  embuIsFatherAnswerCompleted: boolean;
  embuIsMotherAnswerCompleted: boolean;
  embuFatherComponents: number[];
  embuMotherComponents: number[];
}