import React, { useEffect, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import { WEBCAM_CONSTANTS } from '../config/Webcam/constants.webcam.config';
import { WEBCAM_FUNCTIONS } from '../config/Webcam/functions.webcam.config';
import { getPose } from '../config/Posenet/functions.posenet.config';
import { useDispatch, useSelector } from 'react-redux';
import * as posenetActions from '../actions/posenet.actions';

const webcamElementId = WEBCAM_CONSTANTS.WEBCAM_ELEMENT_ID;
const webcamWidth = WEBCAM_CONSTANTS.WEBCAM_SIZE.width;
const webcamHeight = WEBCAM_CONSTANTS.WEBCAM_SIZE.height;

export const Webcam = () => {
    const [net, setNet] = useState(null);
    const [posenetReady, setPosenetReady] = useState(false);
    const [webcamReady, setWebcamReady] = useState(false);
    const pose = useSelector(state => state.camAndWatchReducer.posenetPose);
    const dispatch = useDispatch();

    const setupPosenet = async () => {
        setNet(await posenet.load());
        setPosenetReady(true);
    };

    useEffect(() => {
        WEBCAM_FUNCTIONS.setupWebcam(webcamElementId, webcamWidth, webcamHeight, () => setWebcamReady(true));
        setupPosenet();
    }, []);

    const updatePose = async () => {
        try {
            dispatch(posenetActions.updatePose(await getPose(net, webcamElementId)));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (posenetReady && webcamReady) updatePose();
    }, [pose, posenetReady, webcamReady]);

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
