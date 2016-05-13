
// $('read-more').on('click', function() {
// 	$(this).toggleClass('button-display');
// })

button = document.getElementByTagnName('button');
read-more = document.getElementByTagnName('button-display');

function show(x) {
	button-display[x].style.display = 'block';
	button[x].onclick = function() {
		hide(x);
	}
}
function hide(x) {
	button-display[x].style.display = 'none';
	button[x].onclick = function() {
		show(x);
	}
}
