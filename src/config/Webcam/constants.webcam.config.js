import { WEBCAM_FUNCTIONS } from './functions.webcam.config';

export const WEBCAM_CONSTANTS = {
    WEBCAM_ELEMENT_ID: 'WEBCAM_ELEMENT_ID',
    WEBCAM_SIZE: WEBCAM_FUNCTIONS.getWebcamSize(16 / 9, { width: 1920, height: 1080 })
};
