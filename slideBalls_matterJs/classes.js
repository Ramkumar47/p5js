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
		fill(200)
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

		this.colorX = random(0,255)
		this.colorY = random(0,255)
		this.colorZ = random(0,255)
	}

	show(){
		fill(this.colorX,this.colorY,this.colorZ)
		circle(this.body.position.x, this.body.position.y, 2*this.body.circleRadius)
	}
}

