import React, { useState, useEffect } from 'react';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';
import { BuildingSvg } from '../SVGs/BuildingSvg';
import { FireSvg } from '../SVGs/FireSvg';
import { Firemen } from './Firemen';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentFallingMenIndexes } from '../../actions/fireGame.actions';
import { FallingMan } from './FallingMan';

export const FireGame = () => {
    const {
        buildingDefaultHeight,
        fireDefaultHeight,
        defaultDelayBetweenFallingMen,
        defaultMinDelayBetweenFallingMen,
        fallingMenPositions,
        defaultDelayBetweenTwoFallingManPositions
    } = useFiregameConstants();
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);
    const currentFallingMenIndexes = useSelector(state => state.camAndWatchReducer.fireGame.currentFallingMenIndexes);
    const dispatch = useDispatch();
    const [currentDelayBetweenFallingMen, setCurrentDelayBetweenFallingMen] = useState(defaultDelayBetweenFallingMen);
    const [mustNewManPop, setMustNewManPop] = useState(false);
    const [numberOfPoppedFallingMen, setNumberOfPoppedFallingMen] = useState(0);

    const popFallingMan = async delayBeforeNextMan => {
        await dispatch(updateCurrentFallingMenIndexes([...currentFallingMenIndexes, numberOfPoppedFallingMen + 1]));
        setNumberOfPoppedFallingMen(numberOfPoppedFallingMen + 1);
        setCurrentDelayBetweenFallingMen(
            delayBeforeNextMan <= defaultMinDelayBetweenFallingMen
                ? defaultMinDelayBetweenFallingMen + Math.random() * 2 * defaultMinDelayBetweenFallingMen
                : delayBeforeNextMan * 0.85
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
            if (currentFallingMenIndexes.length < 3) {
                popFallingMan(currentDelayBetweenFallingMen);
            } else {
                setTimeout(() => {
                    setMustNewManPop(true);
                }, Object.keys(fallingMenPositions).length * 0.7 * defaultDelayBetweenTwoFallingManPositions);
            }
        }
    }, [mustNewManPop]);

    return (
        <>
            {!!webcamSize.width ? (
                <div>
                    <BuildingSvg height={buildingDefaultHeight} />
                    <FireSvg height={fireDefaultHeight} top={buildingDefaultHeight * 0.8} />
                    <FireSvg height={fireDefaultHeight} top={buildingDefaultHeight * 0.6} />
                    <Firemen />
                    {currentFallingMenIndexes.map(index => {
                        return <FallingMan key={index} index={index} />;
                    })}
                </div>
            ) : null}
        </>
    );
};
