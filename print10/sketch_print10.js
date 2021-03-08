//------------------------------------------------------------------------------
// Sketch: print10
// created on Sun Mar  7 19:30:57 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=800, height=600;

let x = 0, y = 0;

let dash = 20;

function setup(){
	// creating canvas
	createCanvas(width,height);
	background(0);
	stroke(255);
}

function draw(){

	push();
	translate(x,y);

	let val = random(0,1.0);
	if(val < 0.5)
		line(0,0,dash,dash)
	else
		line(0,dash,dash,0);

	pop();

	x += dash;

	if(x > width){
		y += dash;
		x = 0;
	}

	if(y > height){
		console.log("done");
		noLoop()
	}
}
