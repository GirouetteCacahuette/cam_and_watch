import React, { useEffect, useState } from 'react';
import { FiremenSvg } from '../SVGs/FiremenSvg';
import { useSelector } from 'react-redux';
import { getKeypoint } from '../../config/Posenet/functions.posenet.config';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';
import { useDispatch } from 'react-redux';
import { updateBouncesNeeded, updateScore } from '../../actions/fireGame.actions';

export const Firemen = () => {
    const posenetPose = useSelector(state => state.camAndWatchReducer.posenetPose);
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);
    const bouncesNeeded = useSelector(state => state.camAndWatchReducer.fireGame.bouncesNeeded);
    const score = useSelector(state => state.camAndWatchReducer.fireGame.score);
    const dispatch = useDispatch();
    const [firemenPosition, setFiremenPosition] = useState(null);
    const {
        followedByFiremenBodyPart,
        firemenDefaultWidth,
        firemenDefaultHeight,
        firemenStretcherDefaultWidth,
        fallingMenPositions,
        bouncePointsNames,
        buildingDefaultWidth
    } = useFiregameConstants();

    useEffect(() => {
        if (!!Object.keys(posenetPose).length) {
            const bodyPartPosition = getKeypoint(posenetPose, followedByFiremenBodyPart);
            if (bodyPartPosition) {
                if (bodyPartPosition.x < buildingDefaultWidth + firemenDefaultWidth / 2)
                    setFiremenPosition({ x: buildingDefaultWidth + firemenDefaultWidth / 2 });
                else if (bodyPartPosition.x > webcamSize.width - firemenDefaultWidth / 2)
                    setFiremenPosition({ x: webcamSize.width - firemenDefaultWidth / 2 });
                else setFiremenPosition({ x: bodyPartPosition.x });
            }
        }
    }, [posenetPose]);

    useEffect(() => {
        if (firemenPosition) {
            bouncePointsNames.map(bouncePointName => {
                if (
                    bouncesNeeded[bouncePointName].bounceNeeded &&
                    (firemenPosition.x <= fallingMenPositions[bouncePointName].x + firemenStretcherDefaultWidth / 2 &&
                        firemenPosition.x >= fallingMenPositions[bouncePointName].x - firemenStretcherDefaultWidth / 2)
                ) {
                    dispatch(
                        updateBouncesNeeded({
                            ...bouncesNeeded,
                            [bouncePointName]: { bounceNeeded: false, bounceConfirmed: true }
                        })
                    );
                    dispatch(updateScore(score + 1));
                }
                return null;
            });
        }
    }, [firemenPosition]);

    return (
        <>
            {firemenPosition ? (
                <FiremenSvg
                    width={firemenDefaultWidth}
                    left={firemenPosition.x}
                    top={webcamSize.height - firemenDefaultHeight}
                />
            ) : null}
        </>
    );
};
