


// computação visual

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Y-lDRVXS-/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}


// function setup() {
//   createCanvas(320, 260);
//   // Create the video
//   video = createCapture(VIDEO);
//   video.size(320, 240);
//   video.hide();

//   flippedVideo = ml5.flipImage(video);
//   // Start classifying
//   classifyVideo();
//   // tudo isso aqui vai ser a tentativa de deixar a imagem da webcam centralizada
//     const webcam = document.getElementById("defaultCanvas0");
//     const divwebcam = document.getElementById("divwebcam");
//     divwebcam.appendChild(webcam);
// }

// function draw() {
//   background(0);
//   // Draw the video
//   image(flippedVideo, 0, 0);

//   // Draw the label
//   fill(255);
//   textSize(16);
//   textAlign(CENTER);
//   text(label, width / 2, height - 4);
// }

// // Get a prediction for the current video frame
// function classifyVideo() {
//   flippedVideo = ml5.flipImage(video)
//   classifier.classify(flippedVideo, gotResult);
//   flippedVideo.remove();

// }

// ... (seu código anterior)


function setup() {
    createCanvas(320, 260);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();
  
    flippedVideo = ml5.flipImage(video);
  
    const webcam = document.getElementById("defaultCanvas0");
    const divwebcam = document.getElementById("divwebcam");
    divwebcam.appendChild(webcam);
  
    classifyVideo();
  }
  
  function draw() {
    background(0);
    image(flippedVideo, 0, 0);
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }
  
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }
  
  // ... (seu código anterior)
  

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}


// início do jogo
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
let pontuacao = 0;
let contando_pontos = true;
const scores = document.getElementById("scores")
const jump = ()=>{
    mario.classList.add("jump");
    setTimeout(()=>{
        mario.classList.remove("jump");
    },500)
}

const loop = setInterval(()=>{
    if(label=="pular"){
        jump();
    }
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','') // p mais na frente converte a string em numérico
    console.log(marioPosition)
    if(pipePosition<=120&& pipePosition>0 && marioPosition<80){
        
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = "none";
        mario.style.bottom= `${marioPosition}px`

        mario.src="./imagens/game-over.png";
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        contando_pontos = false;
        alert("Perdeu, otário!!! Pontuação: " + pontuacao);
        
        clearInterval(loop);//faz com que a função loop pare de ser executada, ou seja, anula o setInterval
        window.location.reload();
    }

    if (pipePosition < 50&&contando_pontos) {
        pontuacao = pontuacao+5;
        scores.innerHTML = "Pontos: "+pontuacao;
      }
},10);

//document.addEventListener("keydown",jump);