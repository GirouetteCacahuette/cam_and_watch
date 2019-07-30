import React, { useEffect } from 'react';
import { WEBCAM_CONSTANTS } from '../config/Webcam/constants.webcam.config';
import { WEBCAM_FUNCTIONS } from '../config/Webcam/functions.webcam.config';

const webcamElementId = WEBCAM_CONSTANTS.WEBCAM_ELEMENT_ID;
const webcamWidth = WEBCAM_CONSTANTS.WEBCAM_SIZE.width;
const webcamHeight = WEBCAM_CONSTANTS.WEBCAM_SIZE.height;

export const Webcam = () => {
    useEffect(() => {
        WEBCAM_FUNCTIONS.setupWebcam(webcamElementId, webcamWidth, webcamHeight);
    }, []);

    return (
        <video
            style={{ WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)' }}
            id={webcamElementId}
            autoPlay={true}
            width={webcamWidth}
            height={webcamHeight}
        />
    );
};
