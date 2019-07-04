// =======
// ANIMATE

	Alloy.Globals.clicks = [];
	Alloy.Globals.clicks_moans = [];
	Alloy.Globals.moans = [];
	Alloy.Globals.moans_whistles = [];
	Alloy.Globals.whistles = [];

	function initAnimationFilenames() {
		var clicks, clicks_moans, moans, moans_whistles, whistles;
		for (var i = 0; i <= 5; i++) {
			clicks = '/img/animation/c' + i + '.png';
			clicks_moans = '/img/animation/cm' + i + '.png';
			moans = '/img/animation/m' + i + '.png';
			moans_whistles = '/img/animation/mw' + i + '.png';
			whistles = '/img/animation/w' + i + '.png';
			Alloy.Globals.clicks.push(clicks);
			Alloy.Globals.clicks_moans.push(clicks_moans);
			Alloy.Globals.moans.push(moans);
			Alloy.Globals.moans_whistles.push(moans_whistles);
			Alloy.Globals.whistles.push(whistles);
		}
	}
	initAnimationFilenames();

    var ManualAnimation = require('manualAnimation');
    var animateClicks, animateClicksMoans, animateMoans, animateMoansWhistles, animateWhistles;


    // ==========
    // ANIMATE ON

		exports.make = function(_clicks, _clicksMoans, _moans, _moansWhistles, _whistles) {

			function initAnimationClicks() {
				animateClicks = new ManualAnimation({
					view: _clicks,
					filenames: Alloy.Globals.clicks,
					frameRate: Math.floor(2 + Math.random() * 24),
					finishedCallback: onFinishedClicks
				});
				animateClicks.init();
				animateClicks.start();
			}

			function initAnimationClicksMoans() {
				animateClicksMoans = new ManualAnimation({
					view: _clicksMoans,
					filenames: Alloy.Globals.clicks_moans,
					frameRate: Math.floor(2 + Math.random() * 24),
					finishedCallback: onFinishedClicksMoans
				});
				animateClicksMoans.init();
				animateClicksMoans.start();
			}

			function initAnimationMoans() {
				animateMoans = new ManualAnimation({
					view: _moans,
					filenames: Alloy.Globals.moans,
					frameRate: Math.floor(2 + Math.random() * 24),
					finishedCallback: onFinishedMoans
				});
				animateMoans.init();
				animateMoans.start();
			}

			function initAnimationMoansWhistles() {
				animateMoansWhistles = new ManualAnimation({
					view: _moansWhistles,
					filenames: Alloy.Globals.moans_whistles,
					frameRate: Math.floor(2 + Math.random() * 24),
					finishedCallback: onFinishedMoansWhistles
				});
				animateMoansWhistles.init();
				animateMoansWhistles.start();
			}

			function initAnimationWhistles() {
				animateWhistles = new ManualAnimation({
					view: _whistles,
					filenames: Alloy.Globals.whistles,
					frameRate: Math.floor(2 + Math.random() * 24),
					finishedCallback: onFinishedWhistles
				});
				animateWhistles.init();
				animateWhistles.start();
			}

			initAnimationClicks();
			initAnimationClicksMoans();
			initAnimationMoans();
			initAnimationMoansWhistles();
			initAnimationWhistles();

			function onFinishedClicks() {
				initAnimationClicks();
			}
			function onFinishedClicksMoans() {
				initAnimationClicksMoans();
			}
			function onFinishedMoans() {
				initAnimationMoans();
			}
			function onFinishedMoansWhistles() {
				initAnimationMoansWhistles();
			}
			function onFinishedWhistles() {
				initAnimationWhistles();
			}

		};


	// ===========
	// ANIMATE OFF

		exports.remove = function(_clicks, _clicksMoans, _moans, _moansWhistles, _whistles) {

		    animateClicks.stop();
		    animateClicksMoans.stop();
		    animateMoans.stop();
		    animateMoansWhistles.stop();
		    animateWhistles.stop();

		};

