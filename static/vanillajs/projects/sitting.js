
var didntstart = true;
var gotfile = false;
var bufferLength;
var dataArray;
var audioContext;

async function getFile(audioContext, filepath) {
  if (!gotfile) {
    const response = await fetch(filepath, {mode: 'no-cors'});
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  } else {
    // use what user has selected via the file input
    var file = URL.createObjectURL(document.getElementById("source").files[0]);
    const response = await fetch(file, {mode: 'no-cors'});
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }
}

async function getIR(audioContext, filepath) {
  const response = await fetch(filepath, {mode: 'no-cors'});
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function setupSample() {
    const sample = await getFile(audioContext, 'songs.wav');
    return sample; 
}

async function setupIR() {
    const filePath = 'ir.wav';
    const sample = await getFile(audioContext, filePath);
    return sample;
}

var nIterations = 0;
document.getElementById('play').onclick = () => {
  // set up audio stuff, make the convolved sample, play it
  if (didntstart == true) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    didntstart = false;
  }
  setupIR().then((ir) => {
    setupSample().then((sample) => {
      const sampleSource = audioContext.createBufferSource();
      var convolver = audioContext.createConvolver();
      
      var compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-60, audioContext.currentTime);
      compressor.knee.setValueAtTime(40, audioContext.currentTime);
      compressor.ratio.setValueAtTime(30, audioContext.currentTime);
      compressor.attack.setValueAtTime(0, audioContext.currentTime);
      compressor.release.setValueAtTime(0.25, audioContext.currentTime);

      var wetgain = audioContext.createGain();
      var initgain = audioContext.createGain();
      // var drygain = audioContext.createGain();
      wetgain.gain.setValueAtTime(1.0, audioContext.currentTime);
      initgain.gain.setValueAtTime(0.08, audioContext.currentTime);
      // drygain.gain.setValueAtTime(1.0 - ((1 / 15) * nIterations), audioContext.currentTime);

      sampleSource.buffer = sample;
      convolver.buffer = ir;

      if (nIterations >= 1) {

        // at least compress the first thing
        sampleSource.connect(initgain);
        initgain.connect(convolver);
        convolver.connect(compressor);
        compressor.connect(wetgain);

        for (var i = 1; i < nIterations; i++){

          var new_convolver = audioContext.createConvolver();
          var new_wetgain = audioContext.createGain();
          new_wetgain.gain.setValueAtTime((Math.max(0.5, 0.9 - (0.05 * i))), audioContext.currentTime);
          new_convolver.buffer = ir;

          wetgain.connect(new_convolver);
          new_convolver.connect(new_wetgain);
          wetgain = new_wetgain
        }

        var final_compressor = audioContext.createDynamicsCompressor();
        final_compressor.threshold.setValueAtTime(-10, audioContext.currentTime);
        final_compressor.knee.setValueAtTime(10, audioContext.currentTime);
        final_compressor.ratio.setValueAtTime(10, audioContext.currentTime);
        final_compressor.attack.setValueAtTime(0, audioContext.currentTime);
        final_compressor.release.setValueAtTime(0.75, audioContext.currentTime);

        wetgain.connect(final_compressor);
        // final_compressor.connect(audioContext.destination);
        final_compressor.connect(audioContext.destination);

      } else { 
        sampleSource.connect(audioContext.destination);
      }

      sampleSource.start();
    });
  });
};

document.getElementById("source").onchange = () => {
  gotfile = true;
}

function tick() {
  nIterations = document.getElementById("sliderGetVal").value;
  document.getElementById('sliderDisplayVal').innerHTML = "Number of iterations chosen: " + nIterations;
  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
