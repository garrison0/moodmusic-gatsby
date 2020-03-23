
/*

NEXT STEPS:

(1) Abstract the mountain to a class so we can have 2 or 3 of them stacked on top of each other, the pivot point "revolving" around different y values
(2) Add an intro splash page with options to adjust the number of "mountains", the flatness of each range, how fast the whole thing scrolls
(3) consider using in the future for music visualization (especially changing color), having musical qualities (tempo, frequency spectra) 
    effect the variables controlling the mountains
*/


var canvas;
var context;
var didntstart = true;
var analyser;
var bufferLength;
var dataArray;
var CircularBuffer = require("circular-buffer");
var n = 22050;
var avgBuffer = new CircularBuffer(n);
var len = 0;
var sum = 0;
var avg = 0;
var wrapper;
var preview;


class Mountain {
  constructor(center_x, center_y) {
    this.center_x = center_x;
    this.center_y = center_y
    this.x = center_x;
    this.prev_x = this.x;
    this.y = center_y;
    this.prev_y = this.y;
    this.dy = 0;
    this.ddy = 0;
    this.useFirst = false;
    this.heightScale = 0.5;
  }

  update(delta) {
    this.prev_x = this.x;
    this.x = this.x + delta * 0.05;

    // distribution varies based on position of y 
    // (at top => can only accelerate down, vice versa)
    // upper bound of accel
    if (this.y < 0){
      this.y = canvas.height / 2;
      this.dy = 0;
      this.ddy = 0;
    }
    if (this.y > canvas.height){
      this.y = canvas.height;
    }
    var x = 0.001;
    var a = -1 * x  + x * (this.y / canvas.height);
    var b = x * (this.y / canvas.height);

    // reverse to go in the correct direction
    this.ddy = -1 * JSUS.random(a,b);
    this.dy = this.dy + (this.ddy * delta);
    
    // add random noise acceleration
    this.dy = this.dy + JSUS.random(-0.005, 0.005) * delta;
    
    // scaling factor from .9 to .5 == tall vs flat mountains (have a scale or a knob)

    this.dy = this.dy * (.9);

    // brakes -- not too fast
    if (Math.abs(this.dy) > 0.2) {
      this.dy = .9 * this.dy;
    }

    this.prev_y = this.y;
    this.y = this.y + (this.dy * delta);
  }

  draw() { 
    // (not) standard
    //var gradient = context.createLinearGradient(this.x,this.y, this.x,wrapper.height);
    let colorAdd = 155;
    let color;
    var gradient = context.createLinearGradient(this.x,0, this.x,wrapper.height);
    gradient.addColorStop(0, 'rgb(10,10,' + (150 + colorAdd) + ')');
    gradient.addColorStop(.73, 'black');

    // can have the gradient span the screen so the drawn box "reveals" it
    var gradient2 = context.createLinearGradient(this.x,0, this.x,wrapper.height);
    gradient2.addColorStop(0, 'rgb(10,10,' + (50 + colorAdd) + ')');
    gradient2.addColorStop(1, 'black');

    if (this.useFirst == true) {
      context.fillStyle = gradient;
      color = 'rgb(10,10,' + (100 + colorAdd) + ')';
    } else {
      context.fillStyle = gradient2;
      color = 'rgb(10,10,' + colorAdd + ')'
    }
    
    if (this.useFirst == true) {
      // make it 'virtually' taller
      this.y = this.y - (250 * this.heightScale);
      this.prev_y = this.prev_y - (250 * this.heightScale);
    } else { 
      this.y = this.y - (100 * this.heightScale);
      this.prev_y = this.prev_y - (100 * this.heightScale);
    }

    context.fillRect(this.prev_x - 1, Math.max(this.prev_y, this.y), this.x - this.prev_x + 2, wrapper.height+10);

    // now draw the appropriate triangle on top of the box
    if (this.prev_y < this.y){
      // moving downhill
      context.beginPath();
      context.moveTo(this.prev_x, this.y);
      context.lineTo(this.prev_x - 0.5, this.prev_y);
      context.lineTo(this.x + 1, this.y + 0.5);
      context.fill();
    } else {
      // moving uphill
      context.beginPath();
      context.moveTo(this.x, this.prev_y + 0.5);
      context.lineTo(this.x + 1.0, this.y + 0.5);
      context.lineTo(this.prev_x - 0.5, this.prev_y + 0.5);
      context.fill();
    }
    // put it back!
    if (this.useFirst == true) {
      this.y = this.y + 250 * this.heightScale;
      this.prev_y = this.prev_y + 250 * this.heightScale;
    } else { 
      this.y = this.y + 100 * this.heightScale;
      this.prev_y = this.prev_y + 100  * this.heightScale;
    }
  }
}

function main() {

  canvas = document.getElementById("myCanvas");
  canvas.width = window.innerWidth * 10;
  canvas.height = window.innerHeight;
  wrapper = document.getElementById('wrapper'); 
  wrapper.width = window.innerWidth;
  wrapper.height = window.innerHeight;

  canvas.style.background = '222222';
  context = canvas.getContext('2d');

  // init mountains
  first_mountain = new Mountain(0, 3 * wrapper.height / 5);
  first_mountain.useFirst = true;
  second_mountain = new Mountain(0, 4 * wrapper.height / 5);

  if(!preview) {
    // setup stuff to get audio and plug it into visualizer
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    // so we get a handful of bins instead of many
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(function(stream) {
      /* use the stream */
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      MainLoop.setUpdate(update).setDraw(draw).start();
    })
    .catch(function(err) {
      context.font = "12px Monospace";
      context.fillStyle = "white";
      context.fillText("You need to give permission to use the microphone to use this feature. Reload and try again.", 
                      window.innerWidth/2 - 300,canvas.height/2);
    });
  } else {
    MainLoop.setUpdate(update).setDraw(draw).start();
  }
}

function scrollWrapper(x, y){
  var wrapper = document.getElementById('wrapper');
  wrapper.scrollTop = y;
  wrapper.scrollLeft = x;
}

var focused = true;

window.onfocus = function() {
    focused = true;
};
window.onblur = function() {
    focused = false;
};

function update(delta) {
  canvas.style.background = '000000';

  if (!preview) {
    analyser.getByteTimeDomainData(dataArray);

    // maintain buffer for the average
    for(var i = 0; i < bufferLength; i++){ 
      if (len >= n) {
        // len stays the same
        let sample = avgBuffer.deq();
        sum = sum - sample;
        // add new sample --
        let new_sample = Math.abs(dataArray[i] - 128);
        avgBuffer.enq(new_sample);
        sum = sum + new_sample;
        avg = sum / len;
      } else {
        len += 1;
        let new_sample = Math.abs(dataArray[i] - 128);
        avgBuffer.enq(new_sample);
        sum = sum + new_sample;
        avg = sum / len;
      }
    }

    // loudness implies height 
    // divide avg by 128 (uint8 data type)
    // to get b/w 0 and 1 for a scalar
    first_mountain.heightScale = avg / 128;
    second_mountain.heightScale = avg / 128;
  }

  // console.log(len);
  // console.log(sum);
  // console.log(avg);

  // pitch implies color (high => more red, low => more blue)
  // scale from ~0 to ~3k hz

  // tempo implies flatness
  // update mountains
  first_mountain.update(delta);
  second_mountain.update(delta);
  
  // scroll the 'camera'
  scrollWrapper(first_mountain.x - wrapper.width, first_mountain.y - wrapper.height / 2);
}

function draw() {
  // draw stuff
  first_mountain.draw();
  second_mountain.draw();
}

preview = JSON.parse(document.getElementById("previewHelper").getAttribute("preview"));
if(!preview) {
  window.addEventListener(
    "mousedown", function(){
      console.log(didntstart);
      if (didntstart == true) {
        didntstart = false;
        document.getElementById('initText').style.display = "none";
        main();
      }
    });
} else {
  document.getElementById('initText').style.display = "none";
  main();
}

