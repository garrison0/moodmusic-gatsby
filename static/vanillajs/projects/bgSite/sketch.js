var canvas;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  canvas.class = "canvas"
  canvas.position(0,0);
  canvas.style('position', 'fixed');
  canvas.style('z-index', '-1');
  canvas.style('-webkit-transition', 'opacity 1200ms ease-in');
  canvas.style('transition', 'opacity 1200ms ease-in');
}

function draw() {
  //abuse this loop to fix a small quirk in the markup
  //where the width of the container 
  //of the collapsable components must be fixed
  var elements = document.querySelectorAll('.fixedWidth');
  for(var i=0; i<elements.length; i++){
      elements[i].style.width = window.innerWidth * 0.65 + "px";
  }

  // i.e. if any element is being shown
  // blur the canvas
  var elements = document.querySelectorAll('.show');
  var clsp_elements = document.querySelectorAll('.collapsing.width');
  if (clsp_elements.length > 0) {
    canvas.style('opacity', '0.2');
    console.log(canvas.style('opacity'));
  } else if (elements.length > 0) {
    canvas.style('opacity', '0.2');
    if (canvas.style('opacity') <= 0.2) { 
      canvas.style('webkitFilter', 'blur(2px)');
    }
  } else {
    canvas.style('opacity', '1.0');
    if(canvas.style('opacity') > 0.2) {
      canvas.style('webkitFilter', 'blur(0px)');
    }
  }

  background(250);
  rotateY(frameCount * 0.01);

  for (let j = 0; j < 5; j++) {
    push();
    for (let i = 0; i < 40; i++) {
      translate(
        sin(frameCount * 0.003 + j) * 300,
        sin(frameCount * 0.003 + j) * 300,
        i * 0.2
      );
      rotateZ(frameCount * 0.002);
      push();
      sphere(8, 6, 4);
      pop();
    }
    pop();
  }
}