import { useSelector } from 'react-redux';

export const useFiregameConstants = () => {
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);

    return {
        buildingDefaultHeight: webcamSize.height * 0.9,
        firemenDefaultWidth: webcamSize.witdh * 0.2,
        // fire default height is 20% of the building default height
        fireDefaultHeight: webcamSize.height * 0.9 * 0.2,
        // falling man default width is 50% of the firemen default width
        fallingManDefaultWidth: webcamSize.witdh * 0.2 * 0.5
    };
};
