export default function initInterface(){

  (function() {

// preloader
  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
  });
 })();

  (function() {

    var reset = document.querySelector('.button_playback');

    reset.addEventListener('click', function(){
      document.querySelector('.section-hero').classList.remove('section-hero_show');
    });

  })();

  (function(){
    var againStart = document.querySelector('.button_again');
    againStart.addEventListener('click', function(){
      setTimeout(function() {
        location.reload();
      }, 1000);
    });
  })();



}