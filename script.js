// CSSI Day 13/14: CYOA, ML emojis
// Made following the tutorial here: https://www.youtube.com/watch?v=kwcillcWOg0

/*
global createCanvas, background, image, createCapture, VIDEO, ml5, classify, textSize, textAlign, text, CENTER, fill
*/

// Video
let video, classifier;
let label = "waiting...";
let emoji = "awaiting data.."

let mode = "https://teachablemachine.withgoogle.com/models/lLipGVG63/";
// STEP 1: Load the model!
// Preload will load any important assets
function preload() {
  classifier = ml5.imageClassifier(mode + "model.json");
}

function setup() {
  createCanvas(800, 240);
  // Connect to the campture device
  video = createCapture(VIDEO);
  video.size(320, 420);
  video.hide();

  // STEP 2: Start classifying
  //   Classify the video here
  classifyVideo();
}

// STEP 2 classify!

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  fill("white");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("ML Image Classifier:", 500, 40)
  text(label, 450, 200);
  text(emoji, 450,150)

  if (label == "iPhone") {
    emoji = "📱";
  } else if (label == "Water") {
    emoji = "🥤";
  }
  else if (label == "Napkin") {
    emoji = "📰";
  }
  else if (label == "Background") {
    emoji = "🧱";
  }
}

function classifyVideo() {
  //   Javascript handles things asynchronously.
  //   GotResult is a callback parameter to get the results of the classifier
  classifier.classify(video, gotResult);
}

// STEP 3: Get the classification!
// When we get the result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
