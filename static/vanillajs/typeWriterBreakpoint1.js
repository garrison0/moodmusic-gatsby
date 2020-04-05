/** 
    P5JS sketch to be used to render the type writer art demo in 'about' page of moodmusic
    - handles clicks to transition characters to new states 
    - loads correct set of states (in local file) depending breakpoint prop
    - agnostic to what the breakpoints are set at but expects sm, md, or lg

    an example of a STATE is as follows:
       {"c":"a","x":56,"y":298,"grayscale":0.9696426331154134,"opacity":0.75299738427883}

    where the character is "a"
    and the [x,y] correspond to it's position via top left pixel 

    each character in the text has an array of states that it linearly
    shuffles through on click events

    larger breakpoints just have files with larger arrays of states for each character
    implying more transitions and more interesting effects

    these are generated separated - see typeWriterBody.js and typeWriterStatesGenerator.js

    @param {'sm', 'md', 'lg'} breakpoint;
    @param {int} leftMargin left margin for the paragraphs of text (not the images) to start
*/

var CANVAS;
var LEFT_MARGIN = 56;
var RIGHT_MARGIN = 8;
var TOP_MARGIN = 36;
var BREAKPOINT = 'sm';
var FONT_SIZE = 14;
var TIME_TO_TRANSITON = 3; 
var TRANSITION_TIMER = 0;
var TRANSITIONING = false;
var dt = 0.01;
var CHAR_POSITIONS;

function preload() {
    // depending on breakpoint, grab correct set of character states
    p5font = loadFont('fonts/SourceSerifPro-Regular.ttf');
    const fileUrl = 'assets/typeWriterBreakpoint1.txt';

    fetch(fileUrl)
        .then( r => r.text() )
        .then( t => {
                    CHAR_POSITIONS = JSON.parse(t);
                    } );

    // 
}

function mouseClicked() { 
    // update characters
    if ( CHAR_POSITIONS ) {
        for (var i = 0; i < CHAR_POSITIONS.length; i++){
            let cur = CHAR_POSITIONS[i];
            cur.positionState = (cur.positionState + 1) % cur.positions.length;
        }
    }
}

function setup() {
    CANVAS = createCanvas(window.innerWidth, 2600, WEBGL);
    CANVAS.position(LEFT_MARGIN, 0);
    CANVAS.style('z-index', '-1');
    textFont(p5font);
	textAlign(LEFT);
	textSize(FONT_SIZE);
}

function draw() {
    clear();
    // update/draw every character at currentPosition
    if ( CHAR_POSITIONS ) {
        for (var i = 0; i < CHAR_POSITIONS.length; i++){
            let cur = CHAR_POSITIONS[i];
            let value = (cur.currentGrayscale) * 255;
            fill(value,value,value,cur.currentOpacity * 255);
            text(cur.c, cur.currentPosition.x, TOP_MARGIN + cur.currentPosition.y);

            //always walk towards position/opacity/vel matching state
            let currentPosition = cur.currentPosition;
            let goalPosition = cur.positions[cur.positionState];
            // if more than a pixel away on either axis, move towards goal
            // todo: use vectors like a normal person
            let x_diff = currentPosition.x - goalPosition.x;
            let x_vel = Math.min(Math.abs(x_diff), 240 * 1/60);
            if ( Math.abs(x_diff) > 0 ) {
                x_diff > 0 ? cur.currentPosition.x -= x_vel : cur.currentPosition.x += x_vel;
            }
            let y_diff = currentPosition.y - goalPosition.y;
            let y_vel = Math.min(Math.abs(y_diff), 800 * 1/200);
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
        }
    }
    // text(selfstory, LEFT_MARGIN, 0, CANVAS.width - LEFT_MARGIN - RIGHT_MARGIN, CANVAS.height);
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