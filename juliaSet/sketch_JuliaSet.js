//------------------------------------------------------------------------------
// Sketch: MandelbrotSet
// created on Wed Mar  3 18:20:34 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=600, height=600;

let minVal = -2, maxVal = 2;

let min_x = minVal;
let max_x = maxVal;
let min_y = minVal;
let max_y = maxVal;

let maxIteration = 100;
let tempX = 0, tempY = 0, angle = 0, saver;
let offX = 0, offY = 0;

function setup(){
	// creating canvas
	createCanvas(width,height);
	background(0);

	saver = new ImageSaver('image', 'png', 6);
}

function draw(){
	// setting background color
	background(0);
	colorMode(HSB,255);

	// minVal = -abs(sin(angle))*2.5+offX;
	// maxVal = abs(sin(angle))*2.5+offY;
	minVal = -1.5;
	maxVal =  1.5;

	loadPixels();
	for(let i = 0; i < width; i++){
		for(let j = 0; j < height; j++){

			let a = map(j,0,height,minVal,maxVal);
			let b = map(i,0,width,minVal,maxVal);

			// let ca = cos(angle);
			// let cb = sin(angle);

			let ca = -0.8;
			let cb = 0.156;

			let iter = 0;
			for(iter = 0; iter < maxIteration; iter++){
				let aa = a*a - b*b;
				let bb = 2*a*b;

				a = aa+ca;
				b = bb+cb;

				if(abs(a+b) > 2)
					break;
			}

			let brightness = map(iter, 0,maxIteration, 0,255);
			let c = color(brightness,255,255);
			if (iter == maxIteration)
				c = color(0,255,0);

			let index = 4*(j + i*height);
			pixels[index] = c._getRed();
			pixels[index+1] = c._getGreen();
			pixels[index+2] = c._getBlue();
			pixels[index+3] = c._getAlpha();
		}
	}
	updatePixels();
	// noLoop();

	// saver.save();
	// angle += 0.05;

}

function mousePressed(){
	offX = map(mouseX, 0,width, -2.5, 2.5);
	offY = map(mouseY, 0,height, -2.5, 2.5);
	console.log(offX,offY);
}
