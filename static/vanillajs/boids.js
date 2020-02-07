// Copyright 2010 Ben Perry.  You may freely copy, modify, or distribute this code, but this 
// copright notice must stay intact.
//
// Author's note: this was just a simple test to see how ready html5 is.  As of August 2010,
// Firefox really struggles to handle just 25 boids, internet explorer doesn't support html5, 
// Chrome does fairly well up to about 500 boids.  No idea about safari yet.  In comparison,
// my java version can support over 10,000 boids.

/**
 * Contains all globals for this program.
 */
var BoidGlobals = {
	/** The total number of boids in the simulation */
	BOID_COUNT: 12000,
	
	/** The collection of boids */
	boids: new Array(),
	
	/** Global vector for optimization.  Used instead of creating a new vector over and over. */
	tempVector: new Vector(),
	
	/** Second global vector for optimziation. */
	tempVector2: new Vector(),
	
	/** Size of the canvas where the boids will try to stay in-bounds. */
	SCREEN_WIDTH: 100 ,
	SCREEN_HEIGHT: 100, 
	
	/** The amount of distance boids like to keep between themselves. */
	ELBOW_ROOM: 2, 
	
	/** How often we update */
	TIMER_FREQUENCY: 30, 
	
	/** The amount we add or subtract if a boid is out of bounds */
	EDGE_AVOIDANCE: 1,
	
	/** The maximum velocity in any axis a boid is allowed to travel. */
	MAX_VELOCITY: 5, 
	
	/** Stored location for mouse.  Boids will move towards mouse if it is close enough. */
	mousePosition: null,
	
	/** How close a boid needs to be to the mouse before it's drawn to it. */
	MOUSE_ATTRACT_DISTANCE: 500
}
	
var canvas=document.getElementById('g');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

BoidGlobals.SCREEN_WIDTH = canvas.width;
BoidGlobals.SCREEN_HEIGHT = canvas.height;


for (var i=0; i < BoidGlobals.BOID_COUNT; i++){
	BoidGlobals.boids[i] = new Boid();
}

var handle = setInterval(update, BoidGlobals.TIMER_FREQUENCY);

/**
 * Contains standard vector operations for any dimensions, though we're really
 * only using two dimensions and should probably optimize out most of the 
 * flexibility since some browsers could use every bit of optimization.
 */
function Vector(){
	/** Data.  Apologies for one-letter variable name. */
	this.d = new Array(2);
	
	/** Nubmer of dimensions.  These boids are only 2D. */
	this.dimensions = 2;
	
	this.d[0] = 0;
	this.d[1] = 0;

	/** 
	 * Vector addition.  Adds the vector to current vector permanently.
	 * @param aVector (Vector) - the vector to add.
	 */
	this.add = function (aVector){
		for (var i = 0; i < this.dimensions; i++){
			this.d[i] += aVector.d[i];
		}
	};
	
	/**
	 * Copies the given vector into our own values.
	 * @param aVector (double) - the vector to copy from.
	 */
	this.copyFrom = function(aVector){
		for (var i = 0; i < this.dimensions; i++){
			this.d[i] = aVector.d[i];
		}
	};
	
	/**
	 * Multiplies all values in our vector by the given scalar.
	 * @param aScalar (double) - the scalar to multiply by.
	 */
	this.scalarMultiply = function(aScalar){
		for (var i = 0; i < this.dimensions; i++){
			this.d[i] *= aScalar;
		}			
	};
	
	/**
	 * Divides all values in our vector by the given scalar.
	 * @param aScalar - the scalar to divide by.
	 */
	this.scalarDivide = function(aScalar){
		for (var i = 0; i < this.dimensions; i++){
			this.d[i] /= aScalar;
		}			
	};
	
	/**
	 * Vector subtraction.  Subtracts the given vector from our own.
	 * @param aVector - the vector to subtract from.
	 */
	this.subtract = function(aVector){
		for (var i = 0; i < this.dimensions; i++){
			this.d[i] -= aVector.d[i];
		}
	};
	
	/** 
	 * Zeros out the data.
	 */
	this.zero = function(){
		for (var i = 0; i < this.dimensions; i++){
			this.d[i] = 0;
		}
	}
	
	/**
	 * Rather than subtracting the values from our vector, this method
	 * will return a vector with the difference.  Important note: the
	 * vector returned is really a global variable in disguise for 
	 * optimization purposes.  If you intend to make multiple calls to 
	 * difference and you wish to retain earlier values to this call, make 
	 * sure to create a new vector with the data.
	 
	 * @param aVector (Vector) - the vector to subtract from.
	 * @return Vector - the resultant difference.
	 */
	this.difference = function(aVector){
		for (var i = 0; i < this.dimensions; i++){
			BoidGlobals.tempVector.d[i] = this.d[i] - aVector.d[i];
		}
		return BoidGlobals.tempVector;
	};
	
	/**
	 * This will proportionally limit the values in the vector to the given
	 * limit.  For example, if the vector was (25, 50) and the limit was 10, 
	 * the resultant vector would be (5, 10).
	 * @param lim - the limit.
	 */
	this.limit = function(aLimit){
	   var max = Math.max(Math.abs(this.d[0]), Math.abs(this.d[1]));
	   for (var i = 2; i < this.dimensions; i++){
			max = Math.max(max, Math.abs(this.d[i]));
	   }
	   
	   if(max <= aLimit) return;
	   this.scalarMultiply(aLimit/max);
	};
}

/**
 * This contains the main information for each individual boid.
 */
function Boid(){
	/** The cartisian coordinate for the boid. */
	this.position = new Vector();
	
	/** The velocity vector for the boid. */
	this.velocity = new Vector();

	/** Position the void randomly within the screen's bounds. */
	this.position.d[0] = Math.random() * BoidGlobals.SCREEN_WIDTH;
	this.position.d[1] = Math.random() * BoidGlobals.SCREEN_HEIGHT;
	
	/** Set the boid's speed to a random direction. */
	this.velocity.d[0] = BoidGlobals.MAX_VELOCITY - Math.random() * 2 * BoidGlobals.MAX_VELOCITY;
	this.velocity.d[1] = BoidGlobals.MAX_VELOCITY - Math.random() * 2 * BoidGlobals.MAX_VELOCITY;
}

/**
 * Draws each boid
 */
function paint(){
	var canvas=document.getElementById('g');
	var context=canvas.getContext('2d');
	canvas.width = window.outerWidth;
	canvas.height = window.innerHeight;
	BoidGlobals.SCREEN_WIDTH = canvas.width + 200;
	BoidGlobals.SCREEN_HEIGHT = canvas.height;
	context.fillStyle='#111111';
	context.globalAlpha = 0.05;
	
	//context.clearRect(0,0,BoidGlobals.SCREEN_WIDTH, BoidGlobals.SCREEN_HEIGHT);

	
	for (var i = 0; i < BoidGlobals.BOID_COUNT; i++){
		
		context.fillRect(BoidGlobals.boids[i].position.d[0], BoidGlobals.boids[i].position.d[1], 11,11)

		// wtf html5?! five method calls and two helpings of pi to draw a circle?!?!?!?!?!?  no wonder
		// poor firefox chokes at 25 boids
	}
}


/**
 * Sums all of the boids' positions.  Doesn't average, just sums.
 * @return Vector - the vector containing the sum position.
 */
function calculateTotalCenter(){
	var sum = new Vector();
	for (var i = 0; i < BoidGlobals.BOID_COUNT; i++){
		sum.add(BoidGlobals.boids[i].position);
	}
	
	return sum;
}

/**
 * Sums all of the boids' velocities.  Doesn't average, just sums.
 * @return Vector - the vector containing the sum velocities
 */
function calculateTotalVelocity(){
	var velocity = new Vector();
	for (var i = 0; i < BoidGlobals.BOID_COUNT; i++){
		velocity.add(BoidGlobals.boids[i].velocity);
	}
	
	return velocity;
}


/** 
 * Main loop for moving all boids
 */
function moveBoids(){
	//var center = calculateTotalCenter();
	//var velocity = calculateTotalVelocity();
	for (var i = 0; i < BoidGlobals.BOID_COUNT; i++){
		// 10% of the time, move randomly.  adds some spice to the mix.
		if (Math.random() < 0.1){
			BoidGlobals.tempVector.d[0] = (BoidGlobals.MAX_VELOCITY / 5) - Math.random() * 2 * (BoidGlobals.MAX_VELOCITY / 5);
			BoidGlobals.tempVector.d[1] = (BoidGlobals.MAX_VELOCITY / 5) - Math.random() * 2 * (BoidGlobals.MAX_VELOCITY / 5);

			BoidGlobals.boids[i].velocity.add(BoidGlobals.tempVector);
		}
		else{
			
			if (BoidGlobals.mousePosition!= null && (Math.abs(BoidGlobals.boids[i].position.d[0] - BoidGlobals.mousePosition.d[0]) + Math.abs(BoidGlobals.boids[i].position.d[1] - BoidGlobals.mousePosition.d[1]) < BoidGlobals.MOUSE_ATTRACT_DISTANCE))
				BoidGlobals.boids[i].velocity.add(moveTowardsMouse(BoidGlobals.boids[i]));
			else 
				BoidGlobals.boids[i].velocity.add(stayInBounds(BoidGlobals.boids[i]));
		}
		
		// other rules here
		// other rules here
		// other rules here

		BoidGlobals.boids[i].velocity.limit(BoidGlobals.MAX_VELOCITY);
		BoidGlobals.boids[i].position.add(BoidGlobals.boids[i].velocity);
	}
}

/**
 * Velocity manipulation for steering boids within bounds.
 * @param boid (Boid) - the boid to steer
 * @return Vector - the adjustment vector
 */
function stayInBounds(boid){
	BoidGlobals.tempVector.zero();
	if (boid.position.d[0] < 0) BoidGlobals.tempVector.d[0] = BoidGlobals.EDGE_AVOIDANCE;
	else if (boid.position.d[0] > BoidGlobals.SCREEN_WIDTH) BoidGlobals.tempVector.d[0] = -BoidGlobals.EDGE_AVOIDANCE;
	
	if (boid.position.d[1] < 0) BoidGlobals.tempVector.d[1] = BoidGlobals.EDGE_AVOIDANCE;
	else if (boid.position.d[1] > BoidGlobals.SCREEN_HEIGHT) BoidGlobals.tempVector.d[1] = -BoidGlobals.EDGE_AVOIDANCE;
	
	return BoidGlobals.tempVector;
}

/**
 * Velocity manipulation for steering boids in the same direction everyone else is going.
 * @param boid (Boid) - the boid to steer
 * @param velocity (Vector) - the sum of all boids' velocities
 * @return Vector - the adjustment vector
 */
function matchNearNeighbors(boid, velocity){
	var perceivedVelocity = BoidGlobals.tempVector;
	perceivedVelocity.copyFrom(velocity);
	perceivedVelocity.subtract(boid.velocity);
	perceivedVelocity.scalarDivide(BoidGlobals.BOID_COUNT - 1);
	perceivedVelocity.subtract(boid.velocity);
	perceivedVelocity.scalarDivide(8);
	return perceivedVelocity;
}

/**
 * Velocity manipulation for steering boids to the same position everyone else is at.
 * @param boid (Boid) - the boid to steer
 * @param velocity (Vector) - the sum of all boids' positions
 * @return Vector - the adjustment vector
 */
function moveToAverage(boid, center){
	var perceivedCenter = BoidGlobals.tempVector;
	perceivedCenter.copyFrom(center);
	perceivedCenter.subtract(boid.position);
	perceivedCenter.scalarDivide(BoidGlobals.BOID_COUNT - 1);
	perceivedCenter.subtract(boid.position);
	perceivedCenter.scalarDivide(100);
	return perceivedCenter;
}

/**
 * If the boid is close enough to the mouse cursor, go ahead and move towards it.  This lets
 * the user control the boids to some extent.
 * @param boid - the boid to move.
 */
function moveTowardsMouse(boid){
	var distance = BoidGlobals.tempVector2;
	
	distance.copyFrom(BoidGlobals.mousePosition);
	distance.subtract(boid.position);
	distance.scalarDivide(50);
	
	return distance;
}

/**
 * Velocity manipulation for steering boids away from anyone too close.
 * This is where most of the time is spent since it is an order N^2 operation.  To alleviate 
 * that, it is advised to create a fine-grained 2D array and update bookkeeping on which
 * cell each boid is in as they move; then you would only have to check neighboring cells
 * instead of the entire flock.  It's still at worst N^2, but you can give up if there
 * are too many boids in the micro cell (just move randomly); this changes back to an 
 * order N.  This is probably why my java version can handle 10,000 boids but firefox
 * dies at 25.  There's no way I'm going to compute 10,000 * 10,000 positions each update!
 *
 * @param boid (Boid) - the boid to steer
 * @return Vector - the adjustment vector
 */
function avoidNearNeighbors(boid){
	//  to save time, using a global vector instead of creating a new one.
	var c = BoidGlobals.tempVector2; 
	c.zero();

	for (var i = 0; i < BoidGlobals.BOID_COUNT; i++){
		if (BoidGlobals.boids[i] == boid) continue;

		// cheating.. should calulate |a - b|.
		if (Math.abs(BoidGlobals.boids[i].position.d[0] - boid.position.d[0]) + Math.abs(BoidGlobals.boids[i].position.d[1] - boid.position.d[1]) < BoidGlobals.ELBOW_ROOM){
			c.subtract(BoidGlobals.boids[i].position.difference(boid.position));
		}
	}
	
	return c;
}

/**
 * main update method that will be invoked every timer tic.
 */
function update(){
	paint();
	moveBoids();
}

/**
 * Event handler for onmousemove
 * @param e (Event) - the mouse event
 */
