//this block of code executes when user clicks on the 1st "Read More" under the 1st image
$(document).ready(function(){
    $("p#read-more-one").click(function(){
        $("p#hidden-text-one").toggle("slow");
        $(this).text($(this).text() == 'Read Less' ? 'Read More' : 'Read Less');
        
    });
});

//this block of code executes when user clicks on the 2nd "Read More" under the 2nd image
$(document).ready(function(){
    $("p#read-more-two").click(function(){
        $("p#hidden-text-two").toggle("slow");
        $(this).text($(this).text() == 'Read Less' ? 'Read More' : 'Read Less');
        
    });
});

//this block of code executes when user click "Learn More" in asides-two div
$(document).ready(function() {
	$(".learnmore").click(function() {
		$("#learnmoretext").slideDown("slow");
		$(this).hide(".learnmore");	
	})
})

//this block of code prevents the "Contact Us" link in header from re-directing to the outside URL
$(document).ready(function() {
	$(".event-preventDefault").click(function(event) {
		event.preventDefault();
	});
});