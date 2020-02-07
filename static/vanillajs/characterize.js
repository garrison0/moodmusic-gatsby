var resDict = [];
/* pairLetters: object array -> object array

  pairs letters in the image pos array
  with letters in the <p> tags
  and returns a list of dicts
  {sp_unique_identifier: {character, opacity, image_x, image_y, paragraph_x, paragraph_y, current_state}, sp_unique_identifier_2: {…}, …} 
  where sp_unique_identifier is an id for each <span> tag
  each character is written in

  corresponding puts each letter in a <span> tag
  and makes its parent the parent of the original <p> tags
*/
function pairLetters(imagePositions){
  var range = document.createRange();
  var elts = document.getElementsByClassName('characters');
  var id = 0;

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
          resDict[id] = {'c': letter, 'opacity': char.opacity,
                        'image_x': char.x + 100, 'image_y': char.y,
                        'paragraph_x': r.left - offsets.left, 'paragraph_y': r.top - offsets.top,
                        'DOM_element': sp, 'grayscale': char.grayscale,
                        'positionState': "paragraph"};
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
}

// since this event is NOT mobile friendly,
// it is a simple way of making sure
// the transition never happens on mobile
var parent = document.getElementById('parent');
parent.addEventListener('mouseenter', () => {
  changePositions();
});

// for mouse over event:
// flip state and change positions accordingly
// for each character in resDict
function changePositions(){
  console.log('dun it!');
  for (var i = 0; i < resDict.length; i++){
    let elem = resDict[i];
    let sp = elem.DOM_element;
    if (elem.positionState == "paragraph"){
      // change to image 
      sp.style.left = elem.image_x + 'px';
      sp.style.top = elem.image_y + 'px';
      // sp.style.opacity = elem.opacity;
      // let gs = 255 - (255 * elem.grayscale);
      // sp.style.color = "rgb(" + gs + "," + gs + "," + gs + ")";
      elem.positionState = "image";
    } else {
      // change to paragraph
      sp.style.opacity = 255;
      sp.style.color = "rgb(0,0,0)";
      sp.style.left = elem.paragraph_x;
      sp.style.top = elem.paragraph_y;
      elem.positionState = "paragraph";
    }
  }
}

const fileUrl = 'assets/gokb2.txt';

fetch(fileUrl)
   .then( r => r.text() )
   .then( t => {
                  var imagePositions = JSON.parse(t);
                  pairLetters(imagePositions);

                } );