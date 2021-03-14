//------------------------------------------------------------------------------
// Sketch: mazeGenerator
// created on Sat Mar 13 17:50:03 IST 2021
//------------------------------------------------------------------------------

// defining width and height of canvas
let width=400, height=400;

let side = 20;

let nrows, ncols, grid = [], current, stack = [], saver;

function setup(){
	// creating canvas
	createCanvas(width,height);

	// frameRate(5);

	// calculating no of rows and columns
	nrows = height/side;
	ncols = width/side;

	// initializing cell objects
	for(let i = 0; i < ncols; i++){
		for(let j = 0; j < nrows; j++){
			grid.push(new Cell(i*side,j*side,i,j));
		}
	}

	// initializing current cell
	current = grid[0];
	// current = grid[floor(random(0,grid.length-1))];
	current.visited = true;

	// save frames
	saver = new ImageSaver('image','png',6);
}

function draw(){
	// setting background color
	background(0);

	// showing cells
	for(let i = 0; i < grid.length; i++)
		grid[i].show();

	// getting random next neighbour
	let next = current.checkNeighbours();
	current.markCurrent();

	if (next){
		next.visited = true;

		stack.push(current);

		// removing walls between cells
		removeWalls(current,next);
		// swapping new neighbour as current
		current = next;
	}
	else if(stack.length > 0){
		current = stack.pop();
	}
	else{
		print("stopped");
		noLoop();
	}

	// saver.save();
}

function removeWalls(currentCell, neighbourCell){
	let xdiff = currentCell.i - neighbourCell.i;
	let ydiff = currentCell.j - neighbourCell.j;

	// topwall
	if(xdiff == 0 && ydiff > 0){
		currentCell.walls[0] = false;
		neighbourCell.walls[2] = false;
	}
	else if(xdiff == 0 && ydiff < 0){ // bottom wall
		currentCell.walls[2] = false;
		neighbourCell.walls[0] = false;
	}
	else if(ydiff == 0 && xdiff > 0){ // left wall
		currentCell.walls[3] = false;
		neighbourCell.walls[1] = false;
	}
	else if(ydiff == 0 && xdiff < 0){ // right wall
		currentCell.walls[1] = false;
		neighbourCell.walls[3] = false;
	}
}
