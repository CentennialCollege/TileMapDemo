/// <reference path="_reference.ts" />

// Global Game Variables
var assets: createjs.LoadQueue;
var manifest = [
				{ id: "tile", src: "../../Assets/images/tile.png" },
				{ id: "utile", src: "../../Assets/images/utile.png" },
				{ id: "ptile", src: "../../Assets/images/ptile.png" }
];

var gameLevelMap: string[] = [	"T", "T", "T", "P", "P", "P", "T", "T",
								"P", "P", "T", "P", "T", "P", "P", "T",
								"T", "P", "T", "P", "T", "T", "P", "T",
								"T", "P", "T", "P", "T", "T", "P", "T",
								"T", "P", "P", "P", "T", "T", "P", "P",
								"U", "U", "U", "U", "U", "U", "U", "U",
];

var tileMap: createjs.Bitmap[] = new Array<createjs.Bitmap>(); // new bitmap array

var canvas: HTMLElement;
var stage: createjs.Stage;
var game: createjs.Container;

var tile: createjs.Bitmap;

function preload() {
	assets = new createjs.LoadQueue();
	assets.installPlugin(createjs.Sound);
	assets.on("complete", init, this);
	assets.loadManifest(manifest);
}

function init() {
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	game = new createjs.Container();
	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", gameLoop);
	main();
}

function gameLoop(event: createjs.Event) {
	stage.update();
}

function createTileMap() {
	var index = 0;
	for (var row = 0; row < 6; row++) {
		for (var col = 0; col < 8; col++) {
			var tempTile: createjs.Bitmap;
			switch(gameLevelMap[index]) {
				case "T":
					tempTile = new createjs.Bitmap(assets.getResult("tile"));
				break;
				case "U":
					tempTile = new createjs.Bitmap(assets.getResult("utile"));
				break;
				case "P":
					tempTile = new createjs.Bitmap(assets.getResult("ptile"));
				break;
			}
			
			var tileY = row * 80;
			var tileX = col * 80;
			tileMap.push(tempTile);
			tempTile.x = tileX;
			tempTile.y = tileY;
			game.addChild(tempTile);
			index++;
		}
	}
}

function main() {
	createTileMap();


	stage.addChild(game);
}