import React, { useState, useEffect } from 'react';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';
import { BuildingSvg } from '../SVGs/BuildingSvg';
import { FireSvg } from '../SVGs/FireSvg';
import { Firemen } from './Firemen';
import { useSelector } from 'react-redux';
import { FallingMan } from './FallingMan';

export const FireGame = () => {
    const {
        buildingDefaultHeight,
        fireDefaultHeight,
        defaultDelayBetweenFallingMen,
        defaultMinDelayBetweenFallingMen
    } = useFiregameConstants();
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);
    const [currentFallingMenIndexes, setCurrentFallingMenIndexes] = useState([]);
    const [currentDelayBetweenFallingMen, setCurrentDelayBetweenFallingMen] = useState(defaultDelayBetweenFallingMen);
    const [fallingManIndexToRemove, setFallingManIndexToRemove] = useState(0);
    const [mustNewManPop, setMustNewManPop] = useState(false);
    const [tooMuchMenToPopANewOne, setTooMuchMenToPopANewOne] = useState(false);
    const [numberOfPoppedFallingMen, setNumberOfPoppedFallingMen] = useState(0);

    const removeIndexFromCurrentFallingMenIndexes = indexToRemove => {
        setFallingManIndexToRemove(indexToRemove);
    };

    const popFallingMan = delayBeforeNextMan => {
        console.log(currentFallingMenIndexes);
        setCurrentFallingMenIndexes([...currentFallingMenIndexes, numberOfPoppedFallingMen + 1]);
        setNumberOfPoppedFallingMen(numberOfPoppedFallingMen + 1);
        setCurrentDelayBetweenFallingMen(
            delayBeforeNextMan <= defaultMinDelayBetweenFallingMen
                ? defaultMinDelayBetweenFallingMen + Math.random() * defaultMinDelayBetweenFallingMen
                : delayBeforeNextMan * 0.9
        );
        setTimeout(() => {
            setMustNewManPop(true);
        }, delayBeforeNextMan);
    };

    useEffect(() => {
        setMustNewManPop(true);
    }, []);

    useEffect(() => {
        if (mustNewManPop) {
            setMustNewManPop(false);
            if (currentFallingMenIndexes.length < 4) popFallingMan(currentDelayBetweenFallingMen);
            else setTooMuchMenToPopANewOne(true);
        }
    }, [mustNewManPop]);

    useEffect(() => {
        const numberOfMenBeforeRemove = currentFallingMenIndexes.length;
        setCurrentFallingMenIndexes(
            currentFallingMenIndexes.filter(index => {
                return index !== fallingManIndexToRemove;
            })
        );
        if (numberOfMenBeforeRemove === 4 && tooMuchMenToPopANewOne) {
            setTooMuchMenToPopANewOne(false);
            setMustNewManPop(true);
        }
    }, [fallingManIndexToRemove]);

    useEffect(() => {
        console.log('update', currentFallingMenIndexes);
    }, [currentFallingMenIndexes]);

    return (
        <>
            {!!webcamSize.width ? (
                <div>
                    <BuildingSvg height={buildingDefaultHeight} />
                    <FireSvg height={fireDefaultHeight} top={buildingDefaultHeight * 0.8} />
                    <FireSvg height={fireDefaultHeight} top={buildingDefaultHeight * 0.6} />
                    <Firemen />
                    {currentFallingMenIndexes.map(index => {
                        return (
                            <FallingMan
                                key={index}
                                index={index}
                                removeFunction={removeIndexFromCurrentFallingMenIndexes}
                            />
                        );
                    })}
                </div>
            ) : null}
        </>
    );
};
