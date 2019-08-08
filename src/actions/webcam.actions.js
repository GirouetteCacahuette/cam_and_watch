import { UPDATE_WEBCAM_SIZE } from '../config/reduxActionsTypes';

export const updateWebcamSize = webcamSize => {
    return { type: UPDATE_WEBCAM_SIZE, payload: { webcamSize } };
};
