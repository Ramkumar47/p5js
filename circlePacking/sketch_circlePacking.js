//------------------------------------------------------------------------------
// Sketch: circlePacking
// created on Fri Mar  5 10:19:51 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=800, height=400;

let circles = [], circleCount = 0, iterationCount = 0, spots = [];
let maxIteration = 100;

let img;

function preload(){
	img = loadImage('image.png');
}

function setup(){
	// creating canvas
	createCanvas(width,height);

	img.loadPixels();

	spots = [];
	for(let i = 0; i < width; i++){
		for(let j = 0; j < height; j++){
			let index = (i+j*width)*4;
			if (img.pixels[index] <200)
				spots.push(createVector(i,j));
		}
	}

}

function draw(){
	// setting background color
	background(0);

	if(iterationCount >= maxIteration){
		console.log("circles: "+circles.length);
		console.log("FINISHED");
		noLoop();
	}

	for(let iter = 0; iter < 50; iter++){
		let index = floor(random(0,spots.length-1));
		let x = spots[index].x;
		let y = spots[index].y;
		if (checkPlace(x,y)){
			iterationCount = 0;
			circles.push(new Circle(x,y) );
		}
	}

	for(let i = 0; i < circles.length; i++){
		for(let j = 0; j < circles.length; j++){
			let distance = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
			if(distance <= circles[i].r+circles[j].r && distance !=0){
				circles[i].growing = false;
				break;
			}
		}
		circles[i].update();
		circles[i].show();
	}

}

function checkPlace(x,y){

	for(let i = 0; i < circles.length; i++){
		let distance = dist(x,y,circles[i].x,circles[i].y);
		if (distance <= circles[i].r){
			iterationCount++;
			return false;
		}
	}

	return true;
}
