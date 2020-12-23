import { doc } from "prettier";
import "./style.css";

const game = document.querySelector(".flip-cards");
const matchCount = document.querySelector(".match-count");
const attempt = document.querySelector(".attempt");
const divEl = document.createDocumentFragment();
const myScore = document.querySelector(".my-score");
const highScore = document.querySelector(".high-score");
const highAttempt = document.querySelector(".high-score-attempt");
let progressBar = document.querySelector(".progressBar");
let paintBar = document.querySelector(".paintBar");

const cardImages = [
  "fa-vuejs",
  "fa-react",
  "fa-ember",
  "fa-angular",
  "fa-js",
  "fa-node-js",
];
const addedImages = {};
const newArray = [];

let counter = -1;
let prevCard;

let state = {
  flipCount: -1,
  Cards: [],
  selectedCard: [],
  playedCard: [],
  nowPlayingCard: [],
  playingCardID: [],
  playerCardName: "",
  prevCard,
  currentCard: "",
  atempts: 0,
  matchCount: 0,
  highestScore: 0,
  score: 0,
};

let newCards = getCardImages();
let shuffleCards = shuffleImages(newCards);

//update ui
highScore.textContent = localStorage.getItem("highestScore");
highAttempt.textContent = localStorage.getItem("attempts");

//create cards
createCards(12);

//get all the cards
const allCards = document.querySelectorAll(".flip-cards i");

//start timer
timerStarted();

//shuffle images
function shuffleImages(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//get card images
function getCardImages() {
  for (let i = 0; i < cardImages.length; i++) {
    let ran = Math.floor(Math.random() * 6);
    //console.log('random num ', ran);
    addedImages[cardImages[ran]] = 1;
    newArray.push(cardImages[i]);

    if (addedImages[cardImages[ran]] < 2) {
      //console.log('random num ', ran);

      addedImages[cardImages[ran]] = 2;
      newArray.push(cardImages[i]);
    }
  }
  return newArray;
}

function createCards(cards) {
  //check if in already generated
  const imageId = [];

  for (let i = 0; i < cards; i++) {
    const card = document.createElement("i");
    card.classList.add("fab");
    card.classList.add(shuffleCards[i]);
    card.dataset.cardId = i;
    divEl.appendChild(card);
  }

  game.appendChild(divEl);
}

//turn player card
function turnPlayerCard(cardName) {
  state.nowPlayingCard.push({
    id: cardName.target.dataset.cardId,
    name: cardName.target.classList.value.slice(4),
  });
  state.playingCardID.push(cardName.target.dataset.cardId);
  cardName.target.classList.add("flip-card");
}

//compare if both cards match
function comparePlayedCard(card2, card1) {
  //count number of attemps
  attempt.textContent = state.atempts += 1;

  //set content of match count
  matchCount.textContent = state.matchCount += 1;

  if (card1 === card2) {
    console.log("match card found..", counter);

    //Update Hihest score
    state.highestScore += 5;

    //Update Current Score
    myScore.textContent = state.score += 5;

    //push it to played card
    state.playedCard.push(
      state.nowPlayingCard[0].id,
      state.nowPlayingCard[1].id
    );

    //update local storage
    saveHighestScore(state.highestScore, state.matchCount);

    //call card match function
    playerCardMatch(state.currentCard, state.prevCard);
  } else {
    console.log("card does not match...", counter);
    //called return card function
    returnPlayerCard(state.currentCard, state.prevCard);
  }
}

//flip card match for 900mls
function playerCardMatch(currentCard, prevCard) {
  //delay card for 900 mls then flicp back
  setTimeout(() => {
    prevCard.classList.add("card-match");
    currentCard.classList.add("card-match");

    prevCard.classList.remove("flip-card");
    currentCard.classList.remove("flip-card");
  }, 900);

  state.nowPlayingCard = [];
  state.playingCardID = [];
  counter = -1;
  state.flipCount = 0;
}

//return player card and flip
function returnPlayerCard(currentCard, prevCard) {
  //delay card for 900 mls then flicp back
  setTimeout(() => {
    prevCard.classList.remove("flip-card");
    currentCard.classList.remove("flip-card");

    prevCard.classList.add("flip-card-back");
    currentCard.classList.add("flip-card-back");
  }, 900);

  state.nowPlayingCard = [];
  state.playingCardID = [];
  counter = -1;
  state.flipCount = 0;
}

//count down timer
function startTimer(duration, display) {
  //get the Total duration
  let getTimerLength = duration;
  // increment counter
  let counter = 1;

  console.log("duration", duration);
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    console.log(Number(timer), "counter ", (counter += 1));
    //progress bar
    //startProgressBar(counter, getTimerLength);
    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
  console.log(duration);
}

//start timer
function timerStarted() {
  //set timer minutes
  let fiveMinutes = 60 * 5;
  let display = document.querySelector("#time");
  let st = startTimer(fiveMinutes, display);
}

//progress bar

function startProgressBar(val, timerDuration) {
  //barLength = 100;
  let getLength;
  console.log(getLength);
  if (val <= timerDuration) {
    getLength = Number((val * 100) / timerDuration);
    paintBar.style.width = getLength + "%";
  }
}

// save higher and number of atempts
function saveHighestScore(score, count) {
  let currentScore = score;
  let curentCount = count;

  localStorage.setItem("highestScore", currentScore);
  localStorage.setItem("attempts", curentCount);

  let hScore = localStorage.getItem("highestScore");
  let mCount = localStorage.getItem("attempts");

  //check for higher score
  if (currentScore > hScore) {
    localStorage.setItem("highestScore", currentScore);
    localStorage.setItem("attempts", curentCount);
  }

  //update ui
  //   highScore.textContent = hScore;
  //   highAttempt.textContent = mCount;
}

//reset game cards
resetCard();
function resetCard() {
  console.log("all cards ", allCards);
}

//Play Card
const onPlayCardClick = (e) => {
  //Flip Count Counter
  state.flipCount += 1;
  counter += 1;

  //save highest score
  saveHighestScore(state.highestScore, state.matchCount);

  //get current card being played
  state.currentCard = e.target;

  //store prev card
  if (counter === 0) {
    state.prevCard = e.target;
  }

  //reset card after flip card back
  //e.target.classList.remove('flip-card-back');
  state.currentCard.classList.remove("flip-card-back");

  //get player Id
  let playerCardID = e.target.dataset.cardId;

  // get player card name
  //let playerCardName = e.target.classList.value.slice(4);
  state.playerCardName = e.target.classList.value.slice(4);
  if (state.playingCardID.includes(playerCardID)) {
    console.log("currently playing card");

    counter = -1;
    state.flipCount = 0;
  } else if (state.playedCard.includes(playerCardID)) {
    console.log("Card already played ", playerCardID);
    state.flipCount = 0;
    counter = -1;
  } else if (!state.playedCard.includes(playerCardID)) {
    //Play current card
    console.log("now playing card is ", state.playerCardName);
    //get playing

    //turn player card
    turnPlayerCard(e);

    //check if flipped cards match
    if (counter === 1) {
      comparePlayedCard(
        state.nowPlayingCard[0].name,
        state.nowPlayingCard[1].name
      );
    }
  }
};

game.addEventListener("click", onPlayCardClick);

// Google maps,  translate, 'secret key'
// front end <- middle, GO(lang) -> API[Backend]

// name -> Varan -> Varun, id:'..'

// browser -> IE/XP
//
//api -> api + data -> backend
