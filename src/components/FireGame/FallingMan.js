import React, { useState, useEffect } from 'react';
import { FallingManSvg } from '../SVGs/FallingManSvg';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentFallingMenIndexes } from '../../actions/fireGame.actions';

export const FallingMan = ({ index }) => {
    const {
        fallingManDefaultWidth,
        fallingMenPositions,
        defaultDelayBetweenTwoFallingManPositions
    } = useFiregameConstants();
    const currentFallingMenIndexes = useSelector(state => state.camAndWatchReducer.fireGame.currentFallingMenIndexes);
    const dispatch = useDispatch();
    const positionsValues = Object.values(fallingMenPositions);
    const [currentPosition, setCurrentPosition] = useState({ index: 0, coordinates: positionsValues[0] });
    const [deleteFallingMan, setDeleteFallingMan] = useState(false);

    const updatePosition = () => {
        setTimeout(() => {
            setCurrentPosition({
                index: currentPosition.index + 1,
                coordinates: positionsValues[currentPosition.index + 1]
            });
        }, defaultDelayBetweenTwoFallingManPositions);
    };

    useEffect(() => {
        if (currentPosition.index < positionsValues.length - 1) {
            updatePosition();
        } else {
            setTimeout(() => {
                setDeleteFallingMan(true);
            }, defaultDelayBetweenTwoFallingManPositions);
        }
    }, [currentPosition]);

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
