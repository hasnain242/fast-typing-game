const word = document.getElementById("word");
const userword = document.getElementById("user-word");
const scoreelement = document.getElementById("score");
const timerelement = document.getElementById("time");
const settingbtn = document.getElementById("settings-btn");
const settingcon = document.getElementById("setting");
const settingsform = document.getElementById("form");
const difficultydrop = document.getElementById("difficulty");
const gameovercon = document.getElementById("game-over-con");
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty')  !== null ? localStorage.getItem('difficulty') : 'easy';
difficultydrop.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';
function randomword() {
  fetch("https://random-word.ryanrk.com/api/en/word/random/?maxlength=3")
    .then((res) => res.json())
    .then((data) => {
      word.innerHTML = data;
      randomWord = word.innerText;
    });
}

userword.focus();
function incrementscore() {
  score++;
  scoreelement.innerHTML = score;
}
const timerinterval = setInterval(decrementtimer, 1000);
function decrementtimer() {
  time--;
  timerelement.innerHTML = time;
  if(time===0){
    clearInterval(timerinterval)
    gameover()
  }
}
function gameover(){
   gameovercon.style.display='flex'
   gameovercon.innerHTML=`
   <h1>time up!</h1>
   <p>good game your score is: ${score}</p>
   <button onclick="location.reload()">play again</button>
   `
}
userword.addEventListener("input", (e) => {
  const userinput = e.target.value;
  if (userinput === randomWord) {
    randomword();
    incrementscore();
    e.target.value = "";
    if(difficulty==='easy'){
     time=10;
        
    }else if(difficulty==='medium'){
        time=6
    }else{
        time=4
    }
    timerelement.innerHTML=time;
  }
});
settingbtn.addEventListener('click',()=>settingcon.classList.toggle('hide'))
difficultydrop.addEventListener('change',e=>{
difficulty=e.target.value;
localStorage.setItem('difficulty',difficulty)
})
randomword();
