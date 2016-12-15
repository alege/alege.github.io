
jQuery(function(){

	jQuery('.camera_wrap').camera({
		autoAdvance: false,
		height: '28%',
		minHeight: '350px',
		pagination: true,
		thumbnails: false,
		playPause: false,
		hover: false,
		loader: 'none',
		navigation: false,
		navigationHover: false,
		mobileNavHover: false,
		fx: 'simpleFade'
	});
});

$("#mobile-menu").mmenu({
	extensions		: [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
	navbar: {
		title: "Меню"
	}
});
var $menu = $("#mobile-menu").mmenu({
   //   options
});
var $icon = $("#my-icon");
var API = $menu.data( "mmenu" );

$icon.on( "click", function() {
	API.open();
});

API.bind( "opened", function() {
	setTimeout(function() {
		$icon.addClass( "is-active" );
	}, 100);
});
API.bind( "closed", function() {
	setTimeout(function() {
		$icon.removeClass( "is-active" );
	}, 100);
});

jQuery(function(f) {
	f(window).scroll(function() {
		var navbar = f('#up');
		if (f(this).scrollTop() > 1) {
			navbar.addClass("opacity-head");
		}
		else{
			navbar.removeClass("opacity-head");
		}
	});
});

$(function() {
	var $menu = $('nav#mobile-menu'),
	$html = $('html, body');

	$menu.mmenu({
		dragOpen: true
	});

	var $anchor = false;
	$menu.find( 'li > a' ).on(
		'click',
		function( e )
		{
			$anchor = $(this);
		}
		);

	var api = $menu.data( 'mmenu' );
	api.bind( 'closed',
		function()
		{
			if ( $anchor )
			{
				var href = $anchor.attr( 'href' );
				$anchor = false;

							//	if the clicked link is linked to an anchor, scroll the page to that anchor 
							if ( href.slice( 0, 1 ) == '#' )
							{
								$html.animate({
									scrollTop: $( href ).offset().top
								});	
							}
						}
					}
					);
});

$(document).ready(function (){
	$("#tofooter").click(function (){
		$('html, body').animate({
			scrollTop: $("#footer").offset().top
		}, 1500);
	});
});

$(document).ready(function() {
            /*
            var defaults = {
                containerID: 'toTop', // fading element id
                containerHoverID: 'toTopHover', // fading element hover id
                scrollSpeed: 1200,
                easingType: 'linear'
            };
            */

            $().UItoTop({ easingType: 'easeOutQuart' });

        });