function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.news-category__list > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
            $(this).toggleClass('activated');
            return false;
        });

        obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValue : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    }
}
;var somth;
;document.createElement("picture");
svg4everybody({polyfill: true});


//radio buttons in form_prereg
document.onload = (function () {
  var radioElems = document.querySelectorAll('.switch__radio');
  for (var i = 0; i < radioElems.length; i++) {
    if (radioElems[i].checked) {
      var elem = radioElems[i];
      while (elem) {
        if (elem.parentNode.classList.contains('switch__item')) {
          elem.parentNode.classList.add('js-radio-checked');
          break;
        } else {
          elem = elem.parentNode;
        }
      }
    }
  }
})();

$(".switch__item").on("click", function () {
  $(this).find('input:radio')[0].checked = true;
  $('.js-radio-checked').toggleClass('js-radio-checked');
  $(this).toggleClass('js-radio-checked');
});

//hamburger menu
$('.main-menu__burger').click(function () {
  var itemList = document.querySelectorAll('.main-menu__item:not(.hidden)');
  if ($(this).hasClass('js-menu-opened')) {
    $(this).removeClass('js-menu-opened');
    $('.main-menu__list').slideUp(1000, function () {
      $(this).removeClass('js-menu-opened');
    });
  } else {
    $(this).addClass('js-menu-opened');
    $('.main-menu__list').slideDown(1000, function () {
      $(this).css('display', 'flex');
    }).addClass('js-menu-opened');
  }
});

//user menu
$('.user-menu__toggle').click(function () {
  if ($(this).hasClass('js-user-opened')) {
    $(this).removeClass('js-user-opened');
    $('.user-menu__list').slideUp(1000, function () {
      $(this).removeClass('js-user-opened');
    });
  } else {
    $(this).addClass('js-user-opened');
    $('.user-menu__list').slideDown(1000, function () {
      $(this).css('display', 'flex');
    }).addClass('js-user-opened');
  }
});

//animation of the appearance of lines on hover at tour.html page
var heroAccountElem = document.querySelector('.tour-accounts__text_hero');
var superheroAccountElem = document.querySelector('.tour-accounts__text_superhero');

if (heroAccountElem) {
  heroAccountElem.addEventListener('mouseenter', function (event) {
    var heroLines = document.querySelectorAll('.collage__line_hero');
    if (heroLines) {
      for (var i = 0; i < heroLines.length; i++) {
        heroLines[i].classList.toggle('js-line-active');
      }
    }
  }, false);
  heroAccountElem.addEventListener('mouseleave', function (event) {
    var heroLines = document.querySelectorAll('.collage__line_hero');
    if (heroLines) {
      for (var i = 0; i < heroLines.length; i++) {
        heroLines[i].classList.toggle('js-line-active');
      }
    }
  }, false);
}

if (superheroAccountElem) {
  superheroAccountElem.addEventListener('mouseenter', function (event) {
    var superheroLines = document.querySelectorAll('.collage__line_superhero');
    if (superheroLines) {
      for (var i = 0; i < superheroLines.length; i++) {
        superheroLines[i].classList.toggle('js-line-active');
      }
    }
  }, false);
  superheroAccountElem.addEventListener('mouseleave', function (event) {
    var superheroLines = document.querySelectorAll('.collage__line_superhero');
    if (superheroLines) {
      for (var i = 0; i < superheroLines.length; i++) {
        superheroLines[i].classList.toggle('js-line-active');
      }
    }
  }, false);
}


window.sr = ScrollReveal();

//animation fall collage at tour.html page
var tourCollageReveal1 = {
  delay: 100,
  distance: '-400px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: true,
  duration: 1000,
  viewOffset: {right: -2000, left: -500}
};
var tourCollageReveal2 = {
  delay: 500,
  distance: '-400px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: true,
  duration: 1000,
  viewOffset: {right: -2000, left: -500}
};
var tourCollageReveal3 = {
  delay: 1000,
  distance: '-400px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: true,
  duration: 1000,
  viewOffset: {right: -2000, left: -500}
};
var tourCollageReveal4 = {
  delay: 1500,
  distance: '-400px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: true,
  duration: 1000,
  viewOffset: {right: -2000, left: -500}
};

sr.reveal('.collage__img_resume1', tourCollageReveal1);
sr.reveal('.collage__img_resume2', tourCollageReveal2);
sr.reveal('.collage__img_resume3', tourCollageReveal3);
sr.reveal('.collage__img_resume4', tourCollageReveal4);

//animation of the successive appearance blocks with resume at index.html page
var mainResumesBlock1 = {
  delay: 100,
  distance: '500px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: false,
  duration: 3000
};
var mainResumesBlock2 = {
  delay: 1000,
  distance: '500px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: false,
  duration: 3000
};
var mainResumesBlock3 = {
  delay: 1500,
  distance: '500px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: false,
  duration: 3000
};

sr.reveal('.resume-examples__img_1', mainResumesBlock2);
sr.reveal('.resume-examples__img_2', mainResumesBlock1);
sr.reveal('.resume-examples__img_3', mainResumesBlock3);

//scroll animation
var fooReveal1 = {
  delay: 100,
  distance: '100px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: false,
  duration: 1000,
  viewOffset: {right: -2000, left: -1000, top: -1000}
};
var fooReveal2 = {
  delay: 200,
  distance: '100px',
  easing: 'cubic-bezier(0.3, 0.5, 0.1, 1)',
  scale: 1,
  mobile: false,
  duration: 1000,
  viewOffset: {right: -2000, left: -1000, top: -1000}
};

sr.reveal('.page-section ', fooReveal1);
sr.reveal('.text-block__title:not(.noreveal), .text-block__content:not(.noreveal) p, .text-block__link, .text-block__slogan, .text-block__item, .communication__img, .intro-video__item, .footer-menu__title:not(.noreveal), .footer-menu__item:not(.noreveal), .logo_footer:not(.noreveal), .pricing__header, .pricing__body, .pricing__footer:not(.noreveal), .note, .companies, .tour-working__img, .tour-accounts__img, .tour-dashboard__bg, .tour-search__bg, .tour-matching__img, .form__radiofield:not(.noreveal), .form__inputlabel:not(.noreveal), .about-slogan__text, .about-description__text, .about-description__comment, .about-partners__text, .about-partners__item, .about-team__title, .about-team__photo, .about-team__text, .about-donate__title, .about-donate__text, .about-donate__pics div, .video p, .video b, .page-section .btn, .video__youtube-content, .video__youtube-link, .video h2, .case h2, .case p, .case__inner-container, .versus-table h2, .versus-table p, .versus-table__t-row, .versus-table__r-row, .contacts__col, .contact__contact-link, .contacts__form-element, .news-detail h1, .news-category, .bread_crumbs, .images-block, .images-block h6, .images-block p, .images-block time, .text_page p, .text-bold p, .another-cathegory, .news_page, .follow', fooReveal2);

//animation increase blocks in header at index.html page

var heroBlock = document.querySelector('.lead__item_hero');
var employerBlock = document.querySelector('.lead__item_employer');

if (heroBlock && employerBlock) {
  heroBlock.addEventListener('mouseenter', function (event) {
    heroBlock.classList.add('js-hero-hover-active');
    employerBlock.classList.add('js-employer-hover-none');
  }, false);

  heroBlock.addEventListener('mouseleave', function (event) {
    heroBlock.classList.remove('js-hero-hover-active');
    employerBlock.classList.remove('js-employer-hover-none');
  }, false);

  employerBlock.addEventListener('mouseenter', function (event) {
    heroBlock.classList.add('js-hero-hover-none');
    employerBlock.classList.add('js-employer-hover-active');
  }, false);

  employerBlock.addEventListener('mouseleave', function (event) {
    heroBlock.classList.remove('js-hero-hover-none');
    employerBlock.classList.remove('js-employer-hover-active');
  }, false);

  if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
    heroBlock.addEventListener('click', function () {
      heroBlock.classList.add('js-hero-hover-active');
      employerBlock.classList.add('js-employer-hover-none');
      heroBlock.classList.remove('js-hero-hover-none');
      employerBlock.classList.remove('js-employer-hover-active');
    }, false);

    employerBlock.addEventListener('click', function () {
      heroBlock.classList.add('js-hero-hover-none');
      employerBlock.classList.add('js-employer-hover-active');
      heroBlock.classList.remove('js-hero-hover-active');
      employerBlock.classList.remove('js-employer-hover-none');
    }, false);
  }
}

//dropdown menu news-category

$(function () {

  var dd = new DropDown($('.news-category'));

  $(document).click(function () {
    // all dropdowns
    $('.news-category').removeClass('activated');
  });

});

//fixed top menu

var StickyElement = function (node) {
  var doc = $(document),
    fixed = false,
    anchor = node.find('.sticky__anchor'),
    content = node.find('.sticky__content');

  var onScroll = function (e) {
    var docTop = doc.scrollTop(),
      anchorTop = anchor.offset().top;

    if (docTop > anchorTop) {
      if (!fixed) {
        anchor.height(content.outerHeight());
        content.addClass('fixed');
        fixed = true;
      }
    } else {
      if (fixed) {
        anchor.height(0);
        content.removeClass('fixed');
        fixed = false;
      }
    }
  };

  $(window).on('scroll', onScroll);
};

if (document.querySelector('.sticky')) {

  var demo = new StickyElement($('.sticky'));
}

//Video at index page

var videoIndex, src, videoblockIndex;
src = 'https://www.youtube.com/embed/';
videoblockIndex = $(document).find('.intro-video');

$(document).on("click", '.intro-video__btn', function () {
  videoIndex = $(this).parents('.intro-video').data('video');
  videoblockIndex.addClass('active'); // Добавляем активный класс, который увеличит блок по высоте и сделает видимым слой с видео
  setTimeout(function () {
    videoblockIndex.find('iframe').attr('src', src + videoIndex + '?wmode=opaque&autoplay=1&showinfo=0');
  }, 250);
});

$(document).on("click", '.intro-video__close', function (event) {
  event.preventDefault();
  event.stopPropagation();
  videoblockIndex.removeClass('active');
  setTimeout(function () {
    videoblockIndex.find('iframe').attr('src', '');
  }, 250);
});

//Video at vip page

var videoVip, videoblockVip;
src = 'https://www.youtube.com/embed/';
videoblockVip = $('.video__item');

$('.video__youtube-link').click(function (event) {
  event.preventDefault();
  videoVip = $(this).parents('.video__item').data('video');
  videoblockVip.addClass('active'); // Добавляем активный класс, который увеличит блок по высоте и сделает видимым слой с видео
  setTimeout(function () {
    videoblockVip.find('iframe').attr('src', src + videoVip + '?autoplay=1');
  }, 250);
});
