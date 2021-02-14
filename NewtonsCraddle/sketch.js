var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;
var MouseConstraint = Matter.MouseConstraint, Mouse = Matter.Mouse;

var engine,world
var ballRadius = 40
var mConstraint

function setup(){
	canvas = createCanvas(800,700)

	engine = Engine.create();
	world = Engine.world;

	// creating hang points
	hp1 = new Ball(width/2 - ballRadius*4, height/4, 5, true,222,222,222)
	hp2 = new Ball(width/2 - ballRadius*2, height/4, 5, true,222,222,222)
	hp3 = new Ball(width/2 - ballRadius*0, height/4, 5, true,222,222,222)
	hp4 = new Ball(width/2 + ballRadius*2, height/4, 5, true,222,222,222)
	hp5 = new Ball(width/2 + ballRadius*4, height/4, 5, true,222,222,222)

	// creating hang balls
	ball1 = new Ball(width/2 - ballRadius*4 - height/4, height/4, ballRadius, false, 255,0,0)
	ball2 = new Ball(width/2 - ballRadius*2, height/2, ballRadius, false, 255,0,0)
	ball3 = new Ball(width/2 - ballRadius*0, height/2, ballRadius, false, 255,0,0)
	ball4 = new Ball(width/2 + ballRadius*2, height/2, ballRadius, false, 255,0,0)
	ball5 = new Ball(width/2 + ballRadius*4, height/2, ballRadius, false, 255,0,0)

	// creating constraints

	var options = {
		bodyA: hp1.body,
		bodyB: ball1.body,
		length: height/4,
		stiffness: 1
	}
	constraint1 = Matter.Constraint.create(options)

	var options = {
		bodyA: hp2.body,
		bodyB: ball2.body,
		length: height/4,
		stiffness: 1
	}
	constraint2 = Matter.Constraint.create(options)

	var options = {
		bodyA: hp3.body,
		bodyB: ball3.body,
		length: height/4,
		stiffness: 1
	}
	constraint3 = Matter.Constraint.create(options)

	var options = {
		bodyA: hp4.body,
		bodyB: ball4.body,
		length: height/4,
		stiffness: 1
	}
	constraint4 = Matter.Constraint.create(options)

	var options = {
		bodyA: hp5.body,
		bodyB: ball5.body,
		length: height/4,
		stiffness: 1
	}
	constraint5 = Matter.Constraint.create(options)

	// creating mouse constraints
	canvasmouse = Mouse.create(canvas.elt)
	var options = {
		mouse:canvasmouse
	}
	mConstraint = MouseConstraint.create(engine,options)

	World.add(engine.world, [constraint1,constraint2,constraint3,constraint4,constraint5,mConstraint])

	Engine.run(engine);

}

function draw(){
	background(0)

	hp1.show()
	hp2.show()
	hp3.show()
	hp4.show()
	hp5.show()

	stroke(200)
	line(hp1.body.position.x,hp1.body.position.y,ball1.body.position.x,ball1.body.position.y)
	line(hp2.body.position.x,hp2.body.position.y,ball2.body.position.x,ball2.body.position.y)
	line(hp3.body.position.x,hp3.body.position.y,ball3.body.position.x,ball3.body.position.y)
	line(hp4.body.position.x,hp4.body.position.y,ball4.body.position.x,ball4.body.position.y)
	line(hp5.body.position.x,hp5.body.position.y,ball5.body.position.x,ball5.body.position.y)

	ball1.show()
	ball2.show()
	ball3.show()
	ball4.show()
	ball5.show()

	// noLoop()
}

