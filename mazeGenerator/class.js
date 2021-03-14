class Cell{
	constructor(x,y,i,j){
		this.x = x;
		this.y = y;
		this.walls = [true,true,true,true]; // top, right, bottom, left walls
		this.visited = false;
		this.i = i;
		this.j = j;
		this.neighbours = [];
		this.getNeighbours();
	}

	getNeighbours(){
		this.neighbours = [];
		// checking top
		if(!(this.j-1 < 0))
			this.neighbours.push( (this.j-1)+this.i*ncols );
		// checking bottom
		if(!(this.j+1 > nrows-1))
			this.neighbours.push( (this.j+1)+this.i*ncols );
		// checking left
		if(!(this.i-1 < 0))
			this.neighbours.push( this.j + (this.i-1)*ncols );
		// checking right
		if(!(this.i+1 > ncols-1))
			this.neighbours.push( this.j + (this.i+1)*ncols );

	}

	show(){
		// stroke(255);
		stroke(0);
		strokeWeight(3);
		noFill();
		if(this.walls[0])
			line(this.x,this.y, this.x+side, this.y); // top
		if(this.walls[1])
			line(this.x+side,this.y, this.x+side, this.y+side); // right
		if(this.walls[2])
			line(this.x,this.y+side, this.x+side, this.y+side); // bottom
		if(this.walls[3])
			line(this.x,this.y+side, this.x, this.y); // left

		if(this.visited){
			fill(255,0,0);
			noStroke();
			rect(this.x,this.y,side,side);
		}
	}

	markCurrent(){
		fill(0,255,0);
		noStroke();
		rect(this.x,this.y,side,side);
	}

	checkNeighbours(){
		let notVisited = [];
		for(let i = 0; i < this.neighbours.length; i++){
			if( !grid[this.neighbours[i]].visited )
				notVisited.push(grid[this.neighbours[i]]);
		}
		if(notVisited.length == 0)
			return undefined;
		let idx = floor(random(0, notVisited.length));
		return notVisited[idx];
	}
}
