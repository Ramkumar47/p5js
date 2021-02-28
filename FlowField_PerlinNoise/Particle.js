// Particle class definition

class Particle{
	constructor(x,y){
		this.pos = createVector(x,y);
		this.velocity = createVector(0,0);
		this.acceleration = createVector(0,0);
		this.maxVel = 4;

		this.prevPos = this.pos.copy();
	}

	update(){
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxVel);
		this.pos.add(this.velocity);
		this.acceleration.mult(0);
	}

	follow(vectors){
		let x = floor(this.pos.x/side);
		let y = floor(this.pos.y/side);
		let index = x+y*ncols;
		let force = vectors[index];
		this.acceleration.add(force);
	}

	updatePrevPos(){
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	show(){
		stroke(0,25);
		strokeWeight(1);
		line(this.pos.x,this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrevPos();
	}

	checkBoundary(){
		if (this.pos.x > width){
			this.pos.x = 0;
			this.updatePrevPos();
		}
		if (this.pos.y > height){
			this.pos.y = 0;
			this.updatePrevPos();
		}
		if (this.pos.x < 0){
			this.pos.x = width;
			this.updatePrevPos();
		}
		if (this.pos.y < 0){
			this.pos.y = height;
			this.updatePrevPos();
		}
	}
}
