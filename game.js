// Iteration 1: Declare variables required for this game
// Iteration 1.2: Add shotgun sound
// Iteration 1.3: Add background sound
// Iteration 1.4: Add lives
// Iteration 2: Write a function to make a zombie
// Iteration 3: Write a function to check if the player missed a zombie
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
// Iteration 5: Creating timer
// Iteration 6: Write a code to start the game by calling the first zombie
// Iteration 7: Write the helper function to get random integer

let $game=document.getElementById("game-body")
let $overallTtimer = document.getElementById("timer");
let $zombie;

let killSound=new Audio("assets/shotgun.wav")
let bgm = new Audio("assets/bgm.mp3");
bgm.play()
bgm.addEventListener("ended",()=>{
    bgm.play();
})

let minusLife = () => {
    lives--;
    $game.removeChild($zombie);
    document.getElementById("life-count").innerText = lives;
    addZombie();
};
let lifeTimer;
let lives = 5;
let overallTime=60;
let killCount=0;

addZombie()
function addZombie(){
    if(lives>0){
        let position=Math.round(Math.random()*85)
        let id = Math.floor(Math.random() * 6)+1;
        let time=Math.floor(Math.random() * 3)+3;
        resetTimer(time)
        // console.log({time})
        $zombie = document.createElement("img");
        $zombie.setAttribute("src", `assets/zombie-${id}.png`);
        $zombie.classList.add("zombie-image");
        $zombie.style.right=`${position}vw`
        $zombie.style.animationDuration=`${time}s`
        $zombie.onclick = () => {
            $game.removeChild($zombie);
            newKill()
        };
        $game.append($zombie);
    } 
    else{
        window.location.href = "game-over.html";
    }
}

function newKill(){
    killSound.pause();
    killSound.currentTime = 0;
    killSound.play();
    killCount++;
    document.getElementById("kill-count").innerText=killCount;
    addZombie();
}

function declareWin(){
    sessionStorage.setItem("score",killCount)
    window.location.href = "win.html";
}

function resetTimer(time){
    clearTimeout(lifeTimer);
    lifeTimer = setTimeout(minusLife, time*1000);
}

let mainTimer=setInterval(()=>{
    if(overallTime>0){
        overallTime--;
        $overallTtimer.innerText=overallTime;
    }
    else{
        declareWin();
    }
},1000)


