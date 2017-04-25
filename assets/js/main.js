$(document).ready(function() {

  /* menu animations */
  $('#menu_icon').click(function () {

    $(this).toggleClass('open');

    if($(this).hasClass('open')) {
      $('.menu-overlay').height('100%');
    } else {
      $('.menu-overlay').css({overflow: 'hidden'});
      $('.menu-overlay').height('0');
    }
  });

  $(".menu-overlay").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
    if($('#menu_icon').hasClass('open')) {
      $(this).css({overflowY: 'auto'});
    }
  });

  // img show effects
 
  $("img").one("load", function() {
    $(this).css({opacity: 1});
  }).each(function() {
    if(this.complete) $(this).load();
  });

  // scroll effects
  function showHeadbar( scrollTop, marginTop ) {
    if ($(window).scrollTop() >= scrollTop) {
      $('#headbar span').css({'marginTop': marginTop + 'px', 'opacity': 1});
    }
  }

  function hideHeadbar( scrollTop, marginTop ) {
    if ($(window).scrollTop() <= scrollTop) {
      $('#headbar span').css({'marginTop': marginTop + 'px', 'opacity': 0});
    }
  }

  // show head bar if scroll top > x
  var width = $(window).width();

  if (width <= 768) {
    showHeadbar(28, 20);
  } else if (width > 768 && width <= 1140) {
    showHeadbar(36, 25);
  } else if (width > 1140) {
    showHeadbar(50, 25);
  }

  var lastScrollTop = 0;

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    width = $(window).width();

    if (scroll > lastScrollTop) {
      // scroll down
      if (width <= 768) {
        showHeadbar(28, 20);
      } else if (width > 768 && width <= 1140) {
        showHeadbar(36, 25);
      } else if (width > 1140) {
        showHeadbar(50, 25);
      }

    } else {
      // scroll up
      if (width <= 768) {
        hideHeadbar(26, 46);
      } else if (width > 768 && width <= 1140) {
        hideHeadbar(30, 52);
      } else if (width > 1140) {
        hideHeadbar(48, 62);
      }
    }

    lastScrollTop = scroll;
  });

  // swipebox
  if ( $('#swipejs').length ) {
    $( '.swipebox' ).swipebox();
  }

});
