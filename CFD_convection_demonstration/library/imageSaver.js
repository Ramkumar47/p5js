// class object for saving canvas images for animation-------------------------
// custom made one: remember to enable auto-download for png files in firefox
// browser on the first download popup box, prefered to do it first and
// move to save animation frames
class ImageSaver{
	constructor(imgName, extension, buffer= 6){
		this.imageFirstName = imgName;
		this.imageExtension = extension;
		this.numeralBuffer = buffer;
		this.count = 0;
	}

	pad(n, width) { // refered online from https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}

	save(){
		let number = this.pad(this.count, this.numeralBuffer)
		let imageName = this.imageFirstName+number
		saveCanvas(imageName,this.imageExtension)
		this.count++
	}

}
