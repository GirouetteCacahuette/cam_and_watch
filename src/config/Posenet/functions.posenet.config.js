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

/**
 * Returns coordinates of given body part (keypoint) using a pose object from posenet as input
 * @param pose {Object} : pose from posenet
 * @param part {String} : body part to find
 * @param minimumAccuracy {number} : wanted minimum accuracy for the given part, null returned if not satisfied
 * @returns {{ x: number, y: number}|null} : null if part not found or if minimum accuracy not satisfied, { x, y }
 * object otherwise
 */
export const getKeypoint = (pose, part, minimumAccuracy = POSENET_CONSTANTS.PART_MINIMUM_ACCURACY) => {
    const keypoint = pose.keypoints.find(keypoint => keypoint.part === part && keypoint.score >= minimumAccuracy);
    return keypoint ? keypoint.position : null;
};
