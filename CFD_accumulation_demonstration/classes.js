// this file contains object classes definitions

class Slide {
	constructor(X,Y){

		var positionalVectors = []
		var Xcentroid = 0, Ycentroid = 0
		for(var i = 0; i < X.length; i++){
			positionalVectors.push({x: X[i], y: Y[i]})
			Xcentroid += X[i]/X.length
			Ycentroid += Y[i]/X.length
		}

		// defining options
		var options = {
			friction: 0,
			restitution: 0.5,
			isStatic: true
		}

		// defining body
		this.body = Bodies.fromVertices(Xcentroid,Ycentroid,positionalVectors, options)

		World.add(engine.world, this.body)
	}

	show(){
		fill(100)
		beginShape()
		for(var i = 0; i < this.body.vertices.length; i++)
			vertex(this.body.vertices[i].x,this.body.vertices[i].y)
		endShape(CLOSE)
	}
}

class Ball{
	constructor(x,y,radius){
		var options = {
			friction: 0,
			restitution: 0.75
		}
		this.body = Bodies.circle(x,y,radius,options)

		World.add(engine.world, this.body)

		this.colorX = 0 //random(0,255)
		this.colorY = 0 //random(0,255)
		this.colorZ = 0 //random(0,255)
	}

	show(){
		let Umag = sqrt(this.body.velocity.x**2 + this.body.velocity.y**2)
		this.colorX = map(Umag, 0,1.25, 255,0)
		this.colorZ = map(Umag, 0,1.25, 0,255)
		fill(this.colorX,this.colorY,this.colorZ)
		circle(this.body.position.x, this.body.position.y, 2*this.body.circleRadius)
	}

	checkPosition(){
		if (this.body.position.y > height*1.1){
			Matter.World.remove(engine.world, this.body)
			return true
		}
		return false;
	}
}
