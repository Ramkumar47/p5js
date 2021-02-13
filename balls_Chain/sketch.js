var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine,world, Nballs = 20, shift = 20
var balls = []

function setup(){
	createCanvas(800,700)

	engine = Engine.create();
	world = Engine.world;

	ground = new Slide([0,width,width,0],[height,height,height*0.95,height*0.95])


	for(var i = 0; i < Nballs; i++){

		if (i == 0 || i == Nballs-1)
			fixed = true
		else
			fixed = false

		balls.push( new Ball(width/4+i*shift,height/2,10,fixed))

		if (i != 0){
			// creating constraint1
			var options = {
				bodyA: balls[i-1].body,
				bodyB: balls[i].body,
				length: shift,
				stiffness: 0.2
			}
			constraint1 = Matter.Constraint.create(options)
			World.add(engine.world,constraint1)
		}
	}

	Engine.run(engine);

}

function draw(){
	background(0)

	ground.show()
	for(var i = 0; i < Nballs; i++)
		balls[i].show()

	// noLoop()

}

