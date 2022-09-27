export interface UserAnswerArgs {
  questionnaireId: string;
}

export interface UserAnswerInput {
  input: { questionnaireId: string; answers: number[] };
}

export interface SaveResult {
  didRequest: true;
}

export interface UserAnswer {
  answers: number[];
  date?: Date;
}

export type Scl90Result = {
  total: number;
  generalSymptomaticIndex: string;
  numberOfItemsGreaterThanOrEqualToTwo: number;
  numberOfItemsLessThanTwo: number;
  positiveSymptomDistressLevel: string;
  positiveSymptomAverage: string;
  f1: string;
  f2: string;
  f3: string;
  f4: string;
  f5: string;
  f6: string;
  f7: string;
  f8: string;
  f9: string;
  f10: string;
};

export interface TScores {
  eTScore: string;
  nTScore: string;
  pTScore: string;
  lTScore: string;
}
