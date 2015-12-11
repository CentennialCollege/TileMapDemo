/// <reference path="_reference.ts" />

// Global Game Variables
var assets:createjs.LoadQueue;
var manifest = [{id: "tile", src:"Assets/images/tile.png"}];

var canvas:HTMLElement;
var stage:createjs.Stage;
var game:createjs.Container;

var tile:createjs.Bitmap;

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

function gameLoop(event:createjs.Event) {
	stage.update();
}

function main() {
	tile = new createjs.Bitmap(assets.getResult("tile"));
	game.addChild(tile);
	
	stage.addChild(game);
}