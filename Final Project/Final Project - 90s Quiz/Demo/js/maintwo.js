var qCount = 0;
var score = 0;
var randIndex;

function loadCurrentInfo () {

//remove option button styling from previous turn
	$('button').removeClass('incorrect correct');
	$('button').addClass('normal');
	$('button').prop('disabled', false);

//hide answer panel from previous turn	
	$('#ans-info').slideUp();

//increase question count by 1, show current question count and score
	qCount++;
	$('#question-count').text(qCount);
	$('.score').text(score);
};

function randomNumGenerator () {
  return Math.floor(Math.random() * NinetysQuestions.length);
}

function loadRandomQuestion () {
  //random number generator

  // TODO: write function to generate a random index within our bounds (NinetysQuestions array length!!)
  var randIndex = randomNumGenerator();

  //answer options associated with the random number generated
  activeQuestion = NinetysQuestions[randIndex];

  while(activeQuestion.wasAsked) {
    // generate another random number and try again

    var randIndex = randomNumGenerator();
    //answer options associated with the random number generated

    activeQuestion = NinetysQuestions[randIndex];
  }
  // new question
  // return question object to another function for rendering
  renderButtonAnswers();
};

// this function is called for its side-effects, NOT its return value
function renderButtonAnswers() {
  var answers = activeQuestion.answers,
      buttons = $('.answer-container button');

  for(var i = 0, len = answers.length; i < len; i++) {
    var button = buttons[i],
        answer = answers[i];

    $(button).text(answer.text);
    $(button).attr('data-id', answer.id);
  }

 // change wasAsked in questions array to true, so that question is not picked again in loadRandomQuestion
  activeQuestion.wasAsked = true;

	$('#question p').html(activeQuestion.question);

};


$('.option').on('click', function() {

  if ($(this).data('id') !== activeQuestion.correct) {

// If clicked option is incorrect, clicked button turns red
    $(this).removeClass('normal').addClass('incorrect');

// If clicked option is incorrect, "Sorry" message displays
    $('#result-message').html('Sorry, that&#39;s incorrect.');
  } else {

// If clicked option is correct, "You're right" message displays
    $('#result-message').html('That&#39;s right!');
    score++;
    $('.score').text(score);
  }


// Button for correct answer turns green (whether or not it was clicked)
  $('[data-id="' + activeQuestion.correct + '"]').removeClass('normal').addClass('correct');

//Answer/explanation panel displays
  $('#ans-info').slideDown(500);

// Show answer explanation(same text whether or not answer is correct)
  $('#explanation p').text(activeQuestion.explanation);

// Once an option is clicked, hover effect disabled on options
  $('.option').prop('disabled', true);

  // if the game is over time to change the link text so the user knows what's up
  if (qCount === 10) {
    $('#next').text("Lets See How You Did >");
  }
});


$('#next').on('click', function () {
  if (qCount === 10) {
    $('#question-page').slideUp();
    $('#end-page').slideDown();
    showResult();
  } else {
  loadCurrentInfo();
  loadRandomQuestion();
  renderButtonAnswers();
  }
});

// JSON format for all 10 questions
var activeQuestion = null;
var NinetysQuestions = [
  {
  'question' : "This was the highest grossing basketball movie (and still is)",
  'answers' : [
    {  'id' : 0, 'text' : "White Man Can't Jump" },
    {  'id' : 1, 'text' : "Space Jam" },
    {  'id' : 2, 'text' : "Air Bud" },
    {  'id' : 3, 'text' : "Hoosiers" }
  ],
  'correct' : 1,
  'explanation' : "Released in 1996, Space Jam garnered over $27 Million its opening weekend.",
  'wasAsked' : false
 },


 {
  'question' : "Britney Spears debut album in 1999 was also the title of her first single.",
  'answers' : [
    {  'id' : 0, 'text' : "Oops!...I Did It Again" },
    {  'id' : 1, 'text' : "Womanizer" },
    {  'id' : 2, 'text' : "...Baby One More Time" },
    {  'id' : 3, 'text' : "(I Can't Get No) Satisfaction" }
  ],
  'correct' : 2,
  'explanation' : "...Baby One More Time became a world-wide success and (as a single) has over 10 million copies.",
  'wasAsked' : false
 },


 {
  'question' : "He was Will Smith's childhood friend and DJ before Will began a solo career in rap.",
  'answers' : [
    {  'id' : 0, 'text' : "Avery Bradley" },
    {  'id' : 1, 'text' : "Jill Scoot" },
    {  'id' : 2, 'text' : "Jefferey Allen Townes" },
    {  'id' : 3, 'text' : "John Witherspoon" }
  ],
  'correct' : 2,
  'explanation' : "Also known as DJ Jazzy Jeff, he and Will Smith released 5 studio albums between 1986 and 1994.",
  'wasAsked' : false
 },


 {
  'question' : "This show ran from 1989-1992 and was centered on 6 high school student in Bayside High School in Palisades, California.",
  'answers' : [
    {  'id' : 0, 'text' : "Saved By The Bell" },
    {  'id' : 1, 'text' : "Boy Meets World" },
    {  'id' : 2, 'text' : "Even Stevens" },
    {  'id' : 3, 'text' : "Hey Arnold" }
  ],
  'correct' : 0,
  'explanation' : "The show was named one of the 20 Best School Shows of all Time by AOL TV",
  'wasAsked' : false
 },


 {
  'question' : "Finish the first line of the Full House theme song Whatever happened to ____",
  'answers' : [
    {  'id' : 0, 'text' : "All that stuff in between" },
    {  'id' : 1, 'text' : "Predictability" },
    {  'id' : 2, 'text' : "Nancy and her Jeans" },
    {  'id' : 3, 'text' : "Good 'ol Billy Jean" }
  ],
  'correct' : 1,
  'explanation' : "The theme song is titled Everywhere You Look",
  'wasAsked' : false
 },


 {
  'question' : "Which 90s TV show featured characters named: Tommy, Zack, Kimberly, Billy, and Trini?",
  'answers' : [
    {  'id' : 0, 'text' : "Beverly Hills 90210" },
    {  'id' : 1, 'text' : "Pokemon" },
    {  'id' : 2, 'text' : "All That" },
    {  'id' : 3, 'text' : "Power Rangers" }
  ],
  'correct' : 3,
  'explanation' : "Power Rangers aired 3 seasons from 1993 to 1993",
  'wasAsked' : false
 },

  {
  'question' : "Rap music was becoming very well known in the 90s. Which artist had the first number one rap single?",
  'answers' : [
    {  'id' : 0, 'text' : "MC Hammer" },
    {  'id' : 1, 'text' : "DJ Jazzy Jeff and the Fresh Prince" },
    {  'id' : 2, 'text' : "Vanilla Ice" },
    {  'id' : 3, 'text' : "Notorius BIG" }
  ],
  'correct' : 2,
  'explanation' : "Vanilla Ice released Ice Ice Baby in 19",
  'wasAsked' : false
 },

 {
  'question' : "Which east coast record company had hig success with artists such as Biggie, Mas, and Total?",
  'answers' : [
    {  'id' : 0, 'text' : "Murder Inc" },
    {  'id' : 1, 'text' : "Death Row" },
    {  'id' : 2, 'text' : "Bad Boy" },
    {  'id' : 3, 'text' : "Motown" }
  ],
  'correct' : 2,
  'explanation' : "Bad Boy records was founded by Sean 'Puffy/P.Diddy/Puff Daddy' Combs. Other Bad Boy artists include Lil' Kim, Junior Mafia, Harlem World, Craig Mack, 112, Faith Evans, Carl Thomas, Loon, and the Lox.",
  'wasAsked' : false
 },
 {
  'question' : "The Chicago Bulls won the NBA championship from 1991-1993 and again from 1996-1998. Who won it from 1994-1995?",
  'answers' : [
    {  'id' : 0, 'text' : "Houston Rockets" },
    {  'id' : 1, 'text' : "Milwaukee Bucks" },
    {  'id' : 2, 'text' : "Los Angeles Lakers" },
    {  'id' : 3, 'text' : "Detroit Pistons" }
  ],
  'correct' : 0,
  'explanation' : "Led by Hakeen Olajuwon the Houston won back to back championships during Michael Jordan 2 year absense.",
  'wasAsked' : false
 },
 {
  'question' : "Which of these Disney movies did NOT debut in the 90's?",
  'answers' : [
    {  'id' : 0, 'text' : "Beauty and the Beast" },
    {  'id' : 1, 'text' : "The Little Mermaid" },
    {  'id' : 2, 'text' : "The Lion King" },
    {  'id' : 3, 'text' : "Tarzan" }
  ],
  'correct' : 1,
  'explanation' : "The Little Mermaid debuted in 1989",
  'wasAsked' : false
 }

];



function scoreRenderer(prize, icon, message) {
  $('#prize').html('<id="prize">' + prize);
  $('#prize-icon img').attr('src', icon)
  $('.prize-msg-text').html('<p>' + message + '</p>');
}

// displays score, text and image for score greater than 8
function showResult() { 
  $('.score-msg .score').text(score);
  if (score > 8) {
    scoreRenderer(
      'Nice Work!', 'images/carltondance.gif', 'Finally someone who knows their sh!t'
    );
  } 
// displays score, text and image for score greater than 5
  else if (score > 5) {
    scoreRenderer(
      'Not Quite There Yet', 'images/notquitethere.gif', 'You sure you know the 90s bruh'
    );
  } 

// displays score, text and image for score less than or equal to 5
  else {
    scoreRenderer(
      'Too Bad', 'images/carltonomg.gif', 'Even Carlton is worried for you'
    );

  };  
}

// When page loads, load info and random question
loadCurrentInfo();
loadRandomQuestion();
renderButtonAnswers();
