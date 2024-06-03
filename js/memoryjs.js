const tilesContainer = document.querySelector(".tiles"); 
// list of my cards with names to see if they are thee same bc then we can see if they are a match or nope
const cardsList = [
  {
    name: "mario",
    image: "pics/card1.png",
  },
  {
    name: "mario",
    image: "pics/card16.png",
  },
  {
    name: "goomba",
    image: "pics/card2.png",
  },
  {
    name: "goomba",
    image: "pics/card15.png",
  },
  {
    name: "spikeTurtle",
    image: "pics/card3.png",
  },
  {
    name: "spikeTurtle",
    image: "pics/card14.png",
  },
  {
    name: "toad",
    image: "pics/card4.png",
  },
  {
    name: "toad",
    image: "pics/card13.png",
  },
  {
    name: "koopa",
    image: "pics/card5.png",
  },
  {
    name: "koopa",
    image: "pics/card12.png",
  },
  {
    name: "bowser",
    image: "pics/card6.png",
  },
  {
    name: "bowser",
    image: "pics/card11.png",
  },
  {
    name: "blueTurtle",
    image: "pics/card7.png",
  },
  {
    name: "blueTurtle",
    image: "pics/card10.png",
  },
  {
    name: "pic",
    image: "pics/card8.png",
  },
  {
    name: "pic",
    image: "pics/card9.png",
  },
];



let attempts = 0;
let playerName = prompt('Please enter your name'); // prompt for player name, to pop up when the game starts
document.querySelector('.infobox .labels:nth-child(2)').innerText = playerName; // we put the name in the infobox

const cardsPicklist = [...cardsList]; // copy the cards list to the cards picklist
const tileCount = cardsPicklist.length; // get the number of cards

// the gaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaameeeeee
let revealedCount = 0;       // number of revealed cards, "let"" is used to allow reassignment so it is not a constant thinggy
let activeTile = null;       // the currently active tile
let awaitingEndOfMove = false; // whether we're waiting for the end of a move

function incrementAttempts() { // well, it is kind of clear... increment the attempts
  attempts++;
  document.querySelector('.infobox:nth-child(3) .labels:nth-child(2)').innerText = attempts; // we wrte the texrt to the boxxx, just like we did with the name
}

function buildTile(card) {  
  const element = document.createElement("div"); // create a div element

  element.classList.add("tile");  // we add the class "tile" to ths div
  element.setAttribute("data-name", card.name); // and  we set the data-name attribute to the card name
  element.setAttribute("data-revealed", "false"); // nd set the data-revealed attribute to false, because the card is not revealed yet

  const img = document.createElement("img"); // create an img element
  img.src = card.image;                   // set the src attribute to the card image, to display the image
  img.style.display = "none"; // hide the image initially
  element.appendChild(img); // append the image to the div, so it will be displayed when the div is clickeddd

  element.addEventListener("click", () => { //and now we add an event listener to the div, so when it is clicked, the image will be displayed
    const revealed = element.getAttribute("data-revealed"); // get the value of the data-revealed attribute, to check if the card is alrdy revealed

    if ( // if the card is already revealed || the move is awaiting the end || the card is the active one, return
      awaitingEndOfMove
      || revealed === "true" 
      || element === activeTile // weprevent the user from clicking the same card twice, which would reveal the card and make it stay revealed
    ) {
      return;
    }

    // no more secrets: reveal this image 
    img.style.display = "block";

    if (!activeTile) { // if there is no active tile, set the current tile as the active one and return
      activeTile = element;
      return;
    }

    incrementAttempts();    // well i think it is clear what this does too
    const nameToMatch = activeTile.getAttribute("data-name"); // get the name of the active tile

    if (nameToMatch === card.name) { // if the name of the active tile matches the name of the current tile
      element.setAttribute("data-revealed", "true"); // set the data-revealed attribute to true for both tiles, so they will stay revealed, element is the current tile
      activeTile.setAttribute("data-revealed", "true"); // activeTile is the first tile that was clicked

      activeTile = null; // then we set the active tile to null to allow the user to click another tile
      awaitingEndOfMove = false; // set awaitingEndOfMove to false, because the move is over
      revealedCount += 2; // increment the revealedCount by 2, because 2 cards were revealed

      if (revealedCount === tileCount) { // and check if the game is won
        alert("Congrats, you made it! Refresh if you want to play again.");
      }

      return;
    }

    awaitingEndOfMove = true; // set awaitingEndOfMove to true, because the move is not over yet

    setTimeout(() => { //timeout to hide the images after 1 second sozusagen they turn back
      activeTile.querySelector("img").style.display = "none"; // hide the image of the active tile
      img.style.display = "none"; // hide the image of the current tile because the move is over

      awaitingEndOfMove = false; // set awaitingEndOfMove to false, because the move is over
      activeTile = null; // and sset the active tile to null to allow the user to click another tile
    }, 1000); // one sec
  });

  return element; // return the div
}

// so let's build up the tiles
for (let i = 0; i < tileCount; i++) { // loop through the cards list
  const randomIndex = Math.floor(Math.random() * cardsPicklist.length); // get a random index, it's math stuff
  const card = cardsPicklist[randomIndex];  // get the card at the random index
  const tile = buildTile(card); // build the tile for the card

  cardsPicklist.splice(randomIndex, 1); // remove the card from the cardsPicklist to prevent duplicates
  tilesContainer.appendChild(tile); // append the tile to the tiles container
}

var seconds = 0; // init secs
var timer = document.getElementById("timer"); // get the timer element

function incrementSeconds() { // it is also clear what this does, i hope so
  seconds += 1;   
  let minutes = Math.floor(seconds / 60); // get the minutes
  let remainingSeconds = seconds % 60; 
  timer.innerText = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds; // set the timer text to the minsss and seccs
  if (revealedCount === 16) { // 16 because each match reveals 2 cards
    clearInterval(timerInterval); // clear it if the game is over
  }
}

timerInterval = setInterval(incrementSeconds, 1000); // set the interval to increment the secs every seccc

// thanks for playing! i learned a lot from this project, and i hope your memory got better now! :D
