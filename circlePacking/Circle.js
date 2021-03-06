// circle class definition

class Circle {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.r = 1;
		this.growing = true;
		this.count = circleCount;
		circleCount++;

		this.color = color(random(255),random(255),random(255));
	}

	show(){
		// stroke(255);
		noStroke();
		fill(this.color);
		strokeWeight(2);
		circle(this.x,this.y,2*this.r);
	}

	update(){
		// this.checkTouch();
		this.checkBoundary();
		if(this.growing){
			this.r++;
		}
	}

	checkBoundary(){
		let leftBoundary = (this.x - 0) < this.r;
		let rightBoundary = (width - this.x) < this.r;
		let topBoundary = (this.y - 0) < this.r;
		let bottomBoundary = (height - this.y) < this.r;

		if(leftBoundary + rightBoundary + topBoundary + bottomBoundary)
			this.growing = false;
	}

	checkTouch(){
		let others = [];
		arrayCopy(circles,others);
		others.splice(this.count);
		for(let i = 0; i < others.length; i++){
			let distance = dist(this.x, this.y, others[i].x, others[i].y);
			if(distance <= this.r+others[i].r){
				this.growing = false;
				break;
			}
		}
	}
}
