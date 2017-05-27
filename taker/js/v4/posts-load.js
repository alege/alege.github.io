var PostsLoad = function(pageNumber, pageTopLnk) {

	var postsContainer = $("ul.reviews__cards");
	var loadingProcess = false;
	var pageNumber;
	var pageActiveNumber;
	var pagesCount;	
	var pageLnk;
	var pageTopLnk;
	var maxPaginationLinks = 6;	
	
	function init(){
		pageNumber = pageNumber*10 - 10;
		if(!pageNumber){
			pageNumber = 1;
		}
		if(!pagesCount){
			pagesCount = pageNumber + 8;
		}
		pageActiveNumber = pageNumber;
		
		pageLnk = location.href;
		pageLnk = pageLnk.replace(/&?a_page=[0-9]+/, '');
		var patt = /\?/g;
		if(patt.test(pageLnk)){		
			pageLnk = pageLnk + '&';
		}else{
			pageLnk = pageLnk + '?';
		}		
		
		setTimeout(function() { 
			$(window).scroll(windowScrollCheck);
			windowScrollCheck();
			
		}, 100);
	}	
		
	function windowScrollCheck(){
		var wt = $(window).scrollTop();
		
		if(!loadingProcess){
			postsContainer = $("ul.reviews__cards");
			var wb = wt + $(window).height();  			
			var ot = parseInt(postsContainer.offset().top);  
			var ob = ot + parseInt(postsContainer.height()) - 300; 
			
			if( wb >= ob && pageNumber < pagesCount ){			
				var page = pageActiveNumber + 1;
			
				if(page <= 0){
					page = 1;
				}
				if(page > pagesCount){
					return false;
				}
				console.log(page + " " +pagesCount);
				getPostsAjax(page);				
			}
		}		
	}
	
	function getPostsAjax(pageNum){
		loadingProcess = true;
		
		arrData = pageLnk.split('?'); 		
		var dataSend = arrData[1] + "a_page=" + pageNum ;
		
		$.ajax({
			url: pageTopLnk,
			data: dataSend,
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data){
					pageActiveNumber = pageNumber = pageNum;
					appendPosts(data);
				}else{
					pagesCount = pageNum;
				}
			}
		});
	}
	
	function appendPosts(data){
		
		var source   = jQuery("#post-thumb-template").html();
		var template = Handlebars.compile(source);
		
		var posts_html    = '';				
		for (var key in data) {		
		    posts_html += template({post: data[key]});
		}	

		postsContainer.append(posts_html);
		//paginationRebuildLinks();
		
		loadingProcess = false;
	}
	
	//Init call
	init();	
}