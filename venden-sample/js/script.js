(function () {
    $('.js-content-slider').slick();

    $('.js-jumbotron-slider').slick({
        dots: true,
        responsive: [
            {
                breakpoint: 990,
                settings: {
                    dots: false
                }
            }
        ]
    });

    $('.js-about-slider').slick({
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.js-feedback-slider').slick({
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.js-featured-slider').slick({
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1380,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1040,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    $('.js-featuredPanel-slider').slick({
        slidesToShow: 8,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 7
                }
            },
            {
                breakpoint: 1260,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 920,
                settings: {
                    slidesToShow: 4.1
                }
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 3.1
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 2.1
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1.7
                }
            }
        ]
    });

    if ($('.js-toggle-featuredPanel')[0]) {
        function onScrollBottom() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                if (!$('#featuredPanel').hasClass('visible')) {
                    $("body, html").animate({
                        scrollTop: $(document).height()
                    }, 50);
                }
                $('#featuredPanel').addClass('visible');
                $('.footer').addClass('featuredFooter');
            }
        }

        $(window).on('scroll', onScrollBottom);
    }

    $('.js-toggle-featuredPanel').on('click', function (e) {
        e.preventDefault();
        var hash = this.hash;
        if (hash) {
            $(hash).toggleClass('visible');
            $('.footer').toggleClass('featuredFooter');
        }
    });

    function markCenterSlide(slick) {
        slick.$slideTrack
            .children('.slick-active:eq(2)')
            .addClass('center-slide');
    }
    $('.js-certificates-slider').on('init', function(event, slick) {
        markCenterSlide(slick);
    }).slick({
        slidesToShow: 5,
        responsive: [
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }).on('beforeChange', function(event, slick) {
        slick.$slideTrack.children().removeClass('center-slide');
    }).on('afterChange', function(event, slick) {
        markCenterSlide(slick);
    });

    $('.js-production-slider').slick({
        dots: true,
        appendDots: $('.production-dots-container'),
        prevArrow: $('.production-prevArrow'),
        nextArrow: $('.production-nextArrow')
    });

    var isInitRequirementsSlider = false;
    function initRequirementsSlider($window) {
        var $windowWidth = $window.width();
        if ($windowWidth < 991) {
            $('.js-requirements-slider').slick();
            isInitRequirementsSlider = true;
        }
    }

    initRequirementsSlider($(window));
    $(window).resize(function() {
        if (!isInitRequirementsSlider) {
            initRequirementsSlider($(this));
        }
    });

    $('.js-helpfulInfo-slider').slick();

    function updateSelect() {
        $(this).children('.s-caption').text($(this).find('option:selected').text());
        if ($(this).prop('disabled') === true) {
            $(this).parent().addClass('disabled');
        }
    }

    $('.select').each(updateSelect).on('change', updateSelect);

    $('.js-toggle').on('click', function (e) {
        e.preventDefault();
        var hash = this.hash;
        if (hash) {
            $(hash).toggleClass('visible');
            $(this).toggleClass('active');
        }
    });

    $('.js-top').on('click', function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    function updateCustomRadio() {
        if ($(this).is(':checked')) {
            $(this).parent().addClass('checked');
        }
    }
    $('.radioCustom-input')
        .each(updateCustomRadio)
        .on('change', function () {
            var $this = $(this);
            var name = $this.attr('name');
            if (name.length > 0) {
                $('.radioCustom-input[name="' + name + '"]').parent().removeClass('checked');
            }
            updateCustomRadio.call(this);
        });

    $('.js-toggleRadio')
        .on('change', function () {
            var $this = $(this);
            var name = $this.attr('name');
            if ($this.val() === 'true') {
                $('.' + name).addClass('visible');
            } else {
                $('.' + name).removeClass('visible');
            }
        });

    function closeAllDropdowns() {
        $('.nav-toggle').removeClass('active');
        $('nav.nav').removeClass('visible');
        $('.js-toggle-menu').parent().removeClass('active');
        $('.loginPanel.visible').removeClass('visible');
        $('.langPanel.visible').removeClass('visible');
    }

    $('.js-toggle-menu').on('click', function (e) {
        e.preventDefault();
        var hash = this.hash;
        if (hash) {
            if ($(this).parent().hasClass('active')) {
                $('body').removeClass('noScroll');
                $(hash).removeClass('visible');
                $(this).parent().removeClass('active');
            } else {
                closeAllDropdowns();
                $('body').addClass('noScroll');
                $(hash).addClass('visible');
                $(this).parent().addClass('active');
            }
        }
    });

    $('.js-close-menu').on('click', function (e) {
        e.preventDefault();
        var hash = this.hash;
        if (hash) {
            $('body').removeClass('noScroll');
            $(hash).removeClass('visible');
            $('.profile-inner').removeClass('active');
        }
    });

    $('.nav-toggle').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            $('body').removeClass('noScroll');
            $('nav.nav').removeClass('visible');
            $(this).removeClass('active');
        } else {
            closeAllDropdowns();
            $('body').addClass('noScroll');
            $('nav.nav').addClass('visible');
            $(this).addClass('active');
        }
    });

    $('.footer-nav-title').on('click', function () {
        var $el = $(this).closest('.footer-collapsible');
        $el.toggleClass('opened');
    });

    // Stick element
    var $window = $(window);
    var $fixedBlock = $('.headerBlock');
    var FIXED_NAV_START_VALUE = 1;

    function fixPosition(el) {
        var elTop = el.offset().top;

        function stickIt() {
            var scrollTop = $window.scrollTop();

            if (scrollTop - elTop >= FIXED_NAV_START_VALUE) {
                el.addClass('fixed');
            } else {
                el.removeClass('fixed');
            }
        }

        stickIt();
        $window.on('scroll resize', stickIt);
    }

    if ($fixedBlock.length > 0 && !('ontouchstart' in document) && ($fixedBlock.height() < $window.height())) {
        fixPosition($fixedBlock);
    }

    var timeout = null;
    function hideCartOnScroll() {
        clearTimeout(timeout);
        $elCart.addClass('animate');
        timeout = setTimeout(function () {
            $elCart.removeClass('animate');
        }, 2000);
    }
    var $elCart = $('.shoppingBag-button');
    if ($elCart) {
        $window.on('scroll', hideCartOnScroll);
    }

    var Modal = (function () {
        function Modal() {
            this.$body = $('body');
            this.$overlay = $('.overlay');
            this.$modal = $('.modal');
            this.$modalClose = $('.js-modalClose');
            this.$modalOpen = $('.js-modalOpen');
            this.addListeners();
        }
        Modal.prototype.addListeners = function () {
            var _this = this;
            this.$modalOpen.on('click', function (e) {
                e.preventDefault();
                var hash = e.currentTarget.hash || '';
                if (hash) {
                    var imgLargePath = e.currentTarget.getAttribute('data-img-large');
                    if (imgLargePath && hash) {
                        $(hash).children('img').attr('src', imgLargePath);
                    }
                    _this.openModal(hash);
                }
            });
            this.$overlay.on('click', function (e) {
                if (e.target === e.currentTarget) {
                    _this.closeModal();
                }
            });
            this.$modalClose.on('click', function (e) {
                e.preventDefault();
                _this.closeModal();
            });
        };
        Modal.prototype.openModal = function (hash) {
            if (hash) {
                this.$body.addClass('no-scroll');
                this.$overlay.addClass('visible');
                $(hash).addClass('visible');
            }
        };
        Modal.prototype.closeModal = function () {
            this.$body.removeClass('no-scroll');
            this.$overlay.removeClass('visible');
            this.$modal.removeClass('visible');
        };
        return Modal;
    })();
    var modal = new Modal();
})();
