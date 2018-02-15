export default function initGame(){


  var flipperCards;
  var score = document.querySelector('.game-right__score');
  var endGame = document.querySelector('.section-happy');
  var scoreIncrementer;
  var cards = []; //пустой массив который хранит карты


  // массив картинок
  var numbers = [
                 "url('src/img/0C.png')",
                 "url('src/img/0D.png')",
                 "url('src/img/0H.png')",
                 "url('src/img/0S.png')",
                 "url('src/img/2C.png')",
                 "url('src/img/2D.png')",
                 "url('src/img/2H.png')",
                 "url('src/img/2S.png')",
                 "url('src/img/3C.png')",
                 "url('src/img/3D.png')",
                 "url('src/img/3H.png')",
                 "url('src/img/3S.png')",
                 "url('src/img/4C.png')",
                 "url('src/img/4D.png')",
                 "url('src/img/4H.png')",
                 "url('src/img/4S.png')",
                 "url('src/img/5C.png')",
                 "url('src/img/5D.png')",
                 "url('src/img/5H.png')",
                 "url('src/img/5S.png')",
                 "url('src/img/6C.png')",
                 "url('src/img/6D.png')",
                 "url('src/img/6H.png')",
                 "url('src/img/6S.png')",
                 "url('src/img/7C.png')",
                 "url('src/img/7D.png')",
                 "url('src/img/7H.png')",
                 "url('src/img/7S.png')",
                 "url('src/img/8C.png')",
                 "url('src/img/8D.png')",
                 "url('src/img/8H.png')",
                 "url('src/img/8S.png')",
                 "url('src/img/9C.png')",
                 "url('src/img/9D.png')",
                 "url('src/img/9H.png')",
                 "url('src/img/9S.png')",
                 "url('src/img/AC.png')",
                 "url('src/img/AA.png')",
                 "url('src/img/AH.png')",
                 "url('src/img/AS.png')",
                 "url('src/img/JC.png')",
                 "url('src/img/JD.png')",
                 "url('src/img/JH.png')",
                 "url('src/img/JS.png')",
                 "url('src/img/KC.png')",
                 "url('src/img/KD.png')",
                 "url('src/img/KH.png')",
                 "url('src/img/KS.png')",
                 "url('src/img/QC.png')",
                 "url('src/img/QD.png')",
                 "url('src/img/QH.png')",
                 "url('src/img/QS.png')",
  ];


  //создаем цикл
  for (var n in numbers) {
    // для каждого индекса пушим в наш массивcards
    cards.push({
      image: numbers[n]
    });
  }


  //перемешиваем наши карты
  function shuffle(arrayToShuffle) {
    return arrayToShuffle.sort(function() { return 0.5 - Math.random();});
  }

  window.addEventListener("load", startGame);

  var chosenCards;  //здесь храним карты для игры
  var gridWidth = 6;  //колличество карт в ряду
  var gridHeight = 3; // колличество рядов с картами


  function startGame() {
    // мешаем массив карт
    cards = shuffle(cards);

    //перемещаем карты в выбранный массив
    //который будет выводит нам случайный набор карт с нужным колличеством карт
    var howManyCards = gridWidth * gridHeight * 0.5;
        chosenCards = cards.slice(0, howManyCards);

        //удваиваем массив
        chosenCards = chosenCards.concat(chosenCards);
        //console.log(chosenCards);

        // сново перемешиваем
        chosenCards = shuffle(chosenCards);
        flipperCards = [];
        scoreIncrementer = 0;

    //создаем из массива наши карты в DOM дереве
    for (var card in chosenCards) {

      // создаем новый блок
      var newCard = document.createElement("div");

          //присваиваем ему класс
          newCard.className = "game-cards__card";


      //помещаем внутрь него блоки задней стороны карты и фронтальной
      var cardFront = document.createElement("div");
          cardFront.className = "game-cards__front";
          newCard.appendChild(cardFront);

      var cardBack = document.createElement("div");
          cardBack.className = ("game-cards__back");
          cardBack.style.backgroundImage = chosenCards[card].image;
          newCard.appendChild(cardBack);

      // где расположим наши карты
      var row = Math.floor(card / gridWidth);
      var column = card % gridWidth;

          //позиционируем наши карты
          newCard.style.top = row * 200 +"px";
          newCard.style.left = column * 150 +"px";

          // вешаем событие клика
          newCard.addEventListener("click", onCardClick);

          // добавляем в dom
          document.querySelector('.game').appendChild(newCard);
    }

  }

  //клик по карте
  function onCardClick() {

    if(!this.classList.contains('flipped') && flipperCards.length < 2) {
        this.classList.toggle('flipped');
        flipperCards.push(this);

        if(flipperCards.length === 2) {
          checkConcid();
        }

      }
  }

  //функция сравивает парные и не парные карты
  function checkConcid() {

    if(flipperCards[0].querySelector('.game-cards__back').style.backgroundImage === flipperCards[1].querySelector('.game-cards__back').style.backgroundImage) {

      setTimeout(flipDissapiar, 1000);

    } else if (flipperCards[0].querySelector('.game-cards__back').style.backgroundImage !== flipperCards[1].querySelector('.game-cards__back').style.backgroundImage){

      var scoreCard = document.querySelectorAll('.game-cards__card');
      for(var i = 0; i < scoreCard.length; i++){
        var sec = scoreCard[i].classList.contains('open');
        if(sec){
          if(scoreIncrementer > 0){
            score.innerText = -- scoreIncrementer * 42;
          }
        }
      }
      setTimeout(flipBack, 1500);
    }
    checkForGameOver();
  }

  //функция добавляет класс open элементу, и пара одинаковых карт исчезает
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

  //функция добавляет и убирает класс flipped
  function flipBack() {

    flipperCards[0].classList.toggle('flipped');
    flipperCards[1].classList.toggle('flipped');

    flipperCards = [];

  }

  //функция начать игру сначала
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

  //функция сравнивает колличество карт
  function checkForGameOver() {

    // если все карты имеют класс flipped
    var matchedCards= document.getElementsByClassName("flipped");

    //все карты
    var allCards = document.getElementsByClassName("game-cards__card");

    // если колличество совпало, то выводим блок о результах игры
    if (matchedCards.length == allCards.length) {
      endGame.style.display = 'block';
      endGame.querySelector('.happy-center__conclusion').innerText = 'Ваш итоговый счет: ' + scoreIncrementer * 42;
    }
  }


}