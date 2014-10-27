var jewel = {
	screens: {},
	settings: {
		rows: 8,
		cols: 8,
		baseScore: 100,
		baseLevelTimer: 60000,
		baseLevelScore: 1500,
        baseLevelExp: 1.05,
		numJewelTypes: 7,
		controls: {
			KEY_UP: "moveUp",
			KEY_LEFT: "moveLeft",
			KEY_DOWN: "moveDown",
			KEY_RIGHT: "moveRight",
			KEY_ENTER: "selectJewel",
			KEY_SPACE: "selectJewel",
			CLICK: "selectJewel",
			TOUCH: "selectJewel"
		}
	},
	images: {}
};

//wait until main document is loaded
window.addEventListener("load", function() {

// determine the jewel size
var jewelProto = document.getElementById("jewel-proto"), 
	rect = jewelProto.getBoundingClientRect();

jewel.settings.jewelSize = rect.width;

// extend yepnope with preloading
yepnope.addPrefix("preload", function(resource) {
	resource.noexec = true;
	return resource;
});

var numPreload = 0,
	numLoaded =0;

yepnope.addPrefix("loader", function(resource) {
	console.log("Loading: " + resource.url)
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;

	numPreload++;
	resource.autoCallback = function(e) {
		console.log("Finished loading: " + resource.url);
		numLoaded++;
		if(isImage) {
			var image = new Image();
			image.src = resource.url;
			jewel.images[resource.url] = image;
		}
	};
	return resource;
});

function getLoadProgress() {
	if (numPreload > 0) {
		return numLoaded / numPreload;
	} else {
		return 0;
	}
}

// start dynamic loading
Modernizr.load([
{
	// these files are always loaded
	load : [
		"scripts/sizzle.js",
		"scripts/dom.js",
		"scripts/game.js",
		"scripts/screen.splash.js",
		"loader!scripts/display.canvas.js",
		"loader!scripts/input.js",
        "loader!scripts/audio.js",
		"loader!scripts/screen.main-menu.js",
		"loader!images/jewels" + jewel.settings.jewelSize + ".png",
		"loader!scripts/board.worker-interface.js",
		"loader!scripts/screen.game.js",
		"preload!scripts/board.worker.js"
	],
	// called when all files have finished loading
	// and executing
	complete : function() {
		jewel.game.setup();
		// show the first screen
		jewel.game.showScreen("splash-screen",
			getLoadProgress);
	}
}
]);

}, false);
