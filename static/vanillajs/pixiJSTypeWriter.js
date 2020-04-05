const loader = PIXI.Loader.shared;
const LEFT_MARGIN = 68;
const BP1_HEIGHT = 2600;

//Create a Pixi Application
let app = new PIXI.Application({                   
    transparent: true, 
    resolution: 1
  }
);
document.body.appendChild(app.view);
var characterPositions;

// make pixi full screen
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, BP1_HEIGHT);

//load the character positions and run the `setup` function when it's done
loader
  .add('characterPositions', 'assets/typeWriterBreakpoint1.txt');

loader.load(setup);

function setup(loader, resources) {
  let style = new PIXI.TextStyle({
    fontFamily: "Source Serif Pro",
    fontSize: 14,
    fill: 'black'
  });
  characterPositions = JSON.parse(resources.characterPositions.data);
  for (var i = 0; i < characterPositions.length; i++) {
    let char = characterPositions[i];
    let text = new PIXI.Text(char.c, style);
    text.position.set(char.currentPosition.x + LEFT_MARGIN, char.currentPosition.y);
    app.stage.addChild(text); 
    char['pixiText'] = text;
  }
}

//Set the game state
state = transition;

//add controls
document.body.addEventListener("click", function() {
  if (characterPositions) {
    for (var i = 0; i < characterPositions.length; i++){
      let cur = characterPositions[i];
      cur.positionState = (cur.positionState + 1) % cur.positions.length;
    }
  }
});

//Start the game loop 
app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta){
  //Update the current game state:
  state(delta);
}

function transition(delta) { 
  //advance towards goal positions/opacities/etc
  if (characterPositions) {
    for (var i = 0; i < characterPositions.length; i++){
      let cur = characterPositions[i];
  
      //always walk towards position/opacity/vel matching state
      let currentPosition = cur.currentPosition;
      let goalPosition = cur.positions[cur.positionState];
      // if more than a pixel away on either axis, move towards goal
      // todo: use vectors like a normal person
      let x_diff = currentPosition.x - goalPosition.x;
      let x_vel = Math.min(Math.abs(x_diff), 0.8 * delta * (1 - currentPosition.y / 2600));
      if ( Math.abs(x_diff) > 0 ) {
          x_diff > 0 ? cur.currentPosition.x -= x_vel : cur.currentPosition.x += x_vel;
      }
      let y_diff = currentPosition.y - goalPosition.y;
      let y_vel = Math.min(Math.abs(y_diff), 5 * delta);
      if ( Math.abs(y_diff) > 0 ) {
          y_diff > 0 ? cur.currentPosition.y -= y_vel : cur.currentPosition.y += y_vel;
      }
      let opacity_diff = cur.currentOpacity - cur.opacities[cur.positionState];
      let opacity_vel = Math.min(Math.abs(opacity_diff), 1/30)
      if ( Math.abs(opacity_diff) > 0.001 ) { 
          opacity_diff > 0 ? cur.currentOpacity -= opacity_vel : cur.currentOpacity += opacity_vel;
      }
      let grayscale_diff = cur.currentGrayscale - cur.grayscale[cur.positionState];
      let grayscale_vel = Math.min(Math.abs(grayscale_diff), 1/30)
      if ( Math.abs(grayscale_diff) > 0.001 ) { 
          grayscale_diff > 0 ? cur.currentGrayscale -= grayscale_vel : cur.currentGrayscale += grayscale_vel;
      }
  
      cur.pixiText.position.set(cur.currentPosition.x + LEFT_MARGIN, cur.currentPosition.y);
      cur.pixiText.style.opacity = cur.currentOpacity;
    }
  }
}

function doNothing(delta) {

  //check 
}