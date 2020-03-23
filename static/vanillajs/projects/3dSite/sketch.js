const objects = [];
let eyeZ;
var canvas; 
var myFont;
var dt = 1/60;
var t = 0;
var weHit = false;
var p1 = {x:0,y:0,z:0};

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

  // x = # chars in string * textsize/2 ???
  // y = textsize ???
  // roughly? so we can formulate this and make classes
  github = createGraphics(184,64);
  github.background(255, 100);
  github.fill(255);
  // github.textAlign(CENTER);
  github.textSize(64);
  github.text('github', 0, 50);

  donate = createGraphics(200,60);
  donate.background(255, 100);
  donate.fill(255);
  //donate.textAlign(CENTER);
  donate.textSize(64);
  donate.text('donate', 0, 50);

  // define update for 'github' button
  function update(button){
    return (t) => {
      button.yAngle = 2 * cos(3 * t) / 3;
      button.xAngle = 2 * sin(3 * t) / 3;
      button.zAngle = 2 * cos(3 * t) / 3;
      
      button.point = createVector(100 + 25 * cos(2 * t),100 + 25 * sin(3 * t), 0);
      button.normal = p5.Vector.fromAngles(PI / 2 - button.xAngle, button.yAngle, 100);
    }
  }

  // define update for 'donate' button
  function dUpdate(button){
    return (t) => {
      button.yAngle = 0;
      button.xAngle = 0;
      button.zAngle = 0;
      
      button.point = createVector(-50 + 35 * cos(5 * t),-50 + 25 * sin(3 * t / 4 + 3.14), 200);
      button.normal = p5.Vector.fromAngles(PI / 2 - button.xAngle, button.yAngle, 100);
      console.log(button.normal);
    }
  }

  // define update for 'about' button
  function aUpdate(button){
    return (t) => {
      button.yAngle = 2 * cos(3 * t) / 3;
      button.xAngle = 0;
      button.zAngle = 0;
      
      button.point = createVector(100 + 25 * cos(3 * t),25 * sin(4 * t), -1000);
      button.normal = p5.Vector.fromAngles(PI / 2 - button.xAngle, button.yAngle, 100);
    }
  }

  // define update for 'projects' button
  function pUpdate(button){
    return (t) => {
      button.yAngle = 0;
      button.xAngle = 0;
      button.zAngle = 0;
      
      button.point = createVector(-150 + 25 * cos(3 * t),50 + 25 * sin(5 * t), -300);
      button.normal = p5.Vector.fromAngles(PI / 2 - button.xAngle, button.yAngle, 100);
    }
  }

  // objects.push(new IntersectPlane(1, 0, 0, -100, 0, 0)); // Left wall
  // objects.push(new IntersectPlane(1, 0, 0, 100, 0, 0)); // Right wall
  // objects.push(new IntersectPlane(0, 1, 0, 0, -100, 0)); // Bottom wall
  // objects.push(new IntersectPlane(0, 1, 0, 0, 100, 0)); // Top wall
  objects.push(new PlaneButton(0, 0, 1, 0, 0, 0, 100, 50, 'overlay', github, update)); 
  objects.push(new PlaneButton(0, 0, 1, 0, 0, 0, 100, 50, 'overlay', about, aUpdate));
  objects.push(new PlaneButton(0, 0, 1, 0, 0, 0, 100, 50, 'overlay', projects, pUpdate));
  objects.push(new PlaneButton(0, 0, 1, 0, 0, 0, 100, 50, 'overlay', donate, dUpdate));

  noStroke();
  ambientMaterial(250);
}

function handleXClick() {
  document.getElementById('overlay').style.display = "none";
}

function mouseClicked() {
  if (weHit) {
    document.getElementById('overlay').style.display = "inline-block";
  }
  weHit = false;
}

function draw() {
  t = t + dt;
  background(20);

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
  push();
  fill(237, 34, 93);
  translate(-300, 0, 200);
  rotateY((90 * PI) / 180);
  plane(2000, 500);
  pop();

  // Right wall
  push();
  fill(237, 34, 93);
  translate(300, 0, 200);
  rotateY((90 * PI) / 180);
  plane(2000, 500);
  pop();

  // Bottom wall
  push();
  fill(237, 34, 93);
  translate(0, 175, 200);
  rotateX((90 * PI) / 180);
  plane(425, 1200);
  pop();

  // Top wall
  push();
  fill(237, 34, 93);
  translate(0, -175, 200);
  rotateX((90 * PI) / 180);
  plane(425, 1200);
  pop();

  plane(400,400, -10); // Back wall

  const x = mouseX - width / 2;
  const y = mouseY - height / 2;

  const Q = createVector(0, 0, eyeZ); // A point on the ray and the default position of the camera.
  const v = createVector(x, y, -eyeZ); // The direction vector of the ray.

  let intersect; // The point of intersection between the ray and a plane.
  let closestLambda = eyeZ * 10; // The draw distance.

  // update buttons, check for collision
  for (let x = 0; x < objects.length; x += 1) {
    let object = objects[x];
    object.update(t);
    let lambda = object.getLambda(Q, v); // The value of lambda where the ray intersects the object

    if (lambda > 0) {
      // Find the position of the intersection of the ray and the object.
      intersect = p5.Vector.add(Q, p5.Vector.mult(v, lambda));
      weHit = true;
      // weHit = object.withinBounds(intersect);
      //closestLambda = lambda;
    }
  }

  // draw buttons
  for (let x = 0; x < objects.length; x += 1) {
    push();
    objects[x].draw();
    pop();
  }

  // Cursor
  if(weHit){
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "";
  }

  // some buttons
  // push();
  // fill(0,0,0)
  // texture(about);
  // translate(100 + 25 * cos(3 * t),25 * sin(4 * t), -1000);
  // rotateY(2 * cos(3 * t) / 3)
  // plane(200,200);
  // pop();

  // push();
  // texture(projects);
  // translate(-150 + 25 * cos(3 * t),50 + 25 * sin(5 * t), -300);
  // plane(200,200);
  // pop();

  // push();
  // texture(donate);
  // p1.x = -50 + 35 * cos(5 * t);
  // p1.y = -50 + 25 * sin(3 * t / 4 + 3.14);
  // p1.z = 200;
  // translate(p1.x, p1.y, p1.z);
  // plane(100,50);
  // pop();
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  line(0, 0, 0, base.x, base.y, base.z);
  translate(base.x, base.y, base.z);
  line(0, 0, 0, vec.x, vec.y, vec.z);
  translate(vec.x, vec.y, vec.z);
  fill(237, 34, 93);
  stroke(237, 34, 93);
  sphere(10);
  pop();
}

// Class for a plane collision + button
class PlaneButton {
  constructor(n1, n2, n3, p1, p2, p3, width, height, id, texture, update) {
    this.normal = createVector(n1, n2, n3); // The normal vector of the plane
    this.point = createVector(p1, p2, p3); // Center of the plane
    this.halfwidth = width / 2;
    this.halfheight = height / 2;
    this.d = this.point.dot(this.normal);
    this.id = id; // id for the corresponding DIV to open
    this.texture = texture;
    this.updatefunc = update;
  }

  update(t){
    this.updatefunc(this)(t);
    this.normal = createVector(0,0,1);
  }

  draw() {
    // draw plane
    push();
    texture(this.texture);
    translate(this.point.x, this.point.y, this.point.z);
    rotateY(this.yAngle);
    rotateX(this.xAngle);
    plane(100, 50);
    pop();
  }

  projplane(u, n){
    return p5.Vector.sub(u, p5.Vector.mult(n, u.dot(n) / (n.dot(n))))
  }

  withinBounds(intersect){
    let proj = (p5.Vector.sub(intersect, this.point));
    let xyPlaneNormal = createVector(0,0,1);
    let projXY = this.projplane(proj, xyPlaneNormal);

    return (Math.abs(projXY.x) < this.halfwidth && Math.abs(projXY.y) < this.halfheight);
  }

  getLambda(Q, v) {
    // Q = P_0, v = v
    // setting Q to ~= the origin
    // seems to approximately work
    // whereas the actual center point
    // does not?
    let pNorm = this.point.copy();
    this.d = pNorm.dot(this.normal);
    return (-this.d - this.normal.dot(Q)) / this.normal.dot(v);
  }
}