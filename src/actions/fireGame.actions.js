import {
    UPDATE_CURRENT_FALLING_MEN_INDEXES,
    UPDATE_BOUNCES_NEEDED,
    UPDATE_SCORE,
    UPDATE_MISS
} from '../config/reduxActionsTypes';

export const updateCurrentFallingMenIndexes = currentFallingMenIndexes => {
    return { type: UPDATE_CURRENT_FALLING_MEN_INDEXES, payload: { currentFallingMenIndexes } };
};

export const updateBouncesNeeded = bouncesNeeded => {
    return { type: UPDATE_BOUNCES_NEEDED, payload: { bouncesNeeded } };
};

export const updateScore = score => {
    return { type: UPDATE_SCORE, payload: { score } };
};

export const updateMiss = miss => {
    return { type: UPDATE_MISS, payload: { miss } };
};
