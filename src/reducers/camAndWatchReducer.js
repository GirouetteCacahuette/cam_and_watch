import { UPDATE_POSE } from '../config/reduxActionsTypes';

const initialState = {
    posenetPose: {}
};

export const camAndWatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
