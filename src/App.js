import React from 'react';
import './style/App.css';
import { Webcam } from './components/Webcam';

export const App = () => {
    return (
        <div className="App">
            <Webcam />
        </div>
    );
};
