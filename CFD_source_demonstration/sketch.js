// Rankine half body stream lines----------------------------------------------

// freestream velocity and source
let V_inf = 1;
let gamma = 100;
let dt = 1;
let width = 400, height = 200;

// source/sink origin
let Sx = width*0.5;
let Sy = height*0.5;
let offSet = 3;
let nRadial = 18;
let nStraight = 20;
let streamline_status = true;

// shi equation function definition
function Streamfunction(x,y){
	// calculating r and theta
	r = sqrt((x - Sx)**2 + (y - Sy)**2);
	theta = atan2((y - Sy),(x - Sx));

	// calculating polar velocity components
	Vr = V_inf * cos(theta) + gamma/TWO_PI/r;
	Vtheta = -V_inf*sin(theta);

	// calculating cartesian velocity components from polar coordinates
	U = Vr*cos(theta) - Vtheta*sin(theta);
	V = Vr*sin(theta) + Vtheta*cos(theta);

	// calculating new displacement coordinates
	X_new = x + U*dt;
	Y_new = y + V*dt;

	return [X_new, Y_new];
}

// class definition for streamlines
class StreamLine {
	constructor (x,y,color = [0,0,255]){
		this.X = x;
		this.Y = y;
		// this.Xlist = [x];
		// this.Ylist = [y];
		this.oldX = x;
		this.oldY = y;
		this.color = color;
	}

	update(){
		let newCoors;
		// newCoors = Streamfunction(this.Xlist[this.Xlist.length-1], this.Ylist[this.Ylist.length-1]);
		newCoors = Streamfunction(this.X, this.Y);
		// this.Xlist.push(newCoors[0]);
		// this.Ylist.push(newCoors[1]);
		this.oldX = this.X;
		this.oldY = this.Y;
		this.X = newCoors[0];
		this.Y = newCoors[1];
	}

	show(){
		stroke(this.color[0],this.color[1],this.color[2]);
		strokeWeight(1.5);
		// for(var i = 1; i < this.Xlist.length; i++){
		//     line(this.Xlist[i-1],this.Ylist[i-1],this.Xlist[i],this.Ylist[i]);
		// }
		line(this.oldX,this.oldY,this.X,this.Y);
	}
}

let streamlines = [];
let sourceLines = [];

function setup(){
	createCanvas(width, height)
	background(240)

	for(let i = 0; i < nStraight; i++){
		h = map(i, 0,nStraight, 0, height);
		streamlines.push(new StreamLine(0,h));
	}

	for(let i = 0; i < nRadial; i++){
		theta = map(i,0,nRadial,0,TWO_PI);
		sourceLines.push(new StreamLine(Sx+offSet*cos(theta), Sy+offSet*sin(theta),[200,0,0]))
	}

	saver = new ImageSaver("image","png",6);
}

function draw(){
	fill(255,0,0)

	for(var i = 0; i < streamlines.length; i++){
		streamlines[i].update();
		streamlines[i].show();
	}

	let elapsedTime = frameCount/30.0;

	if(elapsedTime > 8.0){
		for(var i = 0; i < sourceLines.length; i++){
			sourceLines[i].update();
			sourceLines[i].show();
		}
	}

	console.log(elapsedTime);

	if(elapsedTime > 20.0)
		noLoop();

	// saver.save();

}

