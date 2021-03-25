//------------------------------------------------------------------------------
// Sketch: sandPiles
// created on Thu Mar 25 11:16:05 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=400, height=400;

let Nx = width, Ny = height;

let pile = [], pile2 = [], Sx, Sy, para1, para2;

function setup(){
	// creating canvas
	createCanvas(width,height);

	// initializing sand piles
	for(let x = 0; x < Nx; x++){
		for(let y = 0; y < Ny; y++){
			pile.push(0);
			pile2.push(0);
		}
	}

	Sx = width/Nx;
	Sy = width/Ny;

	pile[getIndex(Nx/2, Ny/2)] = 100000;

	para1 = createP('');
	para2 = createP('');

}

function draw(){
	// setting background color
	background(0);
	noStroke();

	for(let x = 0; x < Nx; x++){
		for(let y = 0; y < Ny; y++){
			let index = getIndex(x,y);
			if (pile[index] > 3)
				topple(index, x, y);

		}
	}

	para1.html("iteration = "+frameCount);

	if(frameCount % 100 == 0)
		pileDiff();

}

function pileDiff(){
	let diff = 0;
	for(let i = 0; i < pile.length; i++){
		if (abs(pile[i] - pile2[i]) > diff)
			diff = abs(pile[i] - pile2[i])
		pile2[i] = pile[i];
	}

	para2.html("difference = "+diff);

	if (diff == 0)
		pileShow();
}

function getIndex(x,y){
	return (y + x*Ny);
}

function topple(index, x, y){

	let x_e = x+1, x_w = x-1, x_n = x, x_s = x;
	let y_e = y, y_w = y, y_n = y+1, y_s = y-1;

	// periodicity definition
	if (x == Nx)
		x_e = 0
	if (x == 0)
		x_w = Nx
	if (y == Ny)
		y_n = 0
	if (y == 0)
		y_s = Ny


	let iNorth = getIndex(x_n,y_n);
	let iSouth = getIndex(x_s,y_s);
	let iEast = getIndex(x_e,y_e);
	let iWest = getIndex(x_w,y_w);

	pile[index] = pile[index] - 4;
	pile[iNorth] = pile[iNorth] + 1;
	pile[iSouth] = pile[iSouth] + 1;
	pile[iEast] = pile[iEast] + 1;
	pile[iWest] = pile[iWest] + 1;
}

function pileShow(){
	for(let x = 0; x < Nx; x++){
		for(let y = 0; y < Ny; y++){
			let index = getIndex(x,y);
			// let colour = color(0,0,0,255);

			switch(true){
				case pile[index]==0:
					// fill(0,0,0);
					fill(0);
					break;
				case pile[index]==1:
					// fill(255,0,0);
					fill(63);
					break;
				case pile[index]==2:
					// fill(0,255,0);
					fill(126);
					break;
				case pile[index]==3:
					// fill(0,0,255);
					fill(189);
					break;
				case pile[index]>3:
					// fill(255,255,255);
					fill(255);
					// topple(index, x, y);
					break;
				default:
					console.log("ERROR VALUE")
					noLoop();
			}

			rect(x*Sx, y*Sy, Sx,Sy);

		}
	}
	noLoop();

	para2.html("CONVERGED!");

}
