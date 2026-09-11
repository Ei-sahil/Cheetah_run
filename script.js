let player = document.querySelector(".player");
let playerimg=document.querySelector("#playerimg");
let highestscore=document.querySelector("#highscore");
let savedscore=localStorage.getItem("highestscore");
let background=document.querySelector(".background");
let eagle=document.querySelector(".air_obs")
let eagleimg = document.querySelector("#eagle");

if (savedscore !== null) {
    highestscore.textContent = savedscore;
}

let frame=[
    "img/frame1.png",
    "img/frame2.png",
    "img/frame3.png",
    "img/frame4.png"
];
let currentFrame = 0;

setInterval(function() {

    if(gameEnd){
        return;
    }

    playerimg.src = frame[currentFrame];

    currentFrame++;

    if (currentFrame === frame.length) {
        currentFrame = 0;
    }

}, 100);

let frame2=[
    "img/air_obs1.png",
    "img/air_obs2.png",
    "img/air_obs3.png"
];

let currentframe2=0;

setInterval(function(){
    if(gameEnd){
        return;
    }
    eagleimg.src=frame2[currentframe2];
    currentframe2++;

    if(currentframe2===frame2.length){
        currentframe2=0
    }

}, 100);



let jumping=false;

document.addEventListener("keydown", function(event) {

    if (event.code === "Space" && !jumping) {
        jumping =true;

        player.classList.add("jump");

        setTimeout(function() {
            player.classList.remove("jump");
            jumping=false;
        }, 600);

    }

});

let obstacle=document.querySelector(".obs");

let gameover=document.querySelector(".game_over");
let finalscore=document.querySelector("#finalscore")
let gameEnd=false;
let score=0;
let scorecnt=document.querySelector("#scorecnt");
let obstaclePosition=100;
let eagleposition=150;
let homescreen=document.querySelector(".home_screen");
let gamearea=document.querySelector(".game_area");
let play=document.querySelector("#play");
let easy = document.querySelector("#easy");
let hard = document.querySelector("#hard");

play.addEventListener("click",function(){
    homescreen.style.display="none";
    gamearea.style.display="block";

    startgame();
})

function startgame(){ 
    moveObstacle();
    checkcollision();
    updatescore();
    moveBackground();
}


function moveObstacle(){
    if(gameEnd){
        return;
    }
    obstaclePosition-=0.5;
    obstacle.style.left=obstaclePosition+"%";
    if(obstaclePosition<-10){
        obstaclePosition=100;

        let ramdomindex=Math.floor(Math.random()*obstacleimages.length);
        obstacle.querySelector("img").src=obstacleimages[ramdomindex];
        
    }
    requestAnimationFrame(moveObstacle);
}

function moveEagle(){
    if(gameEnd){
        return;
    }
    if(!eagleActive){
        return;
    }

    eagleposition-=0.7 ;
    eagle.style.left=eagleposition +"%";
    if( eagleposition < -10){
        eagleposition = 150;
        eagleActive=false;
    }
    requestAnimationFrame(moveEagle);
}

function checkcollision(){
    if(gameEnd){
        return;
    }
    let playerRect=player.getBoundingClientRect();
    let obstacleRect=obstacle.getBoundingClientRect();
    let eagleRect = eagle.getBoundingClientRect();

    let groundCollision =
    playerRect.left + 20 < obstacleRect.right &&
    playerRect.right > obstacleRect.left + 10 &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top;

    let airCollision =
    playerRect.left + 20 < eagleRect.right &&
    playerRect.right > eagleRect.left + 10 &&
    playerRect.top < eagleRect.bottom &&
    playerRect.bottom > eagleRect.top;

    if(groundCollision || airCollision){
        gameEnd=true;
        finalscore.textContent=score;
        gameover.style.display="block";
        gamearea.style.display="none";
        if(Number(highestscore.textContent)<score){
            highestscore.textContent=score;
            localStorage.setItem("highestscore",score)
        }
    }
    requestAnimationFrame(checkcollision);
}


function updatescore(){
    if(gameEnd){
        return;
    }
    score++;
    scorecnt.textContent="Your score:"+score;
    setTimeout(updatescore,100);
}


let restart = document.querySelector("#restart");

restart.addEventListener("click", function() {
    location.reload();
});

let backgroundPosition = 0;

let backgroundCycles = 0;

let backgrounds = [
    "img/Evening.png",
    "img/Night.png",
    "img/Morning.png"
];

let backgroundIndex = 0;
let eagleFrequency = 6;
let eagleActive=false;
easy.addEventListener("click", function(){

    eagleFrequency = 6;

});
hard.addEventListener("click", function(){

    eagleFrequency = 2;

});

function moveBackground(){
    if(gameEnd){
        return;
    }

    backgroundPosition -= 0.5;
    background.style.left = backgroundPosition + "%";

    if(backgroundPosition <= -100){
        backgroundPosition = 0;
        backgroundCycles++;
        if(backgroundCycles % eagleFrequency === 0){
            eagleposition=150;
            eagleActive=true;
            moveEagle();
        }

        if(backgroundCycles % 6 === 0){
            backgroundIndex++;

            if(backgroundIndex === backgrounds.length){
                backgroundIndex = 0;
            }

            background.style.backgroundImage =
                `url("${backgrounds[backgroundIndex]}")`;
        }
    }

    requestAnimationFrame(moveBackground);
}

//Adding Obstacles

let obstacleimages=[
    "img/obs_bigrock.png",
    "img/obs_cac1.png",
    "img/obs_cac2.png",
    "img/obs_cac3.png",
    "img/obs_log.png",
    "img/obs_pool.png",
    "img/obs_rocks.png",
    "img/obs_skeleton.png"
];