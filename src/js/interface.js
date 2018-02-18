export default function initInterface(){


 // preloader
(function() {

  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
  });

 })();


 //click button start game
(function() {

  var reset = document.querySelector('.button_playback');

  reset.addEventListener('click', function(){
    document.querySelector('.section-hero').classList.remove('section-hero_show');
  });

})();


//click button start game again
(function(){

  var againStart = document.querySelector('.button_again');

  againStart.addEventListener('click', function(){
    setTimeout(function() {
      location.reload();
    }, 1000);
  });

})();


}