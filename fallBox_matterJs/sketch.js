var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine;

var boxes = [];
var world;

function setup(){
	createCanvas(400,400)

	engine = Engine.create();
	world = Engine.world;

	Engine.run(engine);

	ground = Bodies.rectangle(width/2,height,width,10,{isStatic:true})

	World.add(engine.world,ground);
}

function mousePressed(){
	boxes.push(new Box(mouseX,mouseY,20,20))
}


function draw(){
	background(0)

	for(var i = 0; i < boxes.length; i++){
		boxes[i].show();
	}

	stroke(255)
	strokeWeight(4)
	line(0,height,width,height)

}
