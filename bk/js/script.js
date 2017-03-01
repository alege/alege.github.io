if ($(window).width()<540) {
	$(document).ready(function(){
		$("#btn").css("top","initial");
		$("#btn").css("margin-top", $(".navbar").height()/2-20);
	});
}
$( window ).resize(function() {
	if ($(window).width()<540) {
		$("#btn").css("top","initial");
		$("#btn").css("margin-top", $(".navbar").height()/2-20);
	}
});