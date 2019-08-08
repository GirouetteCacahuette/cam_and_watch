import { useSelector } from 'react-redux';

export const useFiregameConstants = () => {
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);

    const buildingDefaultHeight = webcamSize.height * 0.9;
    //building default width is 21,56 % of the building default height
    const buildingDefaultWidth = buildingDefaultHeight * 0.2156;

    const firemenDefaultWidth = webcamSize.width * 0.2;
    //firemen default height is 50,4 % of the firemen default width
    const firemenDefaultHeight = firemenDefaultWidth * 0.504;

    // fire default height is 20% of the building default height
    const fireDefaultHeight = buildingDefaultHeight * 0.2;

    // falling man default width is 50% of the firemen default width
    const fallingManDefaultWidth = firemenDefaultWidth * 0.5;
    //falling man default height is 86,36 % of the falling man default width
    const fallingManDefaultHeight = fallingManDefaultWidth * 0.8636;

    const followedByFiremenBodyPart = 'nose';

    const fallingMenTopPosition = webcamSize.height - buildingDefaultHeight * 0.725;
    const fallingMenFloorPosition = webcamSize.height - firemenDefaultHeight / 2 - fallingManDefaultHeight / 2;
    const fallingMenMiddleTopPosition = fallingMenTopPosition + (fallingMenFloorPosition - fallingMenTopPosition) / 4;
    const fallingMenMiddlePosition = fallingMenTopPosition + (fallingMenFloorPosition - fallingMenTopPosition) / 2;
    const fallingMenMiddleBottomPosition =
        fallingMenTopPosition + ((fallingMenFloorPosition - fallingMenTopPosition) * 3) / 4;
    const fallingMenInterHorizontalPositionsGap = (webcamSize.width - buildingDefaultWidth) / 21;

    const fallingMenPositions = {
        buildingWindow: { x: buildingDefaultWidth * 0.15, y: fallingMenTopPosition },
        jump: {
            x: buildingDefaultWidth,
            y: fallingMenTopPosition
        },
        firstPartDown1: {
            x: fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleTopPosition
        },
        firstPartDown2: {
            x: 2 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddlePosition
        },
        firstPartDown3: {
            x: 3 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleBottomPosition
        },
        bounce1: { x: 4 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth, y: fallingMenFloorPosition },
        firstPartUp1: {
            x: 5 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleBottomPosition
        },
        firstPartUp2: {
            x: 6 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddlePosition
        },
        firstPartUp3: {
            x: 7 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleTopPosition
        },
        top1: { x: 8 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth, y: fallingMenTopPosition },
        secondPartDown1: {
            x: 9 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleTopPosition
        },
        secondPartDown2: {
            x: 10 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddlePosition
        },
        secondPartDown3: {
            x: 11 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleBottomPosition
        },
        bounce2: { x: 12 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth, y: fallingMenFloorPosition },
        secondPartUp1: {
            x: 13 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleBottomPosition
        },
        secondPartUp2: {
            x: 14 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddlePosition
        },
        top2: { x: 15 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth, y: fallingMenMiddleTopPosition },
        thirdPartDown1: {
            x: 16 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddlePosition
        },
        thirdPartDown2: {
            x: 17 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleBottomPosition
        },
        bounce3: { x: 18 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth, y: fallingMenFloorPosition },
        thirdPartUp1: {
            x: 19 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddleBottomPosition
        },
        thirdPartUp2: {
            x: 20 * fallingMenInterHorizontalPositionsGap + buildingDefaultWidth,
            y: fallingMenMiddlePosition
        }
    };

    const defaultDelayBetweenTwoFallingManPositions = 750;
    const timeNeededByFallingManToCrossScreen =
        Object.keys(fallingMenPositions).length * defaultDelayBetweenTwoFallingManPositions;
    const defaultDelayBetweenFallingMen = timeNeededByFallingManToCrossScreen;
    const defaultMinDelayBetweenFallingMen = defaultDelayBetweenTwoFallingManPositions * 4;

    return {
        buildingDefaultHeight,
        buildingDefaultWidth,
        firemenDefaultWidth,
        firemenDefaultHeight,
        fireDefaultHeight,
        fallingManDefaultWidth,
        fallingManDefaultHeight,
        followedByFiremenBodyPart,
        fallingMenPositions,
        defaultDelayBetweenFallingMen,
        defaultMinDelayBetweenFallingMen,
        defaultDelayBetweenTwoFallingManPositions,
        timeNeededByFallingManToCrossScreen
    };
};
