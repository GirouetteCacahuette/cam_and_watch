import React, { useState, useEffect } from 'react';
import { FallingManSvg } from '../SVGs/FallingManSvg';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';

export const FallingMan = ({ index, removeFunction }) => {
    const {
        fallingManDefaultWidth,
        fallingMenPositions,
        defaultDelayBetweenTwoFallingManPositions
    } = useFiregameConstants();
    const positionsValues = Object.values(fallingMenPositions);
    const [currentPosition, setCurrentPosition] = useState({ index: 0, coordinates: positionsValues[0] });

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
            console.log('will remove', index);
            setTimeout(() => {
                removeFunction(index);
            }, defaultDelayBetweenTwoFallingManPositions);
        }
    }, [currentPosition]);

    return (
        <FallingManSvg
            width={fallingManDefaultWidth}
            top={currentPosition.coordinates.y}
            left={currentPosition.coordinates.x}
        />
    );
};
