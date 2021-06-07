const game = document.querySelector(".flip-cards");
const divEl = document.createDocumentFragment();
const cardImages = ["fa-vuejs", "fa-react", "fa-ember", "fa-angular"];
let counter = -1;

//get the prev card playing
let prevCard;

//timer to remove the flip-card-back class
let stopCount = 0;
let tm, tmFound;

let state = {
  flipCount: -1,
  selectedCard: [],
  playedCard: [],
  nowPlayingCard: [],
  playingCardID: [],
  atempts: 0,
  win: 0,
  match: false,
  hidden: true,
  visible: false,
};

createCards(12);

function createCards(cards) {
  for (let i = 1; i <= cards; i++) {
    let num = Math.floor(Math.random() * 4);
    const card = document.createElement("i");
    card.classList.add("fab");
    card.classList.add(cardImages[num]);
    card.dataset.cardId = i;
    divEl.appendChild(card);
  }

  game.appendChild(divEl);
}

game.addEventListener(
  "click",
  (playCard = (e) => {
    state.flipCount += 1;
    counter += 1;
    //get player Id
    let playedCardID = e.target.dataset.cardId;
    console.log(playedCardID);
    //check if card have already been played
    if (state.playedCard.includes(playedCardID)) {
      console.log("Card already played ", playedCardID);
      state.flipCount = 0;
      counter = -1;
    } else if (!state.playedCard.includes(playedCardID)) {
      // if (state.playingCardID.includes(playedCardID)) {
      //     console.log('currently playing card');
      //     counter = 0;
      // }
      //flip Playing Card
      //state.playedCard.push(e.target.dataset.cardId);
      console.log(
        "now card playing card is ",
        " card name ",
        e.target.classList.value.slice(4)
      );

      state.nowPlayingCard.push({
        cardId: playedCardID,
        cardName: e.target.classList.value.slice(4),
      });
      state.playingCardID.push(playedCardID);
      //store prev card
      if (counter == 0) {
        prevCard = e.target;
      }

      e.target.classList.add("flip-card");
      //check if card match
      if (counter == 1) {
        if (
          state.nowPlayingCard[0].cardName === state.nowPlayingCard[1].cardName
        ) {
          console.log("card match.......... ", counter);
          //am here
          tmFound = setInterval(function () {
            e.target.classList.remove("flip-card");
            prevCard.classList.remove("flip-card");
            e.target.classList.add("card-match");
            prevCard.classList.add("card-match");
          }, 900);

          //not pushing the object but rather id
          state.playedCard.push(state.nowPlayingCard[0], {
            cardId: playedCardID,
            cardName: e.target.classList.value.slice(4),
          });
          state.playedCard.push(state.nowPlayingCard[0].cardId, playedCardID);
          state.nowPlayingCard = [];
          state.playingCardID = [];
          counter = -1;
        } else {
          state.nowPlayingCard = [];
          state.playingCardID = [];
          e.target.classList.add("flip-card");

          tm = setTimeout(function delayCard() {
            e.target.classList.add("flip-card-back");
            prevCard.classList.add("flip-card-back");
            e.target.classList.remove("flip-card");
            prevCard.classList.remove("flip-card");
            stopCount += 1;
            if (stopCount == 3) {
              e.target.classList.remove("flip-card-back");
              prevCard.classList.remove("flip-card-back");
              console.log("timer cleared ");
              clear(tm);
            }
          }, 900);

          stopCount = 0;
          counter = -1;
          console.log("counting Count = ", stopCount);
        }
      }
    }
  })
);
