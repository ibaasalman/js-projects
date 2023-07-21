const msg = document.getElementsByTagName("h2")[0];
const start = document.getElementById("start");
const newcard = document.getElementById("newcard");
const cardsmsg = document.getElementsByTagName("h3")[0];
const summsg = document.getElementsByTagName("h3")[1];
let isalive = false;
const crads = [];
let sum = 0;

start.addEventListener("click", () => {
  startGame();
});

newcard.addEventListener("click", () => {
  newCard();
});

function startGame() {
    alert(`The Rules are simple :
    1- Start a New Game to get 2 random cards
    2- if cards values sums is 21 you will win 🎉
    3- if cards values sums is more than 21 you will lose 😔
    4- else you can get a new card 🃏
    
    Note : 
     - A card value is 11  
     - J , K and Q value is 10`)
    sum = 0 ;
    crads.length = 0 
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  crads.push(firstCard, secondCard);
  sum = 0;
  calcSum(firstCard);
  calcSum(secondCard);
  isalive = true;
  renderGame();
}

function renderGame() {
    
  cardsmsg.innerHTML = "Your Cards : <br>";
  crads.forEach(i=>{
    cardsmsg.innerHTML += `<img src="cards/${i}.png" />`
  })
  summsg.textContent = "Sum : " + sum;
  if (sum == 21) {
    isalive = false;
    msg.textContent = "🎉 You've got Blackjack! 🎉";
  } else if (sum < 21) {
    msg.textContent = "Do you want to draw a new card?";
  } else {
    isalive = false;
    msg.textContent = "😔 You're out of the game! 😔";
  }
}

function getRandomCard() {
  return Math.floor(Math.random() * 13 + 1);
}

function newCard() {
  if(isalive){
    const card = getRandomCard();
    crads.push(card);
    calcSum(card)
    renderGame();
  }else{
    alert("start a new game")
  }
}

function calcSum(card) {
    console.log(card)
  if (card == 1) {
    sum += 11;
  } else if (card > 10) {
    sum += 10;
  } else {
    sum += card;
  }
}
