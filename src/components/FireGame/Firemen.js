import React, { useEffect, useState } from 'react';
import { FiremenSvg } from '../SVGs/FiremenSvg';
import { useSelector } from 'react-redux';
import { getKeypoint } from '../../config/Posenet/functions.posenet.config';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';

export const Firemen = () => {
    const posenetPose = useSelector(state => state.camAndWatchReducer.posenetPose);
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);
    const [firemenPosition, setFiremenPosition] = useState(null);
    const { followedByFiremenBodyPart, firemenDefaultWidth, firemenDefaultHeight } = useFiregameConstants();

    useEffect(() => {
        if (!!Object.keys(posenetPose).length) {
            setFiremenPosition(getKeypoint(posenetPose, followedByFiremenBodyPart));
        }
    }, [posenetPose]);

    return (
        <>
            {firemenPosition ? (
                <FiremenSvg
                    width={firemenDefaultWidth}
                    left={firemenPosition.x - firemenDefaultWidth / 2}
                    top={webcamSize.height - firemenDefaultHeight}
                />
            ) : null}
        </>
    );
};
