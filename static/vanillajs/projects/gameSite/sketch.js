var canvas;
var bgTiles;
var bg;
var tmap;

// globals
// because this is a prototype
// and i'm not concerned
var tsets;
var obstacles;
var buttons;
var buttonDivs;
var player;
var GRAVITY = 0.35;
var JUMP = -12;
var firstTime = true;
var oldwidth;
var oldheight;
var nm;
var firstLevel;
var flWidth;
var flHeight;
var curlWidth;
var curlHeight;
var canJump = false;

// async load
function preload() {
  // load tileset json/imgs in a convenient dictionary
  tsets = {};
  tsets['spritesheet_ground'] = {};
  tsets['spritesheet_tiles'] = {};
  tsets['spritesheet_ground']['json'] = loadJSON('spritesheet_ground.json'); 
  tsets['spritesheet_tiles']['json'] = loadJSON('spritesheet_tiles.json');
  tsets['spritesheet_ground']['img'] = loadImage('spritesheet_ground.png');
  tsets['spritesheet_tiles']['img'] = loadImage('spritesheet_tiles.png');
  // bg = loadImage('bg.png');
}

function setup() {
  firstLevel = 'aboutLevel';
  tmap = TileMaps[firstLevel];
  canvas = createCanvas(tmap.width * 32, tmap.height * 32);
  canvas.parent('canvas-container');
  canvas.style('z-index', '0');
  canvas.style('position', 'absolute');
  canvas.style('-webkit-transition', 'opacity 1200ms ease-in');
  canvas.style('transition', 'opacity 1200ms ease-in');

  // some p5.play init
  obstacles = new Group();
  buttons = new Group();
  buttonDivs = {};
  useQuadTree(true);
  tmap = TileMaps[firstLevel];

  flWidth = tmap.width * 32;
  flHeight = tmap.height * 32;

  // render the tile map of the first level
  loadLevel(firstLevel);
}

function loadLevel(tmap_name){
  tmap = TileMaps[tmap_name];
  nm = tmap_name;

  canvas.remove();
  curlWidth = tmap.width*32;
  curlHeight = tmap.height*32;
  canvas = createCanvas(tmap.width * 32, tmap.height * 32);
  canvas.parent("canvas-container");
  canvas.position(Math.max(0, window.innerWidth/2 - canvas.width/2), 0);

  // bgTiles = createGraphics(Math.round(canvas.width), Math.round(canvas.height));

  // for (var i = 0; i < tmap.layers[0].data.length; i++){
  //   let tileId = tmap.layers[0].data[i] - 1;

  //   // find which tileset this tile belongs to
  //   let j = 0;
  //   let candidate = tmap.tilesets[0];
  //   // assume non-empty tilesets
  //   // while (j < tmap.tilesets.length) {
  //   //  candidate = tmap.tilesets[j];
  //   //  if (candidate.firstgid <= tileId){
  //   //    j++;
  //   //  } else {
  //   //    break;
  //   //  }
  //   // }
  //   let set = (candidate.source).split(".")[0];

  //   // necessary stuff to find tile position in the img
  //   let cols = tsets[set]['json'].columns;
  //   let tHeight = tsets[set]['json'].tileheight; 
  //   let tWidth = tsets[set]['json'].tilewidth;

  //   let sx = tWidth * (tileId % cols);
  //   let sy = tHeight * Math.floor(tileId / cols);
  //   let dx = tWidth * (i % tmap.width);
  //   let dy = tHeight * Math.floor(i / tmap.width);

  //   // draw the tile where it should be
  //   if (tileId > 0){
  //     bgTiles.image(tsets[set].img, dx, dy, 32,32, sx, sy,32, 32);
  //   }
  // } 

  // go through the object layer
  var px;
  var py;
  var d;
  var f;
  var obstacle;
  var button;
  for (var i = 0; i < tmap.layers[1].objects.length; i++){

    var obj = tmap.layers[1].objects[i];
  
    px = obj.x + obj.width/2;
    py = obj.y + obj.height/2;

    // console.log("OBJ WIDTH: " + obj.width);
    // console.log("OBJ HEIGHT " + obj.height);
    // console.log("OBJ X: " + obj.x);
    // console.log("OBJ Y: " + obj.y);
    // console.log("PX: " + px);
    // console.log("PY: " + py);

    switch(obj.type) {
      case "playerStart":
        player = createSprite(px,py,32,32);
        break;
      
      // create divs that display information
      case "about_s1":
        // collision
        obstacle = createSprite(px,py, obj.width, obj.height);
        obstacle.visible = false;
        obstacles.add(obstacle);

        // make the div
        d = createDiv('hi, this is an about page mock-up! <br/><br/> this is the main info section.'
                      + '<br/><br/> you are a floaty box thing. L/R to move, x to jump.'
                      + '<br/><br/> click or run into the buttons to change the page.');
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('text-align: center; border: 2px solid black; border-radius: 5px;');
        d.style('background: white');
        break;

      case "about_s2":
        // collision
        obstacle = createSprite(px,py, obj.width, obj.height);
        obstacle.visible = false;
        obstacles.add(obstacle);

        // make the div
        d = createDiv();
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('text-align: center; border: 2px solid black; border-radius: 5px;');
        d.style('background: white');

        // grab the prof pic
        var profDiv = document.getElementById('profPic');
        profDiv.style.display = "inline-block";
        d.child(profDiv);

        break;

      case "donate_s1":
        obstacle = createSprite(px,py, obj.width, obj.height);
        obstacle.visible = false;
        obstacles.add(obstacle);

        // make the div
        d = createDiv("oh boy! thank you, just hit that button there to donate via paypal!");
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('border: 2px solid black; border-radius: 5px;');
        d.style('text-align:center; background: white;');
        break;

      case "donate_s2":
        obstacle = createSprite(px,py, obj.width, obj.height);
        obstacle.visible = false;
        obstacles.add(obstacle);

        // use pre-existing div, change proper styling
        var donateDiv = document.getElementById('donate');
        donateDiv.style.width = obj.width;
        donateDiv.style.height = obj.height;
        donateDiv.style.display = 'inline-block';

        // put it in the another div with
        // the right position
        // and then into container for
        // everything to work right
        d = createDiv();
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.child(donateDiv);
        break;

      case "donate_s3":
        // collision
        obstacle = createSprite(px,py, obj.width, obj.height);
        obstacle.visible = false;
        obstacles.add(obstacle);

        // make the div
        d = createDiv(FALLING + FALLING);
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('border: 2px solid black; border-radius: 5px;');
        d.style('background: white; overflow: hidden; white-space: pre');
        break;

      case "displayProject":
        // no collision
        // render first project to start
        // but prep all of them
        d = createDiv();
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);

        var group = document.querySelectorAll("[proj-group='true']");
        group.forEach( (section) => {
          section.style.width = obj.width;
          section.style.height = obj.height;
          section.style.display = "none";
          d.child(section);
        });
        break;

      // create buttons
      // add to proper collision group
      case "donateButton":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = "donate"
        buttons.add(button);

        // make the DOM button
        d = createButton('DONATE!');
        d.parent('container');
        f = resolveClick(button);
        d.mousePressed(f);
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;
      
      case "projectButton":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = "project";
        buttons.add(button);

        // make the DOM button
        d = createButton('PROJ!');
        d.parent('container');
        f = resolveClick(button);
        d.mousePressed(f);
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      case "secretButton":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = "secret";
        buttons.add(button);

        // make the DOM button
        d = createButton('???');
        d.parent('container');
        f = resolveClick(button);
        d.mousePressed(f);
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      case "githubButton":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = 'github';
        buttons.add(button);

        // make the DOM button
        d = createButton('GITHUB!');
        f = resolveClick(button);
        d.mousePressed(f);
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      case "aboutButton":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        // button.visible = false;
        button.id = 'about';
        buttons.add(button);

        // make the DOM button
        d = createButton('ABOUT!');
        f = resolveClick(button);
        d.mousePressed(f);
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      case "paypalButton":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = 'paypal';
        buttons.add(button);

        // make the DOM button
        d = createButton('PAYPAL!');
        f = resolveClick(button);
        d.mousePressed(f);
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      case "proj1Button":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = 'proj1';
        buttons.add(button);

        // make the DOM button
        d = createButton('FIRST');
        f = resolveClick(button);
        d.mousePressed(f);
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      case "proj2Button":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = 'proj2';
        buttons.add(button);

        // make the DOM button
        d = createButton('SECOND');
        f = resolveClick(button);
        d.mousePressed(f);
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      case "proj3Button":
        // collision
        button = createSprite(px,py, obj.width, obj.height);
        button.visible = false;
        button.id = 'proj3';
        buttons.add(button);

        // make the DOM button
        d = createButton('THIRD');
        f = resolveClick(button);
        d.mousePressed(f);
        d.parent('container');
        d.size(obj.width, obj.height);
        d.position(canvas.position().x + obj.x, canvas.position().y + obj.y);
        d.style('align-items: center; justify-content: center; display: flex');
        break;

      // no type => a wall, for now
      default:
        obstacle = createSprite(px,py, obj.width, obj.height);
        // obstacle.visible = false;
        obstacles.add(obstacle);
        break;
    }
  } 
}

function draw() {
  background(0,0,0,255);

  // console.log(player.position.x + " PLAY POS X");
  // console.log(player.position.y + " PLAY POS Y");

  // for some nebulous reason, the canvas origin moves when
  // the canvas is resized or a new one is made of a 
  // different size
  // i think it may be viewport related.
  // the translation is the difference in
  // width and height of changed and initial
  // canvases, divided by 2
  if (firstLevel != nm){
    translate((flWidth - curlWidth)/2, (flHeight-curlHeight)/2);
    // if (nm == "aboutLevel"){
    //   translate(-320, 576);
    // }
    // if (nm == "donateLevel"){
    //   translate(320, -576)
    // }
    // if (nm == "projectLevel"){
    //   translate(0,32);
    // }
  }

  if(keyDown(LEFT_ARROW)){
    player.velocity.x = -6.0;
  } else if (keyDown(RIGHT_ARROW)){
    player.velocity.x = 6.0;
  } else {
    player.velocity.x = 0;
  }
  if(keyWentDown('x')){
    if(canJump){
      player.velocity.y = JUMP;
    }
  }

  player.velocity.y += GRAVITY;
  if(Math.abs(player.velocity.y) >= 10){
    player.velocity.y *= 0.95;
  }

  // scroll based on player position
  // if they're moving
  // else let the user scroll freely
  canJump = (Math.abs(player.velocity.y) <= GRAVITY*2);
  if (Math.abs(player.velocity.x) >= 0.05 || !canJump) {
    window.scroll(player.position.x - window.innerWidth/2, player.position.y - window.innerHeight / 2);
  }

  player.collide(obstacles, resolvePlayerHit);
  player.collide(buttons, resolveButtonHit);

  // imageMode(CENTER);
  // image(bgTiles, 0, 0);

  drawSprites();
}

function clearLevel() {
  player.remove();
  obstacles.removeSprites();
  buttons.removeSprites();
  // go through all used HTML components
  // set their parent back to the body
  // and set their displays to 'none'
  var group = document.querySelectorAll("[page-group='true']");
  group.forEach( (section) => {
    section.style.display = "none";
    document.body.appendChild(section);
  });
  // now we can clear the dom
  var div = document.getElementById('container');
  while(div.firstChild){
    div.removeChild(div.firstChild);
  }
  clear();
}

function showAllProjectsButId(id){
  var group = document.querySelectorAll("[proj-group='true']");
  group.forEach( (section) => {
    if (section.id == id){
      section.style.display = "inline-block";
    } else {
      section.style.display = "none";
    }
  });
}
var resolveClick = function(button) {
  return () => {
    resolveButtonHit(player, button);
  }
}

function resolvePlayerHit(player, obs){
  // if there's x overlap, set velocity.y = 0 for player
  if  ((player.position.x + player.width/2 - 2 >= obs.position.x - obs.width/2)
    && (player.position.x - player.width/2 + 2 <= obs.position.x + obs.width/2)
    && (player.velocity.y >= -5)) {
    player.velocity.y = 0;
  }
}

function resolveButtonHit(player, button){
  if (button.id == "github"){
    clearLevel();
    window.location = "https://www.github.com/garrison0";
  }
  if (button.id == "paypal"){
    clearLevel();
    window.location.href = "https://www.paypal.me/moodmusic";
  }
  if (button.id == "donate"){
    clearLevel();
    firstTime = false;
    loadLevel("donateLevel");
  }
  if (button.id == "about"){
    clearLevel();
    firstTime = false;
    loadLevel("aboutLevel");
  }
  if (button.id == "secret"){
    //clearLevel();
  }
  if (button.id == "project"){
    clearLevel();
    firstTime = false;
    loadLevel("projectLevel");
  }

  // clear other projects
  // make this one visible
  // button.id = proj1, proj2, etc
  if (button.id.substring(0,4) == "proj"){
    showAllProjectsButId(button.id);
  }
}

var FALLING = ``+
  `
   \\o/ 
    |   
   / \\  
        
     _o 
     /\\ 
     |\\ 
        
       __\\o 
      /)  | 
            
        __| 
          \\o 
          ( \\ 
              
        \\ /   
         |    
        /o\\   
             
       |__    
      o/      
     / )      
              
   o/__       
   |  (\\     
              
  o_          
  /\\          
   /|          
              
    \\o/         
     |         
    / \\         
        
       o       
      /|\\    
      / \\     
        `; 
            