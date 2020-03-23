const objects = [];
let eyeZ;
var canvas; 
var myFont;
var dt = 1/60;
var t = 0;

function preload() {
  myFont = loadFont('Roboto-Regular.ttf');
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  canvas.class = "canvas"
  canvas.position(0,0);
  canvas.style('position', 'fixed');
  canvas.style('z-index', '-1');
  canvas.style('-webkit-transition', 'opacity 1200ms ease-in');
  canvas.style('transition', 'opacity 1200ms ease-in');
  eyeZ = height / 2 / tan((30 * PI) / 180); // The default distance the camera is away from the origin.

  objects.push(new IntersectPlane(1, 0, 0, -100, 0, 0)); // Left wall
  objects.push(new IntersectPlane(1, 0, 0, 100, 0, 0)); // Right wall
  objects.push(new IntersectPlane(0, 1, 0, 0, -100, 0)); // Bottom wall
  objects.push(new IntersectPlane(0, 1, 0, 0, 100, 0)); // Top wall
  objects.push(new IntersectPlane(0, 0, 1, 0, 0, 0)); // Back wall
  // make button planes in this order.... about projects github donate
  //objects.push(new IntersectPlane(0,0,1,100, 0, -1000, 200, 200));

  about = createGraphics(300, 300);
  //about.background(255, 100);
  about.fill(255);
  about.textAlign(CENTER);
  about.textSize(64);
  about.text('about', 150, 150);

  projects = createGraphics(300, 300);
  //projects.background(255, 100);
  projects.fill(255);
  projects.textAlign(CENTER);
  projects.textSize(64);
  projects.text('projects', 150, 150);

  github = createGraphics(300, 300);
  //github.background(255, 100);
  github.fill(255);
  github.textAlign(CENTER);
  github.textSize(64);
  github.text('github', 150, 150);

  donate = createGraphics(300, 300);
  donate.background(255, 100);
  donate.fill(255);
  donate.textAlign(CENTER);
  donate.textSize(64);
  donate.text('donate', 150, 150);

  console.log("yo");
  noStroke();
  ambientMaterial(250);
}

function draw() {
  t = t + dt;
  console.log(dt);
  // background(20);

  // to set the light position,
  // think of the world's coordinate as:
  // -width/2,-height/2 -------- width/2,-height/2
  //                |            |
  //                |     0,0    |
  //                |            |
  // -width/2,height/2--------width/2,height/2
  pointLight(255,255,255, width / 2, height / 8, 1500);
  ambientLight(125,125,125);

  // Left wall
  // push();
  // fill(237, 34, 93);
  // translate(-300, 0, 200);
  // rotateY((90 * PI) / 180);
  // plane(2000, 500);
  // pop();

  // // Right wall
  // push();
  // fill(237, 34, 93);
  // translate(300, 0, 200);
  // rotateY((90 * PI) / 180);
  // plane(2000, 500);
  // pop();

  // // Bottom wall
  // push();
  // fill(237, 34, 93);
  // translate(0, 175, 200);
  // rotateX((90 * PI) / 180);
  // plane(425, 1200);
  // pop();

  // // Top wall
  // push();
  // fill(237, 34, 93);
  // translate(0, -175, 200);
  // rotateX((90 * PI) / 180);
  // plane(425, 1200);
  // pop();

  //plane(400,400, -10); // Back wall

  const x = mouseX - width / 2;
  const y = mouseY - height / 2;

  const Q = createVector(0, 0, eyeZ); // A point on the ray and the default position of the camera.
  const v = createVector(x, y, -eyeZ); // The direction vector of the ray.

  let intersect; // The point of intersection between the ray and a plane.
  let closestLambda = eyeZ * 10; // The draw distance.

  for (let x = 0; x < objects.length; x += 1) {
    let object = objects[x];
    let lambda = object.getLambda(Q, v); // The value of lambda where the ray intersects the object

    if (lambda < closestLambda && lambda > 0) {
      // Find the position of the intersection of the ray and the object.
      intersect = p5.Vector.add(Q, p5.Vector.mult(v, lambda));
      // cool, we intersect
      closestLambda = lambda;
    }
  }

  // Cursor
  push();
  translate(intersect);
  fill(237, 34, 93);
  sphere(10);
  //fill(0);
  pop();

  // some buttons
  push();
  fill(0,0,0)
  texture(about);
  translate(100, 0, -1000);
  plane(200,200);
  pop();

  push();
  texture(projects);
  translate(-150,50, -300);
  plane(200,200);
  pop();

  push();
  texture(github);
  translate(100,100, 200);
  background(122);
  plane(200,200);
  pop();

  push();
  texture(donate);
  translate(-50,-50, 200);
  plane(200,200);
  pop();
}

// Class for a plane that extends to infinity.
class IntersectPlane {
  constructor(n1, n2, n3, p1, p2, p3, width, height) {
    this.normal = createVector(n1, n2, n3); // The normal vector of the plane
    this.point = createVector(p1, p2, p3); // CENTER of the plane
    this.halfwidth = width / 2;
    this.halfheight = height / 2;
    this.d = this.point.dot(this.normal);
  }

  getLambda(Q, v) {
    return (-this.d - this.normal.dot(Q)) / this.normal.dot(v);
  }
}