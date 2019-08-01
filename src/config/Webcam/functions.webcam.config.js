export const WEBCAM_FUNCTIONS = {
    getWebcamSize: (wantedRatio, idealSize) => {
        const availableWidth = window.innerWidth;
        const availableHeight = window.innerHeight;
        if (idealSize.width <= availableWidth && idealSize.height <= availableHeight) return idealSize;
        return availableWidth / wantedRatio < availableHeight
            ? { height: availableHeight, width: availableHeight * wantedRatio }
            : { height: availableWidth / wantedRatio, width: availableWidth };
    },
    setupWebcam: async (elementId, width, height, successCallback) => {
        const videoElement = document.getElementById(elementId);
        if (navigator.mediaDevices.getUserMedia) {
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: { height, width } });
            successCallback();
        }
        // else display 'No webcam detected'
    }
};
