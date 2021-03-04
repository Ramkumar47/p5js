//------------------------------------------------------------------------------
// Sketch: MandelbrotSet
// created on Wed Mar  3 18:20:34 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=400, height=400;

let FocusPoint = [0,0];

let minVal = -2.5, maxVal = 2.5;

let min_x = minVal + FocusPoint[0];
let max_x = maxVal + FocusPoint[0];
let min_y = minVal + FocusPoint[1];
let max_y = maxVal + FocusPoint[1];

let maxIteration = 100;
let minSlider,maxSlider;

function setup(){
	// creating canvas
	createCanvas(width,height);
	background(0);

	// creating sliders
	// minSlider = createSlider(-1.5,0,-1.5,0.01);
	// maxSlider = createSlider(0,1.5,1.5,0.01);
}

function draw(){
	// setting background color
	background(0);
	colorMode(HSB,255);

	loadPixels();
	for(let i = 0; i < width; i++){
		for(let j = 0; j < height; j++){

			// let a = map(j,0,height,minSlider.value(),maxSlider.value());
			// let b = map(i,0,width,minSlider.value(),maxSlider.value());

			let a = map(j,0,height,min_y,max_y);
			let b = map(i,0,width,min_x,max_x);

			let ca = a, cb = b;

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
			let c = color(255-brightness,255,255);
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

}

function mousePressed(){
	console.log(mouseX,mouseY);
}
