/* star Field simulation */
let stars = new Array();
let Nstars = 100;
let dt = 0.1;
let count = 0;

function setup(){
	createCanvas(1400,760);

	for(let i = 0; i < Nstars; i++){
		stars.push(new Star())
	}
}

function draw(){
	background(0)

	for(let i = 0; i < Nstars; i++){
		stars[i].update();
		stars[i].show();
	}

	// // making frame name
	// let num = nf(count,3,0);
	// let filename = num + ".png";
	// save(filename);
	// count++;
	// saveFrames('out','png', 15, 15, data => {print(data)})

}

class Star{
	constructor(){
		this.rmax = sqrt(width**2+height**2)/2;
		this.r = random(0,this.rmax)
		this.theta = random(0,2*PI)
		this.radius = 10// random(0,20)

	}

	update(){
		this.v = map(this.r,0,this.rmax, 1,10); // velocity
		this.radius = map(this.r,0,this.rmax, 1,20); // velocity
		this.theta = random(0,2*PI)
		// updating radial postion
		this.r += this.v*dt;
		// checking if it vanishes out of screen
		if (this.r > this.rmax){
			this.r = 0;
			this.radius = 1;
		}
	}

	show(){
		this.x = width/2 + this.r*cos(this.theta)
		this.y = height/2 + this.r*sin(this.theta)
		circle(this.x,this.y,this.radius)
	}
}
