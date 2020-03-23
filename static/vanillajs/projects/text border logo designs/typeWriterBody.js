let img, canvas, font;

// load image to approximate
function preload(){
	img = loadImage('assets/cabin.jpeg');

	opentype.load('fonts/Roboto-Medium.ttf', function(err, f) {
    if (err) {
        alert('Font could not be loaded: ' + err);
    } else {
        font = f;
    }
	});
}

function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.class = "canvas"
  canvas.position(0,0);
  canvas.style('position', 'fixed');
  canvas.style('z-index', '-1');
  canvas.style('-webkit-transition', 'opacity 1200ms ease-in');
  canvas.style('transition', 'opacity 1200ms ease-in');
}

function draw(){
	//image(img, 0, 0);
	clear();
	var ctex = canvas.elt.getContext('2d');
	let x = canvas.width/2;
	let y = canvas.height/2;
	let text = "qQ"
	let fontSize = '72';
	font.draw(ctex, text, x,y,fontSize);
	// console.log(font.glyphs)
	let p = font.getPath(text, x, y, fontSize);
	// p.fill = 'null';
	// p.stroke = 'black';
	// let g = font.charToGlyph('H');
	let bb = p.getBoundingBox();
	let w = bb.x2 - bb.x1;
	let h = bb.y2 - bb.y1;
	// console.log(w);
	// console.log(h);
	// font.drawMetrics(ctex, text, x, y, fontSize);
	noFill();
	rect(bb.x1, bb.y1, w, h);

	console.log(w);
	console.log(h);
}

var lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi varius risus erat, vel mattis eros imperdiet in. Pellentesque vitae orci eu mauris hendrerit tincidunt at sit amet massa. Mauris posuere posuere aliquam. Etiam iaculis, nisi ac tempor fermentum, est mauris dignissim purus, placerat volutpat ligula nibh eu dui. Ut mollis a risus vitae viverra. Nam id sagittis odio. Nulla ornare, ipsum consequat faucibus commodo, neque metus mattis nulla, at rutrum massa risus vel nisi. Quisque quam nunc, posuere vitae pulvinar a, facilisis ac urna. Maecenas condimentum nunc id augue imperdiet tincidunt. Aenean lacinia elit ut quam accumsan pellentesque.

Etiam id egestas sapien. Sed odio augue, suscipit eget massa sed, iaculis ullamcorper nisl. Sed at turpis in libero vulputate malesuada. Curabitur ut varius erat. Donec lectus libero, vehicula vitae tortor vel, maximus ullamcorper tellus. In dictum orci sed ultricies aliquam. Aliquam erat volutpat. In sed nulla ornare, ullamcorper urna at, commodo neque. Aenean vel lectus in lorem cursus tincidunt. Duis posuere congue scelerisque. Sed arcu quam, eleifend at justo vitae, sodales sagittis lacus. Nullam tincidunt efficitur ante, vitae imperdiet purus.

Etiam urna nisi, porttitor id vehicula id, tempus vel quam. Donec vitae suscipit mauris. Sed eu nisi auctor, pretium justo eu, auctor risus. Quisque lacinia tortor pretium nisl imperdiet laoreet. Sed porttitor nisl sit amet tincidunt cursus. Donec eget lectus at elit convallis congue. Ut porttitor, ligula sit amet elementum imperdiet, massa velit fringilla metus, quis hendrerit lorem purus vel mi. Pellentesque varius cursus neque, sed lobortis dolor ultricies vel. Nunc sed mauris venenatis, fermentum dui at, lacinia libero. Morbi vel tortor metus. Etiam viverra risus vel neque sodales luctus. Duis dictum venenatis urna, eget aliquet dolor laoreet ac. Etiam eu imperdiet dolor. Nullam justo mauris, mollis et pretium id, egestas eget massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur vel mauris vel urna volutpat aliquet.`

