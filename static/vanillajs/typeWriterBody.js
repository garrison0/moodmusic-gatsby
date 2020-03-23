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
	// img = loadImage('assets/gwape3.jpg');
	// img = loadImage('assets/cabin.jpeg');
	img = loadImage('assets/blueno2.png');
	// img = loadImage('assets/bluenude.jpeg');
	// img = loadImage('assets/nude8.jpg');
  // img = loadImage('assets/series.png');
//   img = loadImage('assets/gokflower.jpg');
//   img = loadImage('assets/series.jpg');
	// img = loadImage('assets/gazeofsilenceklee.jpg');
	// img = loadImage('assets/seatednudexi.jpg');
	// img = loadImage('assets/show-photo.jpg');
	// img = loadImage('assets/gazeofsilenceklee.jpg');
	// img = loadImage('assets/gazeofsilenceklee.jpg');
	// img = loadImage('assets/selfportrait.jpg');
	// img = loadImage('assets/Wave-Harmonics.jpeg');
	p5font = loadFont('fonts/SourceSerifPro-Regular.ttf');
	opentype.load('fonts/SourceSerifPro-Regular.ttf', function(err, font) {
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

	fontSize = '14'
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
  GRAYSCALE_JITTER = .8;
  OPACITY_JITTER = .8;
  // know when to give up
  // for speed's sake
 	GOOD_ENOUGH_COST = 0;

  // i am totally guessing here
  PRIORITY_ARR = ['.',',','1','I', 'i', 'l','j','t','[',']','-','_','`','~','|']

 	var x = 0;
	 var y = Math.ceil(fontSize * 2);
	 console.log(fontSize)
 	for (var i = 0; i < selfstory.length; i++){
 		c = selfstory.charAt(i);
 		if (c == ' ' || c == "\n"){
 			// pass 
 		} else {
 			if (c in dict) {
 				dict[c].totalCount += 1;
 			} else {
				// console.log(c);
 				Font.draw(ctx, c, x, y, fontSize);
 				let p = Font.getPath(c, x, y, fontSize);
				 let bb = p.getBoundingBox();
				 console.log(bb);
 				// noFill();
				// rect(bb.x1, bb.y1, (bb.x2 - bb.x1), (bb.y2 - bb.y1));
				var ch = get(bb.x1, bb.y1, (bb.x2 - bb.x1), Math.ceil(bb.y2 - bb.y1));
				ch.loadPixels();
 				dict[c] = {'totalCount': 1, 'currentCount': 0, 'BB': bb,
 									 'x': x, 'y': y, 'chPixels': ch.pixels};
 				x = x + fontSize * 2.0;
 				if ((x + fontSize * 2.0) > canvas.width){
 					x = 0;
 					y = y + fontSize * 2.0;
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

var selfstory = `at age 6, i was born in the rolling hillsides of lancaster county, pennsylvania. my parents found me wrapped in a husk of corn. as they unpeeled my fibrous shackles, they wept at my bereft state, and i cried out, “hurry father, there’s no time”

relatedly, in the summer of 2019, i went on a bit of a lone road trip, dragging my guitar all over the country with some lofty intentions

and there’s something funny, character-wise, about how i hardly played it. do i really want to be a musician?

it’s like you’re some schmuck who travels to live his dream of being a fisherman. you have a car full of fishing rods, bait, and spinners, but when you reach the next spot and start fishing your face slowly turns sour - not much has changed

or, it’s like you’ve set out to cross a mile long tunnel and around the halfway mark you’ve noticed the light at both ends has long become dim and unappealing 

what’s the use.

a few months prior to this trek i'd just come back from a backpacking trip in India and Tanzania. i'd also just graduated from CMU. thus, i was living with a professor i'd befriended who graciously offered me a room while i assumedly pieced together a more sustainable plan 

in short, he was pittsburgh’s classical music audio guy. and i was an audio guy myself. as part of the deal, i remember covering a “hit record in protools and sit there” shift at the benedum theater for him. the sound tech there, i.e. the sound tech who has always been there (welcome to pittsburgh), is friendly, but quite a strong character. the kind who sees handshakes as an exercise in submission. during polite smalltalk related to why i was living with said professor, i offered up my immediate plan of crossing the states while busking and chasing the music dream. his response was “…and then what?” 

a year prior, though i'm the only one that remembered, i'd met him under similar circumstance. back then i amused him by detailing my live sound engineer ambition that i'd spent over 18 months making headroom in. his advice was 

“don’t do it” 

and 

“there’s no glory in it”

i'm not exactly the type to lack ambition. and it’s not like i hadn’t considered this. i agreed, more or less, but it seemed like a divergent and relatively feasible path that would directly support “plan A” - write and produce my own music. so i did it anyways

priorities shift right under your nose. now i'm a full stack engineer.

it’s unsatisfying to always be choosing between wistful destitution and min/maxing money vs free time with some engineering job that allows you to allocate spare energy and resources into “what you ‘really’ want to do”. it’s not about liking or not liking the engineering job. it might even become part of the end goal. but while the ambitions don’t just fade away, all your time sure does.

there’s a reason so many famous artists come from rich families with key connections or have otherwise spawned from general nepotism and industry fostering. the real luxury isn’t from any extravagance or expensive gear but from not being forced to choose between comfort, opportunity, and dedication to your craft. whatever you think your craft is. i might still be deciding on mine.

maybe it’s best not delineated beyond “art”. i'm letting some kind of dharmic principle sort the rest out

this figure was derived from georgia o'keeffe's blue II, 1916.`

var lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada. Faucibus in ornare quam viverra orci. Nullam ac tortor vitae purus faucibus. Tristique senectus et netus et malesuada fames ac turpis. Ut porttitor leo a diam sollicitudin tempor. Mauris sit amet massa vitae. Massa vitae tortor condimentum lacinia. Ac placerat vestibulum lectus mauris ultrices eros in. Ac turpis egestas integer eget aliquet nibh praesent. Sollicitudin tempor id eu nisl nunc mi ipsum. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Maecenas pharetra convallis posuere morbi leo. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Massa sed elementum tempus egestas sed sed risus pretium.

Quisque non tellus orci ac auctor. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Sed augue lacus viverra vitae congue. Purus gravida quis blandit turpis cursus in hac habitasse. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Eget felis eget nunc lobortis mattis. Morbi leo urna molestie at elementum eu. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Massa tempor nec feugiat nisl pretium fusce id velit ut. Proin gravida hendrerit lectus a. Vitae sapien pellentesque habitant morbi tristique senectus. Aliquet lectus proin nibh nisl condimentum.

Malesuada nunc vel risus --------------------,,/.............commodo viverra maecenas accumsan. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Sodales neque sodales ut etiam sit amet. Tortor id aliquet lectus proin nibh nisl. Eget nullam non nisi est sit amet facilisis magna etiam. Sit amet nisl suscipit adipiscing bibendum. Quisque id diam vel quam elementum pulvinar. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Sed risus pretium quam vulputate dignissim suspendisse in. Tincidunt eget nullam non nisi est. Sagittis orci a scelerisque purus semper eget duis. Fermentum leo vel orci porta non pulvinar neque laoreet. Quis imperdiet massa tincidunt nunc pulvinar sapien. Purus semper eget duis at tellus at. Facilisis gravida neque convallis a cras.

Varius quam quisque id diam vel quam elementum pulvinar. Aliquam ultrices sagittis orci a scelerisque. Neque gravida in fermentum et. Pretium aenean pharetra magna ac. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit. Ornare quam viverra orci sagittis eu. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Tempor nec feugiat nisl pretium fusce. Eget felis eget nunc lobortis. Duis convallis convallis tellus id interdum velit laoreet id donec. Natoque penatibus et magnis dis parturient montes. Suscipit adipiscing bibendum est ultricies integer quis auctor.

Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Nibh praesent tristique magna sit amet purus gravida quis. Tellus id interdum velit laoreet. Adipiscing elit pellentesque habitant morbi. Elementum nibh tellus molestie nunc. Lorem dolor sed viverra ipsum nunc aliquet. Quam pellentesque nec nam aliquam sem et tortor consequat id. Auctor urna nunc id cursus metus aliquam eleifend mi. Eu non diam phasellus vestibulum lorem sed. Quis hendrerit dolor magna eget est lorem ipsum dolor. Nisi est sit amet facilisis magna etiam tempor orci eu. Imperdiet proin fermentum leo vel orci porta non pulvinar. Mi proin sed libero enim. Placerat in egestas erat imperdiet sed. Orci ac auctor augue mauris augue neque. Tristique senectus et netus et malesuada fames ac turpis. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Neque gravida in fermentum et sollicitudin. Nulla malesuada pellentesque elit eget gravida. Lorem ipsum dolor sit amet.`

var shortLorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada. Faucibus in ornare quam viverra orci. Nullam ac tortor vitae purus faucibus. Tristique senectus et netus et malesuada fames ac turpis. Ut porttitor leo a diam sollicitudin tempor. Mauris sit amet massa vitae. Massa vitae tortor condimentum lacinia. Ac placerat vestibulum lectus mauris ultrices eros in. Ac turpis egestas integer eget aliquet nibh praesent. Sollicitudin tempor id eu nisl nunc mi ipsum. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Maecenas pharetra convallis posuere morbi leo. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Massa sed elementum tempus egestas sed sed risus pretium.

Quisque non tellus orci ac auctor.`