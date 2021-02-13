/* spiral circles P5JS script */

function setup(){
	createCanvas(1400,760)
	background(240)
}

function draw(){
	fill(255,0,0)
	if (mouseIsPressed)
		drawCircle(mouseX,mouseY)
}

function drawCircle(X,Y){
	// center of canvas
	// X = width/2; Y = height/2
	background(240)

	// total number of circles
	N = 1000

	// getting radial locations mapping
	Rmax = sqrt(width**2 + height**2)/2

	// getting theta variations mapping
	ThetaMax = 17*PI

	// plotting circle
	var index;
	for(index = 1; index <= N; index++){
		radial = map(index, 1,N, 0,Rmax)
		radius = map(radial,0,Rmax, 0,50)
		theta = map(radial, 0,Rmax, 0,ThetaMax)
		circle(X+radial*cos(theta),Y+radial*sin(theta),radius)
	}
}
