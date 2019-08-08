import React from 'react';
import './style/App.css';
import { Webcam } from './components/Webcam';
import { FireGame } from './components/FireGame/FireGame';

export const App = () => {
    return (
        <div className="App">
            <Webcam />
            <FireGame />
        </div>
    );
};
