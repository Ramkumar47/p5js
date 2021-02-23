var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine,world;
var balls = [],slides = [];
var thickness = 10;

let width = 400, height = 300;

function setup(){
	createCanvas(width, height)

	engine = Engine.create();
	world = Engine.world;

	// defining slides
	slides.push( new Slide([0.25*width,0.75*width+thickness,0.75*width+thickness,0.25*width],
		[0.75*height,0.75*height,0.75*height+2*thickness,0.75*height+2*thickness]))
	slides.push( new Slide([0.25*width,0.25*width+thickness,0.25*width+thickness,0.25*width],
		[0.75*height+thickness,0.75*height+thickness,0.75*height-3*thickness,0.75*height-3*thickness]))
	slides.push( new Slide([0.75*width,0.75*width+thickness,0.75*width+thickness,0.75*width],
		[0.75*height+thickness,0.75*height+thickness,0.75*height-3*thickness,0.75*height-3*thickness]))

	Engine.run(engine);

	saver = new ImageSaver("image","png",6);
}

function draw(){
	background(200)

	balls.push(new Ball(random(width*0.48,width*0.52),-height/4,6))

	for(var i = 0; i < slides.length; i++)
		slides[i].show()

	for(var i = 0; i < balls.length; i++){
		balls[i].show()
		if(balls[i].checkPosition()){
			balls.splice(i,1);
			i--;
		}
	}

	saver.save();

	console.log(frameCount, balls.length, engine.world.bodies.length)

	if(frameCount > 750){
		noLoop();
		print("done");
	}

}
