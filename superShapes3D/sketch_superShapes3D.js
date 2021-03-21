//------------------------------------------------------------------------------
// Sketch: superShapes3D
// created on Sun Mar 21 11:27:12 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=400, height=400;

let N = 101;
let thetaA, thetaB, phiA, phiB, rotateAngle = 0;

let dPhi = 0, dTheta = 0, saver;

// supershape constants
// let a = 1, m = 0, b = 1, n1 = 1, n2 = 1, n3 = 1;

function setup(){
	// creating canvas
	createCanvas(width,height,WEBGL);

	thetaA = -PI/2;
	thetaB = PI/2;
	phiA = -PI;
	phiB = PI;

	dPhi = (phiB - phiA)/(N-1);
	dTheta = (thetaB - thetaA)/(N-1);

	colorMode(HSB,255);

	saver = new ImageSaver("image","png",6);
}

function draw(){
	// setting background color
	background(50);

	// stroke(255);
	noStroke();
	// noFill();

	// rotateZ(rotateAngle*0.5);
	// rotateY(rotateAngle);
	rotateAngle += 0.01;
	rotateZ(-PI/4);
	rotateY(PI/4);

	let m = map(sin(rotateAngle), -1,1, 0, 7);

	beginShape()
	for(let i = 0; i < N; i++){
		let colour = map(i, 0, N-1, 0,255*6);
		fill(colour%255, 255, 255);
		for(let j = 0; j < N; j++){
			let theta = map(i,0,N-1,thetaA,thetaB);
			let phi = map(j,0,N-1,phiA,phiB);

			let r1 = calculateRadius(theta,m, 0.2, 1.7, 1.7, 1, 1);
			let r2 = calculateRadius(phi, m, 0.2, 1.7, 1.7, 1, 1);

			let p1 = calculatePos(100,r1,r2,theta,phi);
			// let p2 = calculatePos(100,r1,r2,theta+dTheta,phi);

			vertex(p1.x, p1.y, p1.z);
			// vertex(p2.x, p2.y, p2.z);
		}
	}
	endShape();

	saver.save();

}

function calculateRadius(angle, m, n1, n2, n3, a, b){
	let v1 = abs(1.0/a*cos(m*angle/4))**n2;
	let v2 = abs(1.0/b*sin(m*angle/4))**n3;

	let rad = (v1 + v2)**(-1/n1);

	return rad;
}

function calculatePos(r,r1,r2,theta,phi){
	let x = r*r1*cos(theta)*r2*cos(phi);
	let y = r*r1*sin(theta)*r2*cos(phi);
	let z = r*r2*sin(phi);

	let p = createVector(x,y,z);

	return p;
}

function mousePressed(){
	console.log("stopped");
	noLoop();
}
