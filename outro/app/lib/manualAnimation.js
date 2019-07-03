// @author        Simon Buckingham
// @date          27 September 2017
// @description   Uses a single imageView/view and just swaps image property according to a timer. Gives more control than using the usual imageView "images" property
//                eg one can start at an arbitrary frame number (not implemented yet) and also better playback for Android.
// Copyright (c) 2017 Simon Buckingham. All Rights Reserved.
// Please see the LICENSE file included with this distribution for details.

module.exports = ManualAnimation;

//@_params                  Object            - function parameters...
//@_params.view             Ti.UI.ImageView/Ti.UI.View   - image view to use
//@_params.filenames        Array             - array of image filenames
//@_params.frameRate        Integer           - animation frame rate (frames per second)
function ManualAnimation(_params) {

    this.view = _params.view;
    this.filenames = _params.filenames;
    this.frameRate = _params.frameRate;
    this.finishedCallback = _params.finishedCallback;

    this.numberOfFrames = _params.filenames.length;
    this.currentFrameNumber = 1;
}

ManualAnimation.prototype.init = function() {
    this.stop();
    this.setFrame(1);
};

ManualAnimation.prototype.start = function() {

    //first stop playing anything
    this.stop();

    var frameInterval = 1000 / this.frameRate;
    this.setFrame(this.currentFrameNumber);
    var self = this;
    this.intervalID = setInterval(function() {
        self.currentFrameNumber++;
        if (self.currentFrameNumber <= self.numberOfFrames)
            self.setFrame(self.currentFrameNumber);
        else {
            //reset frame number
            self.currentFrameNumber = self.numberOfFrames;
            //played all frames so stop animation
            self.stop();
            if (self.finishedCallback) {
                self.finishedCallback();
            }
        }
    }, frameInterval);
};

ManualAnimation.prototype.stop = function() {
    if (this.intervalID) {
        clearInterval(this.intervalID);
        // this.setFrame(1);
        this.intervalID = null;
    }
};

//@_frameNumber     Integer   - frame number in sequence
ManualAnimation.prototype.seek = function(_frameNumber) {
    this.stop();
    this.setFrame(_frameNumber);
};

//@_frameNumber     Integer   - frame number in sequence
ManualAnimation.prototype.setFrame = function(_frameNumber) {
    this.currentFrameNumber = _frameNumber;
    switch (this.view.apiName) {
        case 'Ti.UI.ImageView':
            this.view.image = this.filenames[_frameNumber - 1];
            break;

        case 'Ti.UI.View':
            this.view.backgroundImage = this.filenames[_frameNumber - 1];
            break;
    }
};
