//------------------------------------------------------------------------------
// Sketch: metaballs
// created on Mon Mar  1 13:59:37 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=400, height=400;

let balls = [], Nballs = 5, saver, fr;

function setup(){
	// creating canvas
	createCanvas(width,height);

	for(let i = 0; i < Nballs; i++)
		balls.push(new Ball());

	fr = createP('');
	saver = new ImageSaver('image','png',6);
}

function draw(){
	// setting background color
	background(0);

	loadPixels();
	colorMode(HSB,255);
	for(let y = 0; y < height; y++){
		for(let x = 0; x < width; x++){
			let sum = 0;
			for(let i = 0; i < Nballs; i++){
				sum += 50*balls[i].dia/balls[i].pos.dist(createVector(x,y));
			}
			let c = color(sum,255,255);
			let index = x + y*width;
			let ic = 4*index;
			pixels[ic] = c._getRed();
			pixels[ic+1] = c._getGreen();
			pixels[ic+2] = c._getBlue();
			pixels[ic+3] = c._getAlpha();
		}
	}
	updatePixels();

	for(let i = 0; i < Nballs; i++)
		balls[i].update();

	fr.html(frameCount);

	saver.save();

	if(frameCount > 1199)
		noLoop()

}
