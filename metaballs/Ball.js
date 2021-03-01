// Ball class definition

class Ball{
	constructor(){
		this.pos = createVector(random(width),random(height));
		this.dia = random(25,75);
		this.velocity = createVector(random(-5,5),random(-5,5));
	}

	update(){
		this.pos.add(this.velocity);
		if(this.pos.x > width || this.pos.x < 0) this.velocity.x *= -1;
		if(this.pos.y > height || this.pos.y < 0) this.velocity.y *= -1;
	}

}
