import { UPDATE_CURRENT_FALLING_MEN_INDEXES } from '../config/reduxActionsTypes';

export const updateCurrentFallingMenIndexes = currentFallingMenIndexes => {
    return { type: UPDATE_CURRENT_FALLING_MEN_INDEXES, payload: { currentFallingMenIndexes } };
};
