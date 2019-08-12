import React, { useState, useEffect } from 'react';
import { FallingManSvg } from '../SVGs/FallingManSvg';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateCurrentFallingMenIndexes,
    updateBouncesNeeded,
    updateMiss,
    updateScore
} from '../../actions/fireGame.actions';

export const FallingMan = ({ index }) => {
    const {
        fallingManDefaultWidth,
        fallingMenPositions,
        fallingMenCrashVerticalPosition,
        defaultDelayBetweenTwoFallingManPositions,
        bouncePointsNames
    } = useFiregameConstants();
    const currentFallingMenIndexes = useSelector(state => state.camAndWatchReducer.fireGame.currentFallingMenIndexes);
    const bouncesNeeded = useSelector(state => state.camAndWatchReducer.fireGame.bouncesNeeded);
    const miss = useSelector(state => state.camAndWatchReducer.fireGame.miss);
    const dispatch = useDispatch();
    const positionsValues = Object.values(fallingMenPositions);
    const positionsKeys = Object.keys(fallingMenPositions);
    const [currentPosition, setCurrentPosition] = useState({ index: 0, coordinates: positionsValues[0] });
    const [fallingManWillBeDeleted, setFallingManWillBeDeleted] = useState(false);
    const [deleteFallingMan, setDeleteFallingMan] = useState(false);
    const [needToCheckBounce, setNeedToCheckBounce] = useState(false);

    const updatePosition = () => {
        setTimeout(() => {
            setCurrentPosition({
                index: currentPosition.index + 1,
                coordinates: positionsValues[currentPosition.index + 1]
            });
        }, defaultDelayBetweenTwoFallingManPositions);
    };

    useEffect(() => {
        if (!fallingManWillBeDeleted) {
            if (currentPosition.index < positionsValues.length - 1) {
                if (bouncePointsNames.includes(positionsKeys[currentPosition.index])) {
                    dispatch(
                        updateBouncesNeeded({
                            ...bouncesNeeded,
                            [positionsKeys[currentPosition.index]]: { bounceNeeded: true, bounceConfirmed: false }
                        })
                    );
                    setTimeout(() => {
                        setNeedToCheckBounce(true);
                    }, defaultDelayBetweenTwoFallingManPositions);
                } else {
                    updatePosition();
                }
            } else {
                setFallingManWillBeDeleted(true);
                setTimeout(() => {
                    setDeleteFallingMan(true);
                }, defaultDelayBetweenTwoFallingManPositions);
            }
        }
    }, [currentPosition]);

    const checkBounceAndUpdatePosition = () => {
        dispatch(
            updateBouncesNeeded({
                ...bouncesNeeded,
                [positionsKeys[currentPosition.index]]: {
                    ...bouncesNeeded[positionsKeys[currentPosition.index]],
                    bounceNeeded: false
                }
            })
        );
        if (!bouncesNeeded[positionsKeys[currentPosition.index]].bounceConfirmed) {
            dispatch(updateMiss(miss + 1));
            setFallingManWillBeDeleted(true);
            setCurrentPosition({
                index: currentPosition.index + 1,
                coordinates: { x: currentPosition.coordinates.x, y: fallingMenCrashVerticalPosition }
            });
            setTimeout(() => setDeleteFallingMan(true), defaultDelayBetweenTwoFallingManPositions);
        } else {
            setCurrentPosition({
                index: currentPosition.index + 1,
                coordinates: positionsValues[currentPosition.index + 1]
            });
        }
    };

    useEffect(() => {
        if (needToCheckBounce) {
            setNeedToCheckBounce(false);
            checkBounceAndUpdatePosition();
        }
    }, [needToCheckBounce]);

    useEffect(() => {
        if (deleteFallingMan)
            dispatch(
                updateCurrentFallingMenIndexes(
                    currentFallingMenIndexes.filter(mapIndex => {
                        return index !== mapIndex;
                    })
                )
            );
    }, [deleteFallingMan]);

    return (
        <FallingManSvg
            width={fallingManDefaultWidth}
            top={currentPosition.coordinates.y}
            left={currentPosition.coordinates.x}
        />
    );
};
