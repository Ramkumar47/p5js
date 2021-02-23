// freestream velocity and source
let V_inf = 2;
let gamma = -155;
let dt = 1;
let width = 400, height = 200;
let arrowFactor = 0.02;
let Narrows = 5;
let Nstreams = 5;
let Rball = 10;

class Ball{
	constructor(x,y,r){
		this.X = x;
		this.Y = y;
		this.R = r;
	}

	update(){
		this.X += V_inf*dt;
	}

	show(){
		fill(255,0,0);
		circle(this.X, this.Y, 2*this.R);
		this.update()
	}

	checkReset(){
		if (this.X > width+Rball*2)
			this.X = -2*Rball;
	}
}

class StreamLine {
	constructor(y,n){
		this.Y = y;
		this.N = n;
	}

	showLine(){
		strokeWeight(1.5);
		stroke(0,0,255);
		line(0,this.Y,width,this.Y)
	}

	showArrow(){
		strokeWeight(1.5);
		stroke(0,0,255);
		let step = width/(this.N+1);
		for(let i = 1; i <= this.N; i++){
			line(step*i,this.Y,step*i-width*arrowFactor,this.Y-height*arrowFactor)
			line(step*i,this.Y,step*i-width*arrowFactor,this.Y+height*arrowFactor)
		}
	}

	show(){
		this.showLine();
		this.showArrow();
	}
}

let streamlines = [];
let balls = [];

function setup(){
	createCanvas(width, height)
	background(240)

	for(let i = 0; i < Nstreams; i++){
		h = map(i,0,Nstreams-1,0,height);
		streamlines.push(new StreamLine(h, Narrows*(i%2)+(Narrows-1)*abs(i%2-1)))
	}

	balls.push(new Ball(width/2, height/4, Rball))
	balls.push(new Ball(width/4, height/2, Rball))
	balls.push(new Ball(width/4*3, 3*height/4, Rball))

	saver = new ImageSaver("image","png",6);
}

function draw(){
	background(240)

	for(let i = 0; i < streamlines.length; i++)
		streamlines[i].show();

	for(let i = 0; i < balls.length; i++){
		balls[i].show();
		balls[i].checkReset();
	}

	let elapsedTime = frameCount/30.0;
	console.log(elapsedTime);
	if(elapsedTime > 14.75)
		noLoop();

	saver.save();

}

