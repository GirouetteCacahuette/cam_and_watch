import { POSENET_CONSTANTS } from './constants.posenet.config';

const defaultEstimatePoseConfig = POSENET_CONSTANTS.DEFAULT_ESTIMATE_POSE_CONFIG;

/**
 * Get a Pose Object from a given media element
 * @param net {Object} : loaded posenet
 * @param mediaElementId {String} : source media element's ID
 * @param config {Object} : estimateSinglePose configuration as {imageScaleFactor, flipHorizontal, outputStride}
 * @returns {Promise<Object>}
 */
export const getPose = async (net, mediaElementId, config = {}) => {
    const mediaElement = document.getElementById(mediaElementId);

    return await net.estimateSinglePose(mediaElement, {
        ...defaultEstimatePoseConfig,
        ...config
    });
};
