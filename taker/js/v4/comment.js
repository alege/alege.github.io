function cackleLinksReplacer(){
    $('.mc-comment-msg a').each(function(){ 
        $(this).html( decodeURIComponent( $(this).html() ) );
        var _href = $(this).attr('href');
        if( (_href.indexOf('http://') >= 0 || _href.indexOf('https://') >= 0) && _href.toLowerCase().indexOf(window.location.hostname) < 0){
            $(this).attr('href', '/phpBB2/goto/' + _href);
        }
    });
}

function cackleProviderButtonChange(buttonEl, redirectUrl)
{
  if (!buttonEl) {
    return;
  }

  buttonEl = $(buttonEl);

  var newButtonEl = buttonEl.clone(false);

  newButtonEl.insertAfter(buttonEl);
  buttonEl.remove();
  
  newButtonEl.bind('click', function(){
    var isGuest = !!$('#login_popup').length;
    if (isGuest) {
      window.location.href = redirectUrl;
    }
    else {
      window.location.reload();
    }
  });
}

function cackleTopCommentsSetTop(){
    if( !$("#top_comments_block .top_comments_inner").length )return false;

	var offset = $('#mc-container .mc-form').offset();
	var offset2 = $('#mc-container .mc-menu').offset();
	var top_pos = '-' + (offset2.top - offset.top + 50) + 'px';

	$("#top_comments_block .top_comments_inner").css("bottom", top_pos);
}

function cackleProviderReadyEvent(page_lnk)
{
	/*$(".mc-textarea-wrap textarea.mc-textarea").on("focus", function(){
		
		setTimeout(function(e) {
			cackleTopCommentsSetTop();
		}, 100);		
		
	});
	setTimeout(function(e) {
		cackleTopCommentsSetTop();
	}, 100);*/
	
    var hash = window.location.hash ;
    if(hash && hash == '#postbox'){
      jQuery('.mc-textarea-wrap textarea.mc-textarea').focus().click();
      jQuery('.mc-form').addClass('mc-expanded');
    }
    
    jQuery('.post-footer .comments a').click(function (){
      jQuery('.mc-textarea-wrap textarea.mc-textarea').focus().click();
      if(!jQuery('.mc-form').hasClass('mc-expanded')){
        jQuery('.mc-form').addClass('mc-expanded');
      }
      jQuery(window).scrollTop( jQuery('.mc-head').offset().top );
      return false;
    });
    
    // sso auth
    buttonEl = $('.mc-auth-social .mc-sso-provider');
    var newButtonEl = buttonEl.clone(false);
    newButtonEl.insertAfter(buttonEl);
    buttonEl.remove();
    
    newButtonEl.click(function (){
      if(jQuery(this).attr('title') == 'Taker.im'){
        var isGuest = !!$('#login_popup').length;
        if (isGuest) {
          loginPopupCall(page_lnk+'#postbox');
        }
        else {
          window.location.reload();
        }

        return false;
      }
    });
    
    $('.mc-textarea-wrap textarea.mc-textarea').on('paste',function(e) {
         //clear our link
         var self = this;
         setTimeout(function(e) {
             var splitted = $(self).val().split("\n");
             var result = [];
             var setReplace = false;
             for(var n = 0; n < splitted.length; n++) {
                 var thisRegex = new RegExp('Читать дальше: http:\/\/'+document.domain);
                 if(!thisRegex.test(splitted[n])){
                    result.push( splitted[n]+"\n" );
                 }else{
                     setReplace = true;
                     if(result[result.length-1] == "\n")
                     result[result.length-1] = '';
                 }
             }
             
             if(setReplace){
                var rStr = ''; 
                for(var n = 0; n < result.length; n++) {
                    rStr += result[n];
                }
                $(self).val(rStr);
             }
         }, 0);
    });
    
    $('.mc-dropdown-menu li a').each(function (){
        if($(this).html() == 'Создать свой виджет' || $(this).html() == 'О сервисе')    
            $(this).parent().remove();
    });
    
    $('.mc-comment-badge').each(function (){
        var username = $(this).parent().find('.mc-comment-username');
        if(username.html() != 'Balu'){
            $(this).html('Модератор');
        }
    });
}