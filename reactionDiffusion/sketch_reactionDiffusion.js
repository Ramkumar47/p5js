//------------------------------------------------------------------------------
// Sketch: reactionDiffusion
// created on Mon Mar  8 14:25:26 IST 2021
// reference https://www.karlsims.com/rd.html
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=400, height=400;

let grid = [], next = [], saver;

// let D_a = 1.0, D_b = 0.5, f = 0.0545, k = 0.062, dt = 0.5;
let D_a = 1.0, D_b = 0.5, f = 0.0367, k = 0.0649, dt = 1;

function setup(){
	// creating canvas
	createCanvas(width,height);

	// initializing grid
	for(let x = 0; x < width; x++){
		grid[x] = []; next[x] = [];
		for(let y = 0; y < height; y++){
			grid[x][y] = {a: 1.0, b: 0.0};
			next[x][y] = grid[x][y];
		}
	}

	// colorMode(HSB);

	// // initial square field
	// for(let x = floor(0.4*width); x < floor(0.6*width); x++){
	//     for(let y = floor(0.4*height); y < floor(0.6*height); y++){
	//         grid[x][y].b = 1.0;
	//         grid[x][y].a = 0.5;
	//     }
	// }

	// initial circle field
	for(let x = 0; x < width; x++){
		for(let y = 0; y < height; y++){
			if ((x - width/2)**2 + (y - height/2)**2 - 5**2 < 0){
				grid[x][y].b = 1.0;
				grid[x][y].a = 0.0;
			}
		}
	}

	saver = new ImageSaver('image','png',6);

}

function draw(){
	// setting background color
	background(0);

	// calculation
	for(let x = 1; x < width-1; x++){
		for(let y = 1; y < height-1; y++){
			next[x][y].a = grid[x][y].a + (D_a*laplace("a",x,y)
				- grid[x][y].a*grid[x][y].b**2 + f*(1 - grid[x][y].a))*dt
			next[x][y].b = grid[x][y].b + (D_b*laplace("b",x,y)
				+ grid[x][y].a*grid[x][y].b**2 - (k+f)*grid[x][y].b)*dt
		}
	}

	// showing output
	show();

	// swaping
	arrayCopy(next,grid);

	if(frameCount%10 == 0)
		saver.save();
}

function show(){
	loadPixels();
	for(let x = 0; x < width; x++){
		for(let y = 0; y < height; y++){
			let index = (x + y*width)*4;
			pixels[index] = next[x][y].a*255;
			pixels[index+1] = next[x][y].a*255;
			pixels[index+2] = next[x][y].a*255;
			pixels[index+3] = 255;
		}
	}
	updatePixels();
}

function laplace(chem, x, y){
	let temp = 0;
	if(chem == "a"){
		temp = grid[x][y].a*-1 + grid[x+1][y].a*0.2 + grid[x-1][y].a*0.2
			+ grid[x][y+1].a*0.2 + grid[x][y-1].a*0.2
			+ grid[x+1][y+1].a*0.05 + grid[x-1][y-1].a*0.05
			+ grid[x+1][y-1].a*0.05 + grid[x-1][y+1].a*0.05;
	}
	else if(chem == "b"){
		temp = grid[x][y].b*-1 + grid[x+1][y].b*0.2 + grid[x-1][y].b*0.2
			+ grid[x][y+1].b*0.2 + grid[x][y-1].b*0.2
			+ grid[x+1][y+1].b*0.05 + grid[x-1][y-1].b*0.05
			+ grid[x+1][y-1].b*0.05 + grid[x-1][y+1].b*0.05;
	}

	return temp;
}

function mousePressed(){
	let radius = 10;

	for(let x = 0; x < width; x++){
		for(let y = 0; y < height; y++){
			if ((x-mouseX)**2+(y-mouseY)**2 - radius**2 < 0){
				grid[x][y].b = 1.0;
				grid[x][y].a = 0.0;
			}
		}
	}

}
