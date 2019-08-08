import { UPDATE_POSE, UPDATE_WEBCAM_SIZE, UPDATE_CURRENT_FALLING_MEN_INDEXES } from '../config/reduxActionsTypes';

const initialState = {
    posenetPose: {},
    webcamSize: { width: null, height: null },
    fireGame: {
        currentFallingMenIndexes: []
    }
};

export const camAndWatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSE:
        case UPDATE_WEBCAM_SIZE:
            return { ...state, ...action.payload };
        case UPDATE_CURRENT_FALLING_MEN_INDEXES:
            return { ...state, fireGame: { ...state.fireGame, ...action.payload } };
        default:
            return state;
    }
};
