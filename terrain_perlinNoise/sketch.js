let width = 300, height = 300;
// let Width = 1200, Height = 1200;

let squareSide = 10;
let ncols, nrows;

let terrain = [], fly = 0,saver;

function setup(){
	createCanvas(width, height, WEBGL);

	// ncols = Width/squareSide;
	// nrows = Height/squareSide;
	ncols = width/squareSide;
	nrows = height/squareSide;

	saver = new ImageSaver("image","png",6);
}

function draw(){
	background(0);
	fill(200);
	// noFill();
	stroke(0);

	rotateX(PI/3);
	translate(-width/2,00)

	fly -= 0.01

	let xoff = 0;
	for(let i = 0; i < nrows-1; i++){
		let yoff = fly;
		beginShape(TRIANGLE_STRIP);
		for(let j = 0; j < ncols; j++){
			let N1 = map(noise(xoff,yoff),0,1,-100,100);
			let N2 = map(noise(xoff+0.1,yoff),0,1,-100,100);
			vertex(i*squareSide, j*squareSide,N1)
			vertex((i+1)*squareSide, j*squareSide,N2)
			yoff+=0.1;
		}
		endShape();
		xoff += 0.1;
	}

	saver.save();

	console.log(frameCount);

	if (frameCount > 499)
		noLoop();
}
