import { UPDATE_CURRENT_FALLING_MEN_INDEXES, UPDATE_BOUNCES_NEEDED } from '../config/reduxActionsTypes';

export const updateCurrentFallingMenIndexes = currentFallingMenIndexes => {
    return { type: UPDATE_CURRENT_FALLING_MEN_INDEXES, payload: { currentFallingMenIndexes } };
};

export const updateBouncesNeeded = bouncesNeeded => {
    return { type: UPDATE_BOUNCES_NEEDED, payload: { bouncesNeeded } };
};
