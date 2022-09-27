"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionnaireSorter = exports.dateToString = void 0;
const dateToString = (date) => {
    if (!date) {
        return "";
    }
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
exports.dateToString = dateToString;
const questionnaireSorter = (dir) => (questionnaire1, questionnaire2, direction = dir) => {
    let returnedValue = 0;
    const fillInDate1 = questionnaire1.fillInDate;
    const fillInDate2 = questionnaire2.fillInDate;
    if (!fillInDate1 || !fillInDate2) {
        if (!fillInDate1 && !fillInDate2) {
            returnedValue = 0;
        }
        else if (fillInDate1 && !fillInDate2) {
            returnedValue = -1;
        }
        else {
            returnedValue = 1;
        }
    }
    else if (fillInDate1 < fillInDate2) {
        returnedValue = -1;
    }
    else {
        returnedValue = 1;
    }
    return returnedValue * direction;
};
exports.questionnaireSorter = questionnaireSorter;
