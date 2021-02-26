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

	removeIt(){
		World.remove(engine.world, this.body)
	}

	isOffScreen(){
		if (this.body.position.y > height+100){
			return true
		}
		else
			return false
	}

	show(){
		fill(this.colorX,this.colorY,this.colorZ)
		noStroke()
		circle(this.body.position.x, this.body.position.y, 2*this.body.circleRadius)
	}
}

