import React from 'react';
import { useSelector } from 'react-redux';
import { useFiregameConstants } from '../../config/Games/Fire/constants.fire.config';

export const AngelSvg = ({ left }) => {
    const webcamSize = useSelector(state => state.camAndWatchReducer.webcamSize);
    const { angelDefaultHeight } = useFiregameConstants();
    return (
        <svg
            className="absElement"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            height={angelDefaultHeight}
            viewBox="0 0 45.443 45.443"
            style={{ left, top: webcamSize.height * 0.05 }}
        >
            <g>
                <path
                    d="M43.812,8.263c0-4.454-3.608-8.065-8.062-8.065c-4.454,0-8.063,3.611-8.063,8.065c0,0.4,0.039,0.791,0.098,1.177
		c-3.519-2.289-7.755-5.485-9.271-8.217C18.093,0.465,17.295,0,16.373,0h-0.002c-0.893,0-1.693,0.523-2.086,1.323
		c-1.987,4.03-5.394,12.699-2.061,19.571c-2.135,0.82-4.367,1.532-6.685,2.08c-1.829,0.434-3.271,1.838-3.744,3.659
		c-0.473,1.823,0.102,3.756,1.49,5.022l13.654,12.466c1.064,0.973,2.496,1.443,3.93,1.296c1.436-0.144,2.74-0.887,3.593-2.053
		c4.045-5.531,10.388-15.679,12.359-27.119C40.766,15.719,43.812,12.349,43.812,8.263z M16.497,3.575
		c2.409,3.469,7.421,6.958,10.771,9.054c-3.39,2.441-7.538,5.009-12.25,7.106C12.35,14.406,14.724,7.439,16.497,3.575z"
                />
            </g>
        </svg>
    );
};
