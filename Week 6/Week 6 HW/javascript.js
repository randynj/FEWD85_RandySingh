$(document).ready(function(){
    $("p#read-more-one").click(function(){
        $("p#hidden-text-one").toggle("slow");
        $(this).text($(this).text() == 'Read Less' ? 'Read More' : 'Read Less');
        
    });
});


$(document).ready(function(){
    $("p#read-more-two").click(function(){
        $("p#hidden-text-two").toggle("slow");
        $(this).text($(this).text() == 'Read Less' ? 'Read More' : 'Read Less');
        
    });
});


$(document).ready(function() {
	$(".learnmore").click(function() {
		$("#learnmoretext").slideDown("slow");
		$(this).hide(".learnmore");	
	})
})


$(document).ready(function() {
	$(".event-preventDefault").click(function(event) {
		event.preventDefault();
	});
});