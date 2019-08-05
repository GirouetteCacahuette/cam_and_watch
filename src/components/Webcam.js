import React, { useEffect, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import { WEBCAM_CONSTANTS } from '../config/Webcam/constants.webcam.config';
import { WEBCAM_FUNCTIONS } from '../config/Webcam/functions.webcam.config';
import { getPose } from '../config/Posenet/functions.posenet.config';
import { useDispatch, useSelector } from 'react-redux';
import * as posenetActions from '../actions/posenet.actions';
import { updateWebcamSize } from '../actions/webcam.actions';

const webcamElementId = WEBCAM_CONSTANTS.WEBCAM_ELEMENT_ID;

export const Webcam = () => {
    const [net, setNet] = useState(null);
    const [posenetReady, setPosenetReady] = useState(false);
    const [webcamReady, setWebcamReady] = useState(false);
    const pose = useSelector(state => state.camAndWatchReducer.posenetPose);
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);
    const dispatch = useDispatch();

    const setupWebcam = async () => {
        const newWebcamSize = WEBCAM_FUNCTIONS.getWebcamSize(16 / 9, { width: 1920, height: 1080 });
        await dispatch(updateWebcamSize(newWebcamSize));
        const videoElement = document.getElementById(webcamElementId);
        if (navigator.mediaDevices.getUserMedia) {
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: newWebcamSize });
            setWebcamReady(true);
        }
        // else display 'No webcam detected'
    };

    const setupPosenet = async () => {
        setNet(await posenet.load());
        setPosenetReady(true);
    };

    useEffect(() => {
        setupWebcam();
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
        <>
            {webcamSize.width !== null ? (
                <video
                    style={{ WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)' }}
                    id={webcamElementId}
                    autoPlay={true}
                    width={webcamSize.width}
                    height={webcamSize.height}
                />
            ) : null}
        </>
    );
};
