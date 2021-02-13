var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine,world;
var balls = [],slides = [];

function setup(){
	createCanvas(800,700)

	engine = Engine.create();
	world = Engine.world;

	// defining slides
	slides.push( new Slide([0,width/2,width/2,0],[0.25*height,0.5*height,0.51*height,0.26*height]))
	slides.push( new Slide([0,width/2,width/2,0],[0.75*height,0.85*height,0.86*height,0.76*height]))
	slides.push( new Slide([width,width/2,width/2,width],[0.5*height,0.75*height,0.76*height,0.51*height]))
	slides.push( new Slide([width,width/2,width/2,width],[0.15*height,0.25*height,0.26*height,0.16*height]))

	Engine.run(engine);
}

function draw(){
	background(0)

	for(var i = 0; i < slides.length; i++)
		slides[i].show()

	for(var i = 0; i < balls.length; i++)
		balls[i].show()
}

function mouseDragged(){
	balls.push(new Ball(mouseX,mouseY,10))
}
