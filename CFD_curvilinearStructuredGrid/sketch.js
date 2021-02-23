let width = 600, height = 600;
let Nx = 20, Ny = 20;
let channelWidth = 100;

let R1 = height/4-channelWidth/2, R2 = R1+channelWidth;
let OriginX1 = height/4, OriginY1 = height/2;
let OriginX2 = width-height/4, OriginY2 = height/2;

let dE = 1, dN = 1;

let Ioffset = 5;

var X,Y;

function setup(){
	createCanvas(width, height)

	// initializing X andY
	X = initializeArray(Ny,Nx+2*Ioffset);
	Y = initializeArray(Ny,Nx+2*Ioffset);

	for(let i = 0; i < Ioffset; i++){
		let x = map(i,0,Ioffset,OriginX1*0.5,OriginX1);
		for(let j = 0; j < Ny; j++){
			let y = map(j,0,Ny-1,OriginY1+R1,OriginY1+R2);
			X[j][i] = x;
			Y[j][i] = y;
		}
	}

	for(let i = 0; i < Nx/2; i++){
		let theta = map(i,0,Nx-1,PI/2,-PI/2)
		for(let j = 0; j < Ny; j++){
			let R = map(j,0,Ny-1,R1,R2);
			X[j][i+Ioffset] = OriginX1 + R*cos(theta);
			Y[j][i+Ioffset] = OriginY1 + R*sin(theta);
		}
	}

	for(let i = Nx/2; i < Nx; i++){
		let theta = map(i,0,Nx-1,PI/2,-PI/2)
		for(let j = 0; j < Ny; j++){
			let R = map(j,0,Ny-1,R2,R1);
			X[j][i+Ioffset] = OriginX2 - R*cos(theta);
			Y[j][i+Ioffset] = OriginY2 + R*sin(theta);
		}
	}

	for(let i = 0; i < Ioffset; i++){
		let x = map(i,0,Ioffset,OriginX2*1.03,OriginX2*1.25);
		for(let j = 0; j < Ny; j++){
			let y = map(j,0,Ny-1,OriginY2-R2,OriginY2-R1);
			X[j][Nx+i+Ioffset] = x;
			Y[j][Nx+i+Ioffset] = y;
		}
	}

	for(let i = 1; i < Nx-1+2*Ioffset; i++)
		for(let j = 1; j < Ny-1; j++){
			X[j][i] = 0;
			Y[j][i] = 0;
		}

	saver = new ImageSaver("image","png",6);
}

function draw(){
	background(255)

	noFill()
	stroke(0)
	// rect(0,0,width,height);

	// elliptic grid generation
	for(let i = 1; i < Nx-1+2*Ioffset; i++){
		for(let j = 1; j < Ny-1; j++){
			Xn = (X[j+1][i] - X[j-1][i])/2/dN;
			Yn = (Y[j+1][i] - Y[j-1][i])/2/dN;
			Xe = (X[j][i+1] - X[j][i-1])/2/dE;
			Ye = (Y[j][i+1] - Y[j][i-1])/2/dE;

			Alpha = Xn**2 + Yn**2;
			Beta = Xe*Xn + Ye*Yn;
			Gamma = Xe**2 + Ye**2;

			A = (2*Alpha/dE**2 + 2*Gamma/dN**2);

			X[j][i] = 1/A*(Alpha*(X[j][i+1]+X[j][i-1])/dE**2 + Gamma*(X[j+1][i] + X[j-1][i])/dN**2 -
				2*Beta*(X[j+1][i+1] + X[j-1][i-1] - X[j+1][i-1] - X[j-1][i+1])/4/dE/dN);
			Y[j][i] = 1/A*(Alpha*(Y[j][i+1]+Y[j][i-1])/dE**2 + Gamma*(Y[j+1][i] + Y[j-1][i])/dN**2 -
				2*Beta*(Y[j+1][i+1] + Y[j-1][i-1] - Y[j+1][i-1] - Y[j-1][i+1])/4/dE/dN);
		}
	}

	display()

	let base = createVector(0.05*width,height*0.95);
	let vec1 = createVector(width*0.08,0);
	let vec2 = createVector(0,-width*0.08);
	drawArrow(base,vec1)
	drawArrow(base,vec2)
	noStroke()
	fill(0)
	textSize(20)
	text("x",90,567)
	text("y",27,513)

	saver.save();

	if(frameCount > 599){
		print("done")
		noLoop();
	}

}

function initializeArray(ny,nx){
	let A = [];
	for(var j = 0; j < ny; j++){
		a = [];
		for(var i = 0; i < nx; i++){
			append(a,0)
		}
		append(A,a)
	}
	return A;
}

function display(){
	for(let i = 0; i < Nx-1+2*Ioffset; i++){
		for(let j = 0; j < Ny-1; j++){
			line(X[j][i],Y[j][i],X[j][i+1],Y[j][i+1])
			line(X[j][i],Y[j][i],X[j+1][i],Y[j+1][i])
		}
	}
	for(let i = 0; i < Nx-1+2*Ioffset; i++){
		line(X[Ny-1][i],Y[Ny-1][i],X[Ny-1][i+1],Y[Ny-1][i+1])
	}
	for(let j = 0; j < Ny-1; j++){
		line(X[j][Nx-1+2*Ioffset],Y[j][Nx-1+2*Ioffset],X[j+1][Nx-1+2*Ioffset],Y[j+1][Nx-1+2*Ioffset])
	}
}

function drawArrow(base, vec ) {
	push();
	stroke(0);
	strokeWeight(3);
	fill(0);
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	let arrowSize = 7;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
}

function mousePressed(){
	console.log(mouseX,mouseY)
}

