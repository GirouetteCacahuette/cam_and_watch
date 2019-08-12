import React from 'react';
import { useSelector } from 'react-redux';

export const Score = () => {
    const score = useSelector(state => state.camAndWatchReducer.fireGame.score);
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);

    return (
        <p
            style={{ top: webcamSize.height * 0.05, left: webcamSize.width / 2, fontSize: webcamSize.height * 0.1 }}
            className="score absElement"
        >
            {score}
        </p>
    );
};
