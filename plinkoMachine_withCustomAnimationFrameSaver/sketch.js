var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;
var MouseConstraint = Matter.MouseConstraint, Mouse = Matter.Mouse;

var engine,world,saver
var balls = [];
var Nx = 21, Ny = 21;

function setup(){
	p5canvas = createCanvas(800,700)
	canvas = p5canvas.canvas;

	engine = Engine.create();
	world = Engine.world;

	dx = width/(Nx-1);
	dy = height/(Ny-1);

	// creating plinkos
	for(var j = 0; j < Ny; j++){
		y = 0.2*width + dy*j;
		if(j%2 == 0)
			xStart = 0
		else
			xStart = dx/2
		for(var i = 0; i < Nx; i++){
			x = xStart + i*dx
			balls.push(new Ball(x,y,5,true,0,255,0))
		}
	}

	// creating ball
	plinkoBall = new Ball(random(0,width),0,10,false,255,0,0)

	Engine.run(engine);

	// creating saveObject (custom Made one!, defined is in library/imageSaver.js)
	saver = new ImageSaver("image","png",6)
}

function draw(){
	background(0)

	for(var i = 0; i < balls.length; i++)
		balls[i].show()
	plinkoBall.show()

	plinkoBall.checkOffScreen()

	saver.save();

}
