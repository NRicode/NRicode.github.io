
let blocks = [];
let w;
let h;
let evaluation = "";

if(window.innerWidth < window.innerHeight){
	
	w = window.innerWidth * 0.6;
	h = window.innerWidth * 0.6;
	
}else{
	
	w = window.innerHeight*0.75;
	h =  window.innerHeight*0.75;
	
}

function setup() {
	
	let canvas = createCanvas(w, h);
	canvas.style.outline = "1px solid black";
	canvas.parent("cvs");
	let left = w/2 - (w/6*3)/2
	for(let i=0; i<9; i++){
		
		let block = {};
		block.w = w/6;
		block.h = w/6;
		block.x = left + (i%3 * block.w);
		block.y = h/10 + Math.floor(i/3)*block.h;
		block.index = i;
		block.active = false;
		blocks.push(block);
	}
	
}

function collision(x, y, targetX, targetY, targetWidth, targetHeight){
	
	return (x > targetX && x < targetX + targetWidth && y > targetY && y < targetY + targetHeight);
	
}

let mouseToggle = true;
function update(){
	
	if(mouseIsPressed && mouseToggle){
		
		mouseToggle = false;
		
		//input blocks activation
		for(let item of blocks){
			
			if(collision(mouseX, mouseY, item.x, item.y, item.w, item.h)){
				item.activate = true;
			}
			
		}
		

		//evaluate button activation
		let bw = w*0.75;
		let bh = 50;
		if(collision(mouseX, mouseY, w/2 - bw/2, h*0.75, bw, 50)){
			
			let inputs = [0, 0, 0, 0, 0, 0, 0, 0, 0]
			
			for(let index in blocks){
				
				let item = blocks[index];
				if(item.activate){
					inputs[index] = 1;
					item.activate = false;
				}
				
			}
			
			
			let res = model(inputs);
			
			for(let i=0; i<5; i++){	
				res[i] += 0.5
				res[i] = Math.floor(res[i]);
			}
			if(res[0]){
				evaluation = "block shape!"
			}
			if(res[1]){
				evaluation = "line shape!"
			}
			if(res[2]){
				evaluation = "T shape!"
			}
			if(res[3]){
				evaluation = "L shape!"
			}
			if(res[4]){
				evaluation = "S shape!"
			}
		}
		
	}
	if(!mouseIsPressed){
		
		mouseToggle = true;
		
	}
	
}

function drawButton(label, x, y, w ,h){
	
	fill(255,255,255);
	rect(x, y, w, h);
	textSize(20);
	fill(0,0,0);
	textAlign(CENTER, CENTER);
	text(label, x+(w/2), y+(h/2));
	
}

function draw() {
	
	update();
	
	background(255);
	fill(255,255,255);
  
	for(let item of blocks){
		
		if(item.activate){
			fill(255,0,0);
		}else{
			fill(255,255,255);
		}
		rect(item.x, item.y, item.w, item.h);
	
	}
	
	textSize(20);
	fill(0,0,0);
	textAlign(CENTER, CENTER);
	text("I see a ... " + evaluation , w/2, h*0.7);
	
	let bw = w*0.75;
	let bh = 50;
	drawButton("evaluate", w/2 - bw/2, h*0.75, bw, 50);

  
}
