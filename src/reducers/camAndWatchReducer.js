import { UPDATE_POSE, UPDATE_WEBCAM_SIZE } from '../config/reduxActionsTypes';

const initialState = {
    posenetPose: {},
    webcamSize: { width: null, height: null }
};

export const camAndWatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSE:
        case UPDATE_WEBCAM_SIZE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
