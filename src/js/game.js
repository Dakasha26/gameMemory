export default function initGame(){


  var flipperCards;
  var score = document.querySelector('.game-right__score');
  var endGame = document.querySelector('.section-happy');
  var scoreIncrementer;
  var cards = []; //empty array save our cards


  //array pictures
  var numbers = [
                 "url('./images/0C.png')",
                 "url('./images/0D.png')",
                 "url('./images/0H.png')",
                 "url('./images/0S.png')",
                 "url('./images/2C.png')",
                 "url('./images/2D.png')",
                 "url('./images/2H.png')",
                 "url('./images/2S.png')",
                 "url('./images/3C.png')",
                 "url('./images/3D.png')",
                 "url('./images/3H.png')",
                 "url('./images/3S.png')",
                 "url('./images/4C.png')",
                 "url('./images/4D.png')",
                 "url('./images/4H.png')",
                 "url('./images/4S.png')",
                 "url('./images/5C.png')",
                 "url('./images/5D.png')",
                 "url('./images/5H.png')",
                 "url('./images/5S.png')",
                 "url('./images/6C.png')",
                 "url('./images/6D.png')",
                 "url('./images/6H.png')",
                 "url('./images/6S.png')",
                 "url('./images/7C.png')",
                 "url('./images/7D.png')",
                 "url('./images/7H.png')",
                 "url('./images/7S.png')",
                 "url('./images/8C.png')",
                 "url('./images/8D.png')",
                 "url('./images/8H.png')",
                 "url('./images/8S.png')",
                 "url('./images/9C.png')",
                 "url('./images/9D.png')",
                 "url('./images/9H.png')",
                 "url('./images/9S.png')",
                 "url('./images/AC.png')",
                 "url('./images/AA.png')",
                 "url('./images/AH.png')",
                 "url('./images/AS.png')",
                 "url('./images/JC.png')",
                 "url('./images/JD.png')",
                 "url('./images/JH.png')",
                 "url('./images/JS.png')",
                 "url('./images/KC.png')",
                 "url('./images/KD.png')",
                 "url('./images/KH.png')",
                 "url('./images/KS.png')",
                 "url('./images/QC.png')",
                 "url('./images/QD.png')",
                 "url('./images/QH.png')",
                 "url('./images/QS.png')"
  ];


  //create loop
  for (var n in numbers) {
    // each index add our array
    cards.push({
      image: numbers[n]
    });
  }


  //mix our cards
  function shuffle(arrayToShuffle) {
    return arrayToShuffle.sort(function() { return 0.5 - Math.random();});
  }

  window.addEventListener("load", startGame);

  var chosenCards;  //save cards for game
  var gridWidth = 6;  //total many cards wendy
  var gridHeight = 3; //total many cards row


  function startGame() {
    // mis array cards
    cards = shuffle(cards);

    //output random array cards
    var howManyCards = gridWidth * gridHeight * 0.5;
        chosenCards = cards.slice(0, howManyCards);

        chosenCards = chosenCards.concat(chosenCards);

        chosenCards = shuffle(chosenCards);
        flipperCards = [];
        scoreIncrementer = 0;

    //create block cards in DOM three
    for (var card in chosenCards) {

      var newCard = document.createElement("div");
          newCard.className = 'game-cards__card flipped data-tid="Card"';

      var cardFront = document.createElement("div");
          cardFront.className = "game-cards__front";
          newCard.appendChild(cardFront);

      var cardBack = document.createElement("div");
          cardBack.className = ('game-cards__back data-tid="Card-flipped"');
          cardBack.style.backgroundImage = chosenCards[card].image;
          newCard.appendChild(cardBack);

      // location our cards
      var row = Math.floor(card / gridWidth);
      var column = card % gridWidth;

          //position our cards
          newCard.style.top = row * 200 +"px";
          newCard.style.left = column * 150 +"px";

          newCard.addEventListener("click", onCardClick);

          // add DOM
          document.querySelector('.game').appendChild(newCard);
    }

  }

  //show all cards front side
  function showAllCards() {

      var startSection = document.querySelector('.section-hero');

        if(startSection.classList.contains('section-hero_show')){

          setTimeout(showAllCards, 7000);

        } else {

      var scoreCard = document.getElementsByClassName('game-cards__card');

        for(var i = 0; i < scoreCard.length; i++) {

          if(scoreCard[i].classList.contains('flipped')){
            scoreCard[i].classList.toggle('flipped');
          }

        }

       }
  }
  setTimeout(showAllCards, 7000);


  //click on card
  function onCardClick() {

    if(!this.classList.contains('flipped') && flipperCards.length < 2) {
        this.classList.toggle('flipped');
        flipperCards.push(this);

        if(flipperCards.length === 2) {
          checkConcid();
        }

      }
  }


  //pair and not pair
  function checkConcid() {

    if(flipperCards[0].querySelector('.game-cards__back').style.backgroundImage === flipperCards[1].querySelector('.game-cards__back').style.backgroundImage) {

      setTimeout(flipDissapiar, 1000);

    } else if (flipperCards[0].querySelector('.game-cards__back').style.backgroundImage !== flipperCards[1].querySelector('.game-cards__back').style.backgroundImage){

      var scoreCard = document.querySelectorAll('.game-cards__card');

      for(var i = 0; i < scoreCard.length; i++){

        var sec = scoreCard[i].classList.contains('open');

        if(sec){
          if(scoreIncrementer > 0){
            score.innerText = 'Очки: ' + -- scoreIncrementer * 42;
          }
        }

      }
      setTimeout(flipBack, 1500);
    }
    setTimeout(checkForGameOver, 1500);
  }


  //opacity cards
  function flipDissapiar(){

    for(var i = 0; i < flipperCards.length; i++){
        flipperCards[i].classList.add('open');
      }

      var scoreCard = document.querySelectorAll('.game-cards__card');

       for(var i = 0; i < scoreCard.length; i++){

        var sec = scoreCard[i].classList.contains('open');
         if(!sec){
          score.innerText = 'Очки: ' + ++scoreIncrementer * 42;
         }
       }
      flipperCards = [];
  }


  //function add class flipped
  function flipBack() {

    flipperCards[0].classList.toggle('flipped');
    flipperCards[1].classList.toggle('flipped');

    flipperCards = [];
  }


  //game start again
  function resetGame() {

    var btnAgain = document.querySelector('.game-left__again');
    var sectionStart = document.querySelector('.section-hero');

    btnAgain.addEventListener('click', function(){
      setTimeout(function() {
        location.reload();
      }, 1000);
    });
  }
  resetGame();


  //game over function
  function checkForGameOver() {

    // if all card has class flipped
    var matchedCards= document.getElementsByClassName("flipped");

    //and all cards
    var allCards = document.getElementsByClassName("game-cards__card");

    // cards have class flipped = all cards - show block win and result scores
    if (matchedCards.length == allCards.length) {
      endGame.style.display = 'block';
      endGame.querySelector('.happy-center__conclusion').innerText = 'Ваш итоговый счет: ' + scoreIncrementer * 42;
    }

  }


}