const cardImages = [
  "fa-vuejs",
  "fa-react",
  "fa-ember",
  "fa-angular",
  "fa-js",
  "fa-node-js",
];

function getNum() {
  counter = 0;
  addedImages = {};
  newArray = [];
  for (let i = 0; i < cardImages.length; i++) {
    let ran = Math.floor(Math.random() * 6);
    //console.log('random num ', ran);
    addedImages[cardImages[ran]] = 1;
    newArray.push({ ran, id: i, name: cardImages[i] });

    if (addedImages[cardImages[ran]] < 2) {
      //console.log('random num ', ran);
      newArray.push({ ran, id: i, name: cardImages[i] });
      addedImages[cardImages[ran]] = 2;
    }
  }
  return newArray;
  //return addedImages;
  //console.log(addedImages);
  //console.log('newArray = ', newArray)
}

console.log(getNum());
