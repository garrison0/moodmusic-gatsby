var resDict = [];
/* pairLetters: object array -> object array

  pairs letters in the image pos array
  with letters in the <p> tags
  and returns a list of dicts
  {sp_unique_identifier: {character, opacity, image_x, image_y, paragraph_x, paragraph_y, current_state}, sp_unique_identifier_2: {…}, …} 
  where sp_unique_identifier is an id for each <span> tag
  each character is written in

  correspondingly puts each letter in a <span> tag
  and makes its parent the parent of the original <p> tags
*/
function pairLetters(imagePositions, bp2CombinedPositions){
  var range = document.createRange();
  var elts = document.getElementsByClassName('characters');
  var id = 0;

  // these positions go from img, to text, to flying out of screen, and staying for 1 round
  console.log(imagePositions.length);
  for(var i = 0; i < elts.length; i++){
    let elem = elts[i];
    var parent = elem.parentElement;
    var offsets = parent.getBoundingClientRect();
    var letters = elem.textContent;
    var start = 0; 
    var end = 0;

    
    for (var j = 0; j < letters.length; j++) {
      var letter = letters[j];
      end = start+1;
      // console.log(letters);
      // console.log(j);
      range.setStart(elem.firstChild, start);
      range.setEnd(elem.firstChild, end);
      var r = range.getClientRects()[0];
      // console.log(r.top + " left: " + r.left);

      var k = 0;
      while (k < imagePositions.length){
        var char = imagePositions[k];
        // same character, 'a', 'b', etc.
        // console.log(char.c)
        // console.log(letter);
        if (char.c === letter){
          // make span tag
          var sp = document.createElement("SPAN");
          sp.textContent = letter;
          sp.style.position = 'absolute';
          sp.style.left = r.left - offsets.left;
          sp.style.top = r.top - offsets.top;
          sp.style.opacity = 255;
          sp.style.color = "rgb(0,0,0)";
          sp.style.WebkitTransition = 'all 1.0s ease-out';
          
          // append it to the DOM parent of the original text
          parent.appendChild(sp);

          // console.log(char.x + " Y POS " + char.y);
          // add everything to result dictionary
          let offscreen_x = Math.random() * window.innerWidth;
          let offscreen_y = Math.random() < 0.5 ? -24 : window.innerHeight + 24
          resDict[id] = {'c': letter, 
                        'currentPosition': {'x': char.x, 'y': char.y},
                        'currentOpacity': char.opacity,
                        'currentGrayscale': char.grayscale,
                        'opacities': [char.opacity, 1, 0, 0],
                        'positions': [{'x': char.x, 'y': char.y}, 
                                      {'x': 200 + r.left - offsets.left, 'y': 660 + r.top - offsets.top},
                                      {'x': offscreen_x, 'y': offscreen_y},
                                      {'x': offscreen_x, 'y': offscreen_y}], 
                        'grayscale': [char.grayscale, 1, 0, 0],
                        'positionState': 0};
          id++;

          // remove kth element from imagePositions
          imagePositions.splice(k, 1);
          break;
        }
        k++;
      }
      start = end;
    }
    // remove original <p>
    // elem.remove();
    elem.style.visibility = 'hidden';
  }

  console.log(imagePositions.length);
  // there are more positions image that match to bp2 image! 
  // these positions go from bp3 image, to bp2 image, to bp2 text + bp1 img, etc
  var k = 0;
  while (k < imagePositions.length){
    var char = imagePositions[k];
    var j = 0;
    while (j < bp2CombinedPositions.length){
      var char2 = bp2CombinedPositions[j];
      if (char2.c === char.c){
        // add everything to result dictionary
        resDict[id] = {'c': char.c, 
                      'currentPosition': {'x': char.x, 'y': char.y},
                      'currentOpacity': char.opacity,
                      'currentGrayscale': char.grayscale,
                      'opacities': [char.opacity, char2.opacities[0], char2.opacities[1], char2.opacities[2]],
                      'positions': [{'x': char.x, 'y': char.y}, 
                                    {'x': 126 + char2.positions[0].x, 'y': char2.positions[0].y},
                                    {'x': 134 + char2.positions[1].x, 'y': 48 + char2.positions[1].y},
                                    {'x': 212 + char2.positions[2].x, 'y': char2.positions[2].y}],
                      'grayscale': [char.grayscale, char2.grayscale[0], char2.grayscale[1], char2.grayscale[2]],
                      'positionState': 0};
        id++;

        // remove jth element 
        bp2CombinedPositions.splice(j, 1);
        break;
      }
      j++;
    }
    k++;
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

const fileUrl = 'bp3CleanImage.txt';
const bp2FileUrl = 'bp2Combined.txt';
fetch(fileUrl)
   .then( r => r.text() )
   .then( t => {
        // get bp1 image
        fetch (bp2FileUrl) 
          .then( r2 => r2.text() )
          .then (t2 => { 
            var imagePositions = JSON.parse(t);
            var bp2CombinedPos = JSON.parse(t2);
            pairLetters(imagePositions, bp2CombinedPos);
        });
      }
   );
                  

              