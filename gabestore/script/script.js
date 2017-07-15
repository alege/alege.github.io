//иницализация слайдера Swiper для блока скриншоты и видео

var gameViewSlider = new Swiper ('.game-media__slider', {
  loop: false,
  initialSlide: 0,
  slidesPerView: 3,
  slidesPerGroup: 1,
  nextButton: '.game-media__next',
  prevButton: '.game-media__prev',
  scrollbar: '.game-media__scrollbar',
  scrollbarHide: false,
  scrollbarDraggable: true,
  scrollbarSnapOnRelease: true,
  spaceBetween: 2,
  scrollbarDraggable: true,
  slideClass: 'game-media__slider-item',
  wrapperClass: 'game-media__slider-wrapper',
  buttonDisabledClass: 'disabled',
  breakpoints: {
    450: {
      slidesPerView: 1
    },
    650: {
      slidesPerView: 2
    },
    860: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 2
    }
  }
});

//иницализация слайдера Swiper для блока похожие игры

var similarGameSlider = new Swiper ('.game-similar__slider', {
  loop: true,
  initialSlide: 0,
  slidesPerView: 4,
  slidesPerGroup: 1,
  nextButton: '.game-similar__next',
  prevButton: '.game-similar__prev',
  slideClass: 'game-similar__slider-item',
  wrapperClass: 'game-similar__slider-wraper',
  spaceBetween: 15,
  loopedSlides: 4,
  breakpoints: {
    600: {
      slidesPerView: 2
    },
    860: {
      slidesPerView: 3
    },
    1000: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    }
  }
});

//встраиваем левую колонку в страницу на разрешении 860px
var w = $(window);

function parentSort() {
  var breakpoint = 860,
      vW = w.width();
  
  if ( vW > breakpoint ) {
    
    $('[data-parent-desktop]').each(function(){
      var target = $(this).data('parent-desktop');
      $(this).prependTo(target);
    });
    
  } else {
    
    $('[data-parent-mobile]').each(function(){
      var target = $(this).data('parent-mobile');
      $(this).prependTo(target);
    });
    
  }
}
      
parentSort();

w.resize(parentSort);

//плавающая колонка использован плагин sticky-sidebar

(function() {
  $('.js-sliding-block, .game-body__column--right').theiaStickySidebar({
    additionalMarginTop: 57
  });
})();

//волшебная линия для табов

(function () {
    var $el, leftPos, newWidth,
        $mainNav = $(".game-describe__controls");
 
    $mainNav.append("<div class='js-magic-line'></div>");
    var $magicLine = $(".js-magic-line");
 
    $magicLine
        .width($(".js-tabs-btn._active").width())
        .css("left", $(".js-tabs-btn._active").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
 
    $(".js-tabs-btn").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });
    });
  
    $(".js-tabs-btn").on('click touchend', function() {
      $magicLine
        .width($(this).width())
        .css("left", $(this).position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
    })
})();

setInterval(function () {
  if($('.game-describe__controls').height() > 76) {
    $(".game-describe__controls .js-magic-line").hide();
  } else {
    $(".game-describe__controls .js-magic-line").show();;
  }
}, 400);