
const cardsArray=["akali", "akali","amumu", "amumu","annie", "annie", "brand", "brand", "ezreal","ezreal", "graves", "graves","jhin", "jhin","kalista","kalista", "senna", "senna", "zoe", "zoe"];

let cards=document.querySelectorAll("div");


cards=[...cards];

const startTime=new Date().getTime();

let activeCard="";
const activeCards=[];
const gamePairs=cards.length/2;
let gameResult=0;

function play() {
    let audio = document.getElementById("audio");
    audio.currentTime = 0;
    audio.play();
  }

  function correct() {
    let correct = document.getElementById("correct");
    correct.currentTime = 0;
    correct.play();
  }

  function wrong() {
    let wrong = document.getElementById("wrong");
    wrong.currentTime = 0;
    wrong.play();
  }

const clickedCard=function(){
activeCard=this;


if(activeCards[0]===activeCard) return;
activeCard.classList.remove("hidden");

if(activeCards.length===0){
    activeCards[0]=this;
    play();
    return;
}else {
    cards.forEach(card=>
    card.removeEventListener('click', clickedCard));
    activeCards[1]=this;
play();
setTimeout(function(){

    if(activeCards[0].className===activeCards[1].className){

        activeCards.forEach(card=>
        card.classList.add("off"));
        gameResult++;
        correct();
      cards=cards.filter(card=>
          !card.classList.contains('off')
          
      )
        if(gamePairs===gameResult){
        const endTime=new Date().getTime();
        const gameTime=(endTime-startTime)/1000;
            alert(`koniec gry. Twój wynik to ${gameTime} sekund! i wykonałeś ${clickTimes} ruchów`);
        location.reload();
        }
        
     
    }else{
        activeCards.forEach(function(card){
            card.classList.add("hidden");
            wrong();
        })
    }
    activeCard="";
    activeCards.length=0;
    cards.forEach(function(card){
        card.addEventListener('click', clickedCard)
    })
},500)

}}

const init=()=>{
 cards.forEach(function(card){
 const position=Math.floor(Math.random()*cardsArray.length);

card.classList.add(cardsArray[position]);

cardsArray.splice(position, 1);

    });
    setTimeout(function(){
        cards.forEach(function(card){
            card.classList.add("hidden");
        
            card.addEventListener('click', clickedCard)
        })
    }, 700)
  

}

init();