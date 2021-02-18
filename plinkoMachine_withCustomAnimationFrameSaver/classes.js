// this file contains object classes definitions

class Ball{
	constructor(x,y,radius,isFixed,R,G,B){
		var options = {
			friction: 0,
			restitution: 1,
			isStatic: isFixed
		}
		this.body = Bodies.circle(x,y,radius,options)

		World.add(engine.world, this.body)

		this.colorX = R
		this.colorY = G
		this.colorZ = B
	}

	resetIt(){
		Matter.Body.set(this.body, "position", {x:random(0,width),y:0})
		Matter.Body.set(this.body, "velocity", {x:0,y:0})
	}

	checkOffScreen(){
		if (this.body.position.y > height+50){
			this.resetIt()
		}
	}

	show(){
		fill(this.colorX,this.colorY,this.colorZ)
		noStroke()
		circle(this.body.position.x, this.body.position.y, 2*this.body.circleRadius)
	}
}

