import { UPDATE_POSE } from '../config/reduxActionsTypes';

export const updatePose = posenetPose => {
    return { type: UPDATE_POSE, payload: { posenetPose } };
};
