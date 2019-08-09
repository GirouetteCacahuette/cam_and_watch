import {
    UPDATE_POSE,
    UPDATE_WEBCAM_SIZE,
    UPDATE_CURRENT_FALLING_MEN_INDEXES,
    UPDATE_BOUNCES_NEEDED
} from '../config/reduxActionsTypes';

const initialState = {
    posenetPose: {},
    webcamSize: { width: null, height: null },
    fireGame: {
        currentFallingMenIndexes: [],
        bouncesNeeded: {
            bounce1: { bounceNeeded: false, bounceConfirmed: false },
            bounce2: { bounceNeeded: false, bounceConfirmed: false },
            bounce3: { bounceNeeded: false, bounceConfirmed: false }
        }
    }
};

export const camAndWatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSE:
        case UPDATE_WEBCAM_SIZE:
            return { ...state, ...action.payload };
        case UPDATE_CURRENT_FALLING_MEN_INDEXES:
        case UPDATE_BOUNCES_NEEDED:
            return { ...state, fireGame: { ...state.fireGame, ...action.payload } };
        default:
            return state;
    }
};
