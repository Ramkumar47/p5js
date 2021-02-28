//------------------------------------------------------------------------------
// Sketch: FlowField_PerlinNoise
// created on Sun Feb 28 11:39:11 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=800, height=600;

let side = 5, inc = 0.01, Nparticles = 500;

let nrows,ncols,zoff=0;

let flowFieldVectors, particles=[];
let fr1,fr2,saver;

function setup(){
	// creating canvas
	createCanvas(width,height);

	ncols = floor(width/side);
	nrows = floor(height/side);

	flowFieldVectors = new Array(nrows*ncols);

	// initilaizing particles
	for (let i = 0; i < Nparticles; i++)
		particles.push(new Particle(random(width), random(height)) );

	// setting background color
	background(255);
	stroke(0,100);
	noFill();
	rect(0,0,width,height);

	fr1 = createP('');
	fr2 = createP('');

	saver = new ImageSaver("image","png",6);
}

function draw(){

	let yoff = 0;
	for(let j = 0; j < nrows; j++){
		let xoff = 0;
		for(let i = 0; i < ncols; i++){
			let angle = noise(xoff,yoff,zoff)*4*TWO_PI;
			let index = i + j*ncols;
			flowFieldVectors[index] = p5.Vector.fromAngle(angle);

			// stroke(0,10);
			// noFill();
			// rect(i*side,j*side,side,side);
			// push();
			// translate(i*side,j*side);
			// rotate(angle);
			// stroke(255,0,0);
			// line(0,0,side,0);
			// pop();

			xoff += inc;
		}
		yoff += inc;
	}

	for(let i = 0; i < Nparticles; i++){
		particles[i].follow(flowFieldVectors);
		particles[i].update();
		particles[i].checkBoundary();
		particles[i].show();
	}

	zoff += inc;

	fr1.html("frameCount: "+frameCount);
	fr2.html("frameRate: "+floor(frameRate()));

	// saver.save();

	if (frameCount > 9999)
		noLoop();
}
