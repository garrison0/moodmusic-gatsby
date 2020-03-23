let img, canvas, Font, fontSize, pg;
var letters, ctx, dict;
var bestX, bestY;
var charPos = [];
var second, spaceClicked;
var MODE;
var Y_INCREMENT;
var X_INCREMENT;
var THRESHOLD;
var GRAYSCALE_JITTER;
var OPACITY_JITTER;
var DISTRIBUTION;
var DRAW_ORDER;
var PRIORITY_ARR;
var GOOD_ENOUGH_COST;

/*
SPEEDUPS TO DO:

(1) DONE!
grab the croppedChar for each char in the dict and add it to the dict
then we are not making a new get() each time. unnecessary. 

(2) DONE!
rewrite the findMinimumCost for MODE="INNER"
							              and MODE="THRESHOLD"
							              and MODE="DEFAULT" (image comparison library)
		(inner considers only the pixels within the character when computing cost,
		 making all characters seek out black slots of their shape)
		(box considers everything within the bounding box,
		 making characters with holes favor middle values)

IMPROVEMENTS:
(1) DONE! 
	pick opacity AND grayscale of drawn character based on exponential distribution skewed left
		AND jitter values for better variety of shading
			FOR INNER AND THRESHOLD MODES ONLY!
			- need to consider this both when filtering ...
			- and when computing the cost ...
(2)	DONE!
	draw characters in order of either (a) randomly chosen each time 
																		or (b) in order of whitespace within bb
																					 (less holes) -> (more holes)
																					[l i j t 1 ... B w m K ...]
*/

// load image to approximate
function preload(){
	// img = loadImage('assets/ml.png');
	// img = loadImage('assets/cabin.jpeg');
	img = loadImage('assets/blueno2.png');
	// img = loadImage('assets/bluenude.jpeg');
	// img = loadImage('assets/nude8.jpg');
	// img = loadImage('assets/series.png');
	p5font = loadFont('fonts/Roboto-Medium.ttf');
	opentype.load('fonts/Roboto-Medium.ttf', function(err, font) {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      Font = font;
  	}
	});
}

function setup(){
	canvas = createCanvas(window.innerWidth, window.innerHeight * 2);
  canvas.class = "canvas"
  canvas.position(0,0);
  // canvas.style('position', 'fixed');
  canvas.background(255,255,255,0);

  ctx = canvas.elt.getContext('2d');

  console.log(img.height);
  console.log(img.width); 

	fontSize = '12'
	textFont(p5font);
	textAlign(LEFT, CENTER);
	textSize(parseInt(fontSize));
  dict = {};

  // THRESHOLD, DEFAULT, OR INNER
  MODE = "INNER";
  // BY_CHARACTER or RANDOM or BY_WHITESPACE
  DRAW_ORDER = "BY_CHARACTER";
  // EXP or UNIFORM
  DISTRIBUTION = "EXP";
  // how many pixels to skip
  // overall ''blockiness'' aesthetic
  Y_INCREMENT = 2;
  X_INCREMENT = 2;
  // 0 to 1
  THRESHOLD = 0.77;
  GRAYSCALE_JITTER = .49;
  OPACITY_JITTER = .8;
  // know when to give up
  // for speed's sake
 	GOOD_ENOUGH_COST = 0;

  // i am totally guessing here
  PRIORITY_ARR = ['.',',','1','I', 'i', 'l','j','t','[',']','-','_','`','~','|']

 	var x = 0;
 	var y = fontSize * 2;
 	for (var i = 0; i < selfstory.length; i++){
 		c = selfstory.charAt(i);
 		if (c == ' ' || c == "\n"){
 			// pass 
 		} else {
 			if (c in dict){
 				dict[c].totalCount += 1;
 			} else {
 				Font.draw(ctx, c, x, y, fontSize);
 				let p = Font.getPath(c, x, y, fontSize);
 				let bb = p.getBoundingBox();
 				// noFill();
				// rect(bb.x1, bb.y1, (bb.x2 - bb.x1), (bb.y2 - bb.y1));
				var ch = get(bb.x1, bb.y1, (bb.x2 - bb.x1), (bb.y2 - bb.y1));
				ch.loadPixels();
 				dict[c] = {'totalCount': 1, 'currentCount': 0, 'BB': bb,
 									 'x': x, 'y': y, 'chPixels': ch.pixels};
 				x = x + fontSize * 1.5;
 				if ((x + fontSize * 1.5) > canvas.width){
 					x = 0;
 					y = y + fontSize * 1.5;
 				}
 			}
 		}
 	}

 	loadPixels();
 	img.loadPixels();

 	second = false;
 	spaceClicked = false;
}

/*
	findMinimumCost 
		char: the character we're finding the best position for

		finds the best position for the character in the image
		defined by an image comparison library
		~ seems to favor edges, but quite slow ~
		~ doesn't care about opacity and greyscale jitter ~
		then removes the most prominent pixels of the character
		from that image

		returns a vector {'x': int, 'y': int} defining the best
		X and Y position whereas the text rendered is
		aligned LEFT and CENTER in p5js
*/
function findMinimumCost(char){
 	var bb = dict[char].BB;
 	var w = Math.round(bb.x2 - bb.x1);
 	var h = Math.round(bb.y2 - bb.y1);
 	var bestCost = 255 * 255;
 	var bestX = 0;
 	var bestY = 0;
 	var d = pixelDensity();

 	// starting point for the character
 	var y_off = bb.y1;
	var x_off = bb.x1;

	var croppedChar = dict[char].chPixels;

 	for (var b = 4; b < (img.height - h); b+=Y_INCREMENT){
 		for (var a = parseInt(fontSize)/2; a < (img.width - w); a+=X_INCREMENT){
 			var croppedImage = getCroppedPixels(a, b, w, h, img.width, img.pixels, d);
		 	var c = pixelmatch(croppedImage, croppedChar, null, w, h, {threshold: THRESHOLD});
		 	if (c < bestCost){
		 		bestCost = c;
		 		bestX = a;
		 		bestY = b;
		 	}
 		}
 	}

 	// remove the character pixels from the img
 	img.pixels = filterPixels(bestX,bestY,w,h,img.width,img.pixels,croppedChar,d,1,1);
 	img.updatePixels();

 	return {'x': bestX, 'y': bestY};
}

/*
	findMinimumCostThresh
		char: the character we're finding the best position for

		finds the best position for the character in the image
		considering all pixels within the box
		above a threshold of difference
		then removes the most prominent pixels of the character
		from that image

		returns a vector {'x': int, 'y': int} defining the best
		X and Y position whereas the text rendered is
		aligned LEFT and CENTER in p5js
*/
function findMinimumCostThresh(char, opacity, grayscale){
	var bb = dict[char].BB;
 	var w = Math.round(bb.x2 - bb.x1);
 	var h = Math.round(bb.y2 - bb.y1);
 	var bestCost = 255 * w * h;
 	var bestX = 0;
 	var bestY = 0;
 	var d = pixelDensity();

 	// starting point for the character
 	var y_off = bb.y1;
	var x_off = bb.x1;

	// display window is messy, so just use "get"
	var croppedChar = dict[char].chPixels;
	
	var iw = img.width;
	var pxls = img.pixels;

	find_cost:
	for (var b = parseInt(fontSize)/2; b < (img.height - h); b+=Y_INCREMENT){
 		for (var a = parseInt(fontSize)/2; a < (img.width - w); a+=X_INCREMENT){
 			// instead of using pixel match,
			// access image pixels directly
			var c = 0;
			var diff = 0;
 			for (var y = 0; y < h; y++) {
		    for (var x = 0; x < w; x++) {
		      var off = Math.round(((y + b) * iw + (x + a)) * d * 4);
		      var j = Math.round((y * w + x) * 4);
		 
		 			diff += Math.abs(pxls[off+0] - croppedChar[j+0] * grayscale);
	      	diff += Math.abs(pxls[off+1] - croppedChar[j+1] * grayscale);
	      	diff += Math.abs(pxls[off+2] - croppedChar[j+2] * grayscale);
	      	diff += Math.abs(pxls[off + 3] - croppedChar[j + 3] * opacity); 

		      if ( (diff / (255 * 4)) >= THRESHOLD ){
		      	c += 1;
		      }
		      diff = 0;
		    }    
			}
		 	if (c < bestCost){
		 		bestCost = c;
		 		bestX = a;
		 		bestY = b;
		 	}
		 	if (c <= GOOD_ENOUGH_COST){
		 		break find_cost;
		 	}
 		}
 	}

 	// remove the character pixels from the img
 	img.pixels = filterPixels(bestX,bestY,w,h,img.width,img.pixels,croppedChar,d,opacity,grayscale);
 	img.updatePixels();

 	return {'x': bestX, 'y': bestY};
}

/*
	findMinimumCostInner
		char: the character we're finding the best position for

		finds the best position for the character in the image
		only considering pixels within the character 
		then removes the most prominent pixels of the character
		from that image

		returns a vector {'x': int, 'y': int} defining the best
		X and Y position whereas the text rendered is
		aligned LEFT and CENTER in p5js
*/
function findMinimumCostInner(char, opacity, grayscale){
	var bb = dict[char].BB;
 	var w = Math.round(bb.x2 - bb.x1);
 	var h = Math.round(bb.y2 - bb.y1);
 	var bestCost = 255 * w * h;
 	var bestX = 0;
 	var bestY = 0;
 	var d = pixelDensity();

 	// starting point for the character
 	var y_off = bb.y1;
	var x_off = bb.x1;

	// display window is messy, so just use "get"
	var croppedChar = dict[char].chPixels;
	
	var iw = img.width;
	var pxls = img.pixels;

	find_cost:
	for (var b = 4; b < (img.height - h); b+=Y_INCREMENT){
 		for (var a = 4; a < (img.width - w); a+=X_INCREMENT){
 			// instead of using pixel match,
			// access image pixels directly
			var c = 0;
			var diff = 0;

 			for (var y = 0; y < h; y++) {
		    for (var x = 0; x < w; x++) {
		      var off = Math.round(((y + b) * iw + (x + a)) * d * 4);
		      var j = Math.round((y * w + x) * 4);
		      var cutoff = 64;
		      // if alpha >= cutoff:
		      if (croppedChar[j + 3] * opacity >= cutoff) {
		      	diff += Math.abs(pxls[off+0] - (croppedChar[j+0] * grayscale));
		      	diff += Math.abs(pxls[off+1] - (croppedChar[j+1] * grayscale));
		      	diff += Math.abs(pxls[off+2] - (croppedChar[j+2] * grayscale));
		      }
		      // add normalized difference to cost;
		      c += (diff / (255 * 3));
		      diff = 0;
		    }    
			}
		 	if (c < bestCost){
		 		bestCost = c;
		 		bestX = a;
		 		bestY = b;
		 	}
		 	if (c <= GOOD_ENOUGH_COST){
		 		break find_cost;
		 	}
 		}
 	}

 	// remove the character pixels from the img
 	img.pixels = filterPixels(bestX,bestY,w,h,img.width,img.pixels,croppedChar,d,opacity,grayscale);
 	img.updatePixels();

 	return {'x': bestX, 'y': bestY};
}

/*
	x_off: starting x of sub-image
	y_off: starting y of sub-image
	w: final width
	h: final height
	iw : width of original image
	pxls : Uint8Array of pixels of original image
	d : pixel density (in my case, gathered via p5js)
*/
function getCroppedPixels(x_off,y_off,w,h,iw,pxls,d){
	var cropped = new Uint8Array(4 * w * h);
	for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var off = Math.round(((y + y_off) * iw + (x + x_off)) * d * 4);
      var j = Math.round((y * w + x) * 4);
      cropped[j + 0] = pxls[off + 0];
      cropped[j + 1] = pxls[off + 1];
      cropped[j + 2] = pxls[off + 2];
      cropped[j + 3] = pxls[off + 3];
    }    
	}
	return cropped;
}

/*
	x_off: starting x of sub-image
	y_off: starting y of sub-image
	w: final width
	h: final height
	iw : width of original image
	pxls : Uint8Array of pixels of original image
	char : Uint8Array of pixels of the character 
				 we're using to filter the image with
				 (char has visible pixel => make corresponding
				 image pixel white)
	d : pixel density (in my case, gathered via p5js)
	opacity : between 0 (invisible) and 1 (fully opaque)
	grayscale : between 0 (totally white) and 1 (totally black) 
*/
function filterPixels(x_off,y_off,w,h,iw,pxls,char,d,opacity,grayscale){
	for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var off = Math.round(((y + y_off) * iw + (x + x_off)) * d * 4);
      var j = Math.round((y * w + x) * 4);
      // if char pixel has noticable alpha
	    if (char[j + 3] >= 80){
	    	// char is 0,0,0,alpha everywhere for black font
	    	// in the future there may be colors... 
      	pxls[off + 0] += grayscale * (Math.abs(pxls[off] - char[j]));
      	pxls[off + 1] += grayscale * (Math.abs(pxls[off+1] - char[j+1]));
      	pxls[off + 2] += grayscale * (Math.abs(pxls[off+2] - char[j+2]));
      	pxls[off + 3] = Math.max(0, pxls[off + 3] - opacity * char[j + 3]);
      }
    }
	}
	return pxls;
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  let w = canvas.width;
	let h = canvas.height;
 	let d = pixelDensity();
 	let charOff = Math.round((y * w + x) * d * 4);
 	loadPixels();
 	for (var i =0; i < 4; i++){
 		console.log(pixels[charOff + i]);
 	}
 	console.log("X: " + x + " Y: " + y);
 	console.log("L X: " + dict.L.BB.x1 + " L Y: " + dict.L.BB.y1);
}

function keyPressed(){
	if (key == ' '){
		spaceClicked = !spaceClicked;
	} else if (key == 'd') {
		download('characters.txt', JSON.stringify(charPos));
	}
}

// lambda = 1;
// truncated exponential distribution b/w 0 and 1
// returns value from 0 to 1, more often closer to 0.
function expDistribution () {
  return -Math.log(Math.random()) % 1;
}

function draw(){
	if (second){
		clear();
		if (spaceClicked) {
			image(img,0,0);
		} else {
			// render all the chars
			for (var i = 0; i < charPos.length; i++){
				let gs = 255 - (255 * charPos[i].grayscale);
				let alpha = 255 * charPos[i].opacity;
				fill(gs,gs,gs,alpha);
				text(charPos[i].c, charPos[i].x, charPos[i].y);
			}
		}
	} else {
		switch (DRAW_ORDER) {

			case "RANDOM":
				dictCopy = Object.assign({}, dict)
				while (Object.entries(dictCopy).length > 0){
					let keys = Object.keys(dictCopy);
					let char = keys[keys.length * Math.random() << 0];

					// now do something with the char
					if (DISTRIBUTION == "EXP") {
						var opacity = 1 - (expDistribution() * OPACITY_JITTER);
						var grayscale = 1 - (expDistribution() * GRAYSCALE_JITTER);
					} else {
						var opacity = 1 - (Math.random() * OPACITY_JITTER);
						var grayscale = 1 - (Math.random() * GRAYSCALE_JITTER);
					}

					if (MODE == "INNER"){
						var vec = findMinimumCostInner(char, grayscale, opacity);
					} else if (MODE == "THRESHOLD") {
						var vec = findMinimumCostThresh(char, grayscale, opacity);
					} else {
						// opacity / grayscale not considered for this mode
						opacity = 1;
						grayscale = 1;
						var vec = findMinimumCost(char);
					}
			 		charPos.push({'c': char, 'x': vec.x, 'y': vec.y, 'grayscale' : grayscale, 
			 									'opacity': opacity});

					dictCopy[char].currentCount += 1;
					if (dictCopy[char].currentCount >= dictCopy[char].totalCount){
						delete dictCopy[char];
					}
				}
				break;

			case "BY_WHITESPACE":
				for (char in PRIORITY_ARR) {
					if (char in dict){
						while (dict[char].currentCount < dict[char].totalCount){
							if (DISTRIBUTION == "EXP") {
								var opacity = 1 - (expDistribution() * OPACITY_JITTER);
								var grayscale = 1 - (expDistribution() * GRAYSCALE_JITTER);
							} else {
								var opacity = 1 - (Math.random() * OPACITY_JITTER);
								var grayscale = 1 - (Math.random() * GRAYSCALE_JITTER);
							}
							// console.log("GRAYSCALE: " + grayscale);
							// console.log("OPACITY: " + opacity);
							if (MODE == "INNER"){
								var vec = findMinimumCostInner(char, grayscale, opacity);
							} else if (MODE == "THRESHOLD") {
								var vec = findMinimumCostThresh(char, grayscale, opacity);
							} else {
								// opacity / grayscale not considered for this mode
								opacity = 1;
								grayscale = 1;
								var vec = findMinimumCost(char);
							}
					 		charPos.push({'c': char, 'x': vec.x, 'y': vec.y, 'grayscale' : grayscale, 
					 									'opacity': opacity});
					 		dict[char].currentCount += 1;
						} 
				 	}
				}
				// don't break
				// continue to rest of chars

			default:
				for (char in dict){
					while (dict[char].currentCount < dict[char].totalCount){
						if (DISTRIBUTION == "EXP") {
							var opacity = 1 - (expDistribution() * OPACITY_JITTER);
							var grayscale = 1 - (expDistribution() * GRAYSCALE_JITTER);
						} else {
							var opacity = 1 - (Math.random() * OPACITY_JITTER);
							var grayscale = 1 - (Math.random() * GRAYSCALE_JITTER);
						}
						// console.log("GRAYSCALE: " + grayscale);
						// console.log("OPACITY: " + opacity);
						if (MODE == "INNER"){
							var vec = findMinimumCostInner(char, grayscale, opacity);
						} else if (MODE == "THRESHOLD") {
							var vec = findMinimumCostThresh(char, grayscale, opacity);
						} else {
							// opacity / grayscale not considered for this mode
							opacity = 1;
							grayscale = 1;
							var vec = findMinimumCost(char);
						}
				 		charPos.push({'c': char, 'x': vec.x, 'y': vec.y, 'grayscale' : grayscale, 
				 									'opacity': opacity});
				 		dict[char].currentCount += 1;
					} 
			 	}
			 	break;
		}
		second = true; 
	}
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var selfstory = `At age 6, I was born in the rolling hillsides of Lancaster County, Pennsylvania. My parents found me wrapped in a husk of corn. As they unpeeled my fibrous shackles, they wept, and I cried out, “woof woof, daddy, woof woof.” 

I proceeded to grow up small and feeble. I made my international debut by moving to Pittsburgh in 2014 for college, increasing my “have-travelled-to radius” to 250 miles. 

The University of Pittsburgh, what a school! I liked it so much, I left. I transferred to Carnegie Mellon University in 2016 where I realized my heart is in the work, but not this work in particular. So, I re-arranged my Pitt-Milieu-Inspired Philosophy PhD plans to become… an audio engineer… in order to support my illustrious music career potential. A month later, I was taking sound recording. 2 months later, I was part of the recording crew in the school of music. 5 months later, I had a formal internship running sound and doing production for a local band. 

As graduation neared, and the audio experience accumulated, I realized that despite taking some pretty terse mathematics, a course in algorithms, machine learning, etc., and having written a (most-probably sophomoric) thesis in philosophical logic, I was headed straight for a lovely, satisfying career of clicking microphones onto stands and taping cables to the floor. To rectify this, a month after graduating, in January of 2019, I flew straight to India. Then I spent another month in Tanzania. This increased my “having-travelled-to radius” to a more satisfying number. 

I came back. I had to figure something out. I lived with a professor-friend and worked odd jobs in Pittsburgh for a few months. I landed a more stable audio gig. Then, in June of 2019, I took the safe option and drove across the country to the west coast. In my quasi-homeless state, surviving primarily from my car (#2 of the roadtrip), and ritually praying in the direction of Apple Park three times a day, I began learning front-end development. 

Then I drove back to Pittsburgh, with plans to go further east. I went to the wrong coast, it seems. 

Unfortunately, employers are not often keen on hiring engineers without direct experience. Neither time spent on audio nor previous summers spent paying my rent as a temporary “industrial assembler” helped my job search. But they don’t know what they don’t know - you learn something. Waking up at 5:30am, driving 25 minutes past Kreider Farms, past some nameless train tracks, and past more than a few cornfields, to get to your small manufacturing company’s building and sand a few thousand pieces of wood for 8 hours. 5 days a week. For two months. You learn something, so they tell me. You just don’t realize it. In fact, I still haven’t. 

I am now preparing for an internship as a full-stack engineer. I’ve been exploring the creative possibilities of the web stack through my project work. I’m interested in the mythical role of a developer with a creative voice. Something that utilizes my jack-of-all-trades skillset and wide interest range.

This figure is generated from Georgia O’Keeffe’s Blue II, 1916.`

var lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada. Faucibus in ornare quam viverra orci. Nullam ac tortor vitae purus faucibus. Tristique senectus et netus et malesuada fames ac turpis. Ut porttitor leo a diam sollicitudin tempor. Mauris sit amet massa vitae. Massa vitae tortor condimentum lacinia. Ac placerat vestibulum lectus mauris ultrices eros in. Ac turpis egestas integer eget aliquet nibh praesent. Sollicitudin tempor id eu nisl nunc mi ipsum. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Maecenas pharetra convallis posuere morbi leo. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Massa sed elementum tempus egestas sed sed risus pretium.

Quisque non tellus orci ac auctor. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Sed augue lacus viverra vitae congue. Purus gravida quis blandit turpis cursus in hac habitasse. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Eget felis eget nunc lobortis mattis. Morbi leo urna molestie at elementum eu. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Massa tempor nec feugiat nisl pretium fusce id velit ut. Proin gravida hendrerit lectus a. Vitae sapien pellentesque habitant morbi tristique senectus. Aliquet lectus proin nibh nisl condimentum.

Malesuada nunc vel risus commodo viverra maecenas accumsan. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Sodales neque sodales ut etiam sit amet. Tortor id aliquet lectus proin nibh nisl. Eget nullam non nisi est sit amet facilisis magna etiam. Sit amet nisl suscipit adipiscing bibendum. Quisque id diam vel quam elementum pulvinar. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Sed risus pretium quam vulputate dignissim suspendisse in. Tincidunt eget nullam non nisi est. Sagittis orci a scelerisque purus semper eget duis. Fermentum leo vel orci porta non pulvinar neque laoreet. Quis imperdiet massa tincidunt nunc pulvinar sapien. Purus semper eget duis at tellus at. Facilisis gravida neque convallis a cras.

Varius quam quisque id diam vel quam elementum pulvinar. Aliquam ultrices sagittis orci a scelerisque. Neque gravida in fermentum et. Pretium aenean pharetra magna ac. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit. Ornare quam viverra orci sagittis eu. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Tempor nec feugiat nisl pretium fusce. Eget felis eget nunc lobortis. Duis convallis convallis tellus id interdum velit laoreet id donec. Natoque penatibus et magnis dis parturient montes. Suscipit adipiscing bibendum est ultricies integer quis auctor.

Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Nibh praesent tristique magna sit amet purus gravida quis. Tellus id interdum velit laoreet. Adipiscing elit pellentesque habitant morbi. Elementum nibh tellus molestie nunc. Lorem dolor sed viverra ipsum nunc aliquet. Quam pellentesque nec nam aliquam sem et tortor consequat id. Auctor urna nunc id cursus metus aliquam eleifend mi. Eu non diam phasellus vestibulum lorem sed. Quis hendrerit dolor magna eget est lorem ipsum dolor. Nisi est sit amet facilisis magna etiam tempor orci eu. Imperdiet proin fermentum leo vel orci porta non pulvinar. Mi proin sed libero enim. Placerat in egestas erat imperdiet sed. Orci ac auctor augue mauris augue neque. Tristique senectus et netus et malesuada fames ac turpis. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Neque gravida in fermentum et sollicitudin. Nulla malesuada pellentesque elit eget gravida. Lorem ipsum dolor sit amet.`