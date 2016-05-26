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
	$('#score').text(score);
};

function randomNumGenerator () {
  return Math.floor(Math.random() * metraQuestions.length);
}

function loadRandomQuestion () {
  //random number generator

  // TODO: write function to generate a random index within our bounds (metraQuestions array length!!)
  var randIndex = randomNumGenerator();
  //answer options associated with the random number generated
  activeQuestion = metraQuestions[randIndex];

  while(activeQuestion.wasAsked) {
    // generate another random number and try again
    var randIndex = randomNumGenerator();
    //answer options associated with the random number generated
    activeQuestion = metraQuestions[randIndex];
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
    $('#score').text(score);
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
  if (qCount === 5) {
    $('#next').text("End of the line >");
  }
});


$('#next').on('click', function () {
  if (qCount === 5) {
    $('#question-page').slideUp();
    $('#end-page').slideDown();
    showResult();
  } else {
  loadCurrentInfo();
  loadRandomQuestion();
  renderButtonAnswers();
  }
});


var activeQuestion = null;
var metraQuestions = [
  {
  'question' : "Trains on which Metra line do not use locomotives?",
  'answers' : [
    {  'id' : 0, 'text' : "SouthWest Service" },
    {  'id' : 1, 'text' : "Metra Electric District" },
    {  'id' : 2, 'text' : "Rock Island District" },
    {  'id' : 3, 'text' : "BNSF Railway" }
  ],
  'correct' : 1,
  'explanation' : "Trains on the Metra Electric District are made up of electric self-propelled coaches (known as Highliners) powered by an overhead catenary wire system. Trains on Metra's 10 other lines are powered by diesel locomotives.",
  'wasAsked' : false
 },


 {
  'question' : "What is the only Metra station outside of Illinois?",
  'answers' : [
    {  'id' : 0, 'text' : "Hegewisch" },
    {  'id' : 1, 'text' : "Ingleside" },
    {  'id' : 2, 'text' : "Kenosha" },
    {  'id' : 3, 'text' : "Lake Villa" }
  ],
  'correct' : 2,
  'explanation' : "Kenosha, Wisconsin is the only community Metra serves outside of Illinois, and outside the six-county Regional Transportation Authority taxing area. Trains serving stations north of Waukegan are stored at a small coach yard located near the Kenosha station.",
  'wasAsked' : false
 },


 {
  'question' : "How many Metra lines are there?",
  'answers' : [
    {  'id' : 0, 'text' : "7" },
    {  'id' : 1, 'text' : "9" },
    {  'id' : 2, 'text' : "11" },
    {  'id' : 3, 'text' : "12" }
  ],
  'correct' : 2,
  'explanation' : "There are 11 Metra lines.",
  'wasAsked' : false
 },


 {
  'question' : "Metra Electric District trains are powered by:",
  'answers' : [
    {  'id' : 0, 'text' : "Third Rail" },
    {  'id' : 1, 'text' : "Overhead Catenary Wire" },
    {  'id' : 2, 'text' : "Rechargeable Battery" },
    {  'id' : 3, 'text' : "Power Cord" }
  ],
  'correct' : 1,
  'explanation' : "Trains on the Metra Electric District powered by an overhead catenary wire system.",
  'wasAsked' : false
 },


 {
  'question' : "On Metra diesel trains traveling inbound towards Chicago, where is the locomotive placed in the trainset?",
  'answers' : [
    {  'id' : 0, 'text' : "In Front" },
    {  'id' : 1, 'text' : "In Back" },
    {  'id' : 2, 'text' : "Second from the Back" },
    {  'id' : 3, 'text' : "Exact Center" }
  ],
  'correct' : 1,
  'explanation' : "On inbound trips, the locomotive is placed at the rear of the trainset and pushes the train to Chicago. On outbound trips, trains operate in pull mode with the locomotive in front, to minimize diesel emissions at downtown terminals.",
  'wasAsked' : false
 },


//  {
//   'question' : "A ____ car in each trainset is equipped with engineer controls.",
//   'answers' : [
//     {  'id' : 0, 'text' : "trailer" },
//     {  'id' : 1, 'text' : "bar" },
//     {  'id' : 2, 'text' : "power" },
//     {  'id' : 3, 'text' : "cab" }
//   ],
//   'correct' : 3,
//   'explanation' : "Engineer controls in the cab car allow \"push-pull\" operation of the train: on inbound trips, the locomotive at the rear of the consist pushes the train into Chicago; on outbound trips, trains operate in pull mode with the locomotive in front. This practice was pioneered on Chicago & North Western Railway’s Chicago commuter lines during the 1960s, eliminating the need to back the trainset into the nearest yard at the end of each run and reposition the locomotive at the front of the train.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "There are ____ Metra terminals in downtown Chicago.",
//   'answers' : [
//     {  'id' : 0, 'text' : "2" },
//     {  'id' : 1, 'text' : "4" },
//     {  'id' : 2, 'text' : "6" },
//     {  'id' : 3, 'text' : "8" }
//   ],
//   'correct' : 1,
//   'explanation' : "Metra has four downtown terminals: LaSalle Street Station, Millennium Station, Ogilvie Transportation Center, and Union Station.",
//   'wasAsked' : false
//  },
//  {
//   'question' : "Chicago Union Station is the downtown terminal for ____ Metra lines?",
//   'answers' : [
//     {  'id' : 0, 'text' : "2" },
//     {  'id' : 1, 'text' : "5" },
//     {  'id' : 2, 'text' : "6" },
//     {  'id' : 3, 'text' : "8" }
//   ],
//   'correct' : 2,
//   'explanation' : "Union Station serves six Metra lines. The Milwaukee District North and West lines, and the North Central Service, use the station\'s north platforms. The Heritage Corridor, BNSF Railway, and SouthWest Service use the south platforms.",
//   'wasAsked' : false
//  },
//    {
//   'question' : "Ogilvie Transportation Center serves which Metra lines?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Union Pacific lines" },
//     {  'id' : 1, 'text' : "Milwaukee District lines" },
//     {  'id' : 2, 'text' : "SouthWest Services" },
//     {  'id' : 3, 'text' : "Electric lines" }
//   ],
//   'correct' : 0,
//   'explanation' : "Ogilvie Transportation Center serves the three Metra lines owned and operated by Union Pacific Railroad.",
//   'wasAsked' : false
//  },
//  {
//   'question' : "Chicago Union Station is the nation’s third-busiest passenger railroad terminal, serving over 300 Metra and Amtrak trains each weekday. What percentage of passengers at this station are Metra riders?",
//   'answers' : [
//     {  'id' : 0, 'text' : "25%" },
//     {  'id' : 1, 'text' : "55%" },
//     {  'id' : 2, 'text' : "65%" },
//     {  'id' : 3, 'text' : "90%" }
//   ],
//   'correct' : 3,
//   'explanation' : "Ninety percent of the 120,000 passengers using Union Station each weekday are Metra riders.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "Which Metra downtown station was formerly known as Randolph Street Terminal?",
//   'answers' : [
//     {  'id' : 0, 'text' : "LaSalle Street Station" },
//     {  'id' : 1, 'text' : "Ogilvie Trans. Center" },
//     {  'id' : 2, 'text' : "Millennium Station" },
//     {  'id' : 3, 'text' : "Union Station" }
//   ],
//   'correct' : 2,
//   'explanation' : "Randolph Street Terminal was rebuilt during the construction of Millennium Park, and renamed \"Millennium Station\" in 2005.",
//   'wasAsked' : false
//  },
//  {
//   'question' : "Which Metra downtown terminal has a green roof?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Union Station" },
//     {  'id' : 1, 'text' : "Ogilvie Trans. Center" },
//     {  'id' : 2, 'text' : "LaSalle Street Station" },
//     {  'id' : 3, 'text' : "Millennium Station" }
//   ],
//   'correct' : 3,
//   'explanation' : "Millennium Park, which opened in 2004, was built atop Randolph Street Station, now known as Millennium Station.",
//   'wasAsked' : false
//  },
//    {
//   'question' : "The Union Pacific-Northwest Line crosses the North Central Service at ____ junction in Des Plaines.",
//   'answers' : [
//     {  'id' : 0, 'text' : "Prairie Crossing" },
//     {  'id' : 1, 'text' : "Deval" },
//     {  'id' : 2, 'text' : "Argo" },
//     {  'id' : 3, 'text' : "A-5" }
//   ],
//   'correct' : 1,
//   'explanation' : "The Union Pacific-Northwest Line and North Central Service, as well as Union Pacific's freight-only Milwaukee Subdivision, cross at Deval junction.",
//   'wasAsked' : false
//  },
//  {
//   'question' : "Which Metra line is the longest?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Metra Electric District" },
//     {  'id' : 1, 'text' : "Union Pacific-North" },
//     {  'id' : 2, 'text' : "Milwaukee District-North" },
//     {  'id' : 3, 'text' : "Union Pacific-Northwest" }
//   ],
//   'correct' : 3,
//   'explanation' : "The Union Pacific-Northwest Line extends 63.1 miles from downtown Chicago to Harvard, plus a 7.4-mile branch line to McHenry.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "Which Metra line began service in 1996?",
//   'answers' : [
//     {  'id' : 0, 'text' : "North Central Service" },
//     {  'id' : 1, 'text' : "SouthEast Service" },
//     {  'id' : 2, 'text' : "Heritage Corridor" },
//     {  'id' : 3, 'text' : "SouthWest Service" }
//   ],
//   'correct' : 0,
//   'explanation' : "The North Central Service to Antioch opened in August 1996--the first new commuter rail line in the Chicago region in 70 years.",
//   'wasAsked' : false
//  },
//     {
//   'question' : "Which station is the furthest from downtown Chicago?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Kenosha" },
//     {  'id' : 1, 'text' : "University Park" },
//     {  'id' : 2, 'text' : "Naperville" },
//     {  'id' : 3, 'text' : "Harvard" }
//   ],
//   'correct' : 3,
//   'explanation' : "Harvard, the last station on the Union Pacific-Northwest Line, is 63.1 miles from Ogilvie Transportation Center and is the furthest Metra station from dowtown.",
//   'wasAsked' : false
//  },
//  {
//   'question' : "Which Metra station is only open during the summer?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Hollywood/Zoo Stop" },
//     {  'id' : 1, 'text' : "Ravinia Park" },
//     {  'id' : 2, 'text' : "Winthrop Harbor" },
//     {  'id' : 3, 'text' : "McHenry" }
//   ],
//   'correct' : 1,
//   'explanation' : "Union Pacific-North Line trains only stop at the Ravinia Park Station during the summer concert season at nearby Ravinia Festival.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "How many stations are served by both Amtrak and Metra?",
//   'answers' : [
//     {  'id' : 0, 'text' : "1" },
//     {  'id' : 1, 'text' : "2" },
//     {  'id' : 2, 'text' : "5" },
//     {  'id' : 3, 'text' : "7" }
//   ],
//   'correct' : 3,
//   'explanation' : "Seven stations are served by both Amtrak and Metra: Chicago Union Station, Glenview, Homewood, Joliet, LaGrange/LaGrange Road, Naperville, and Summit.",
//   'wasAsked' : false
//  },
//    {
//   'question' : "Which Metra line is served by the most trains each weekday?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Rock Island District" },
//     {  'id' : 1, 'text' : "Metra Electric District" },
//     {  'id' : 2, 'text' : "Heritage Corridor" },
//     {  'id' : 3, 'text' : "BNSF Railway" }
//   ],
//   'correct' : 1,
//   'explanation' : "Of Metra's 11 lines, the Metra Electric District is served by the highest number of trains--170 each weekday on the mainline and Blue Island and South Chicago Branches. The Heritage Corridor has the fewest number of trains each weekday--six--with no service on weekends.",
//   'wasAsked' : false
//  },
//    {
//   'question' : "A station at which trains stop only on request is known as:",
//   'answers' : [
//     {  'id' : 0, 'text' : "A Flag Stop" },
//     {  'id' : 1, 'text' : "A Whistle Stop" },
//     {  'id' : 2, 'text' : "A Limited Stop" },
//     {  'id' : 3, 'text' : "An Outlying Terminal" }
//   ],
//   'correct' : 0,
//   'explanation' : "Certain Metra stations are designated as a \"flag stop\" for some or all trains. For the train to stop at a flag stop, passengers on board must notify a conductor, and passengers waiting at the station must be in view of the engineer.",
//   'wasAsked' : false
//  },
//    {
//   'question' : "Metra ranks number ____ among American commuter rail agencies in number of annual passenger trips.",
//   'answers' : [
//     {  'id' : 0, 'text' : "2" },
//     {  'id' : 1, 'text' : "4" },
//     {  'id' : 2, 'text' : "6" },
//     {  'id' : 3, 'text' : "8" }
//   ],
//   'correct' : 1,
//   'explanation' : "Metra provided 74.2 million passenger trips in 2014, the fourth-highest number among American commuter rail agencies. The top three agencies all serve the New York City area: Long Island Rail Road, Metro-North Commuter Railroad, and New Jersey Transit.",
// },
//    {
//   'question' : "Which of these is NOT an actual Metra ticket type?",
//   'answers' : [
//     {  'id' : 0, 'text' : "One-Way Ticket" },
//     {  'id' : 1, 'text' : "Weekly Pass" },
//     {  'id' : 2, 'text' : "10-Ride Ticket" },
//     {  'id' : 3, 'text' : "Monthly Pass" }
//   ],
//   'correct' : 1,
//   'explanation' : "Metra does not sell a weekly pass.",
// },
//      {
//   'question' : "What is the newest Metra station?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Big Timber Road/ Elgin" },
//     {  'id' : 1, 'text' : "Schiller Park" },
//     {  'id' : 2, 'text' : "Grand/Cicero" },
//     {  'id' : 3, 'text' : "35th St./\"Lou\" Jones" }
//   ],
//   'correct' : 3,
//   'explanation' : "35th St./\"Lou\" Jones Station on the Rock Island District, located near U.S. Cellular Field and the Illinois Institute of Technology, opened in 2011.",
//   'wasAsked' : false
//  },
//    {
//   'question' : "Which station on Chicago's northwest side shares its name with a nearby candy factory?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Healy" },
//     {  'id' : 1, 'text' : "Racine/Fannie May" },
//     {  'id' : 2, 'text' : "Mars" },
//     {  'id' : 3, 'text' : "Mayfair" }
//   ],
//   'correct' : 2,
//   'explanation' : "Mars Station is located near the Mars candy factory, which makes fun-size Three Musketeers, Milky Way, Dove and Munch bars.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "What railroad sold the Electric District to Metra in 1987?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Milwaukee Road" },
//     {  'id' : 1, 'text' : "Union Pacific" },
//     {  'id' : 2, 'text' : "Illinois Central Gulf" },
//     {  'id' : 3, 'text' : "Chicago, Aurora & Elgin" }
//   ],
//   'correct' : 2,
//   'explanation' : "Illinois Central Gulf (now known as Illinois Central) sold its commuter rail operations, equipment, and right-of-way to Metra in 1987. The tracks that parallel the Metra Electric District main line between McCormick Place and University Park are still owned by Illinois Central (now a subsidiary of Canadian National). ",
//   'wasAsked' : false
//  },
//   {
//   'question' : "Which Metra line has the most branches?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Union Pacific-Northwest" },
//     {  'id' : 1, 'text' : "Rock Island District" },
//     {  'id' : 2, 'text' : "Green Line" },
//     {  'id' : 3, 'text' : "Metra Electric District" }
//   ],
//   'correct' : 3,
//   'explanation' : "The Metra Electric District has the most branches, with two--the Blue Island Branch and South Chicago Branch--in addition to the Main Line.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "Ogilvie Transportation Center is named after:",
//   'answers' : [
//     {  'id' : 0, 'text' : "A Metra Board Member" },
//     {  'id' : 1, 'text' : "A Metra Engineer" },
//     {  'id' : 2, 'text' : "A Chicago Mayor" },
//     {  'id' : 3, 'text' : "An Illinois Governor" }
//   ],
//   'correct' : 3,
//   'explanation' : "As governor of Illinois from 1969 to 1973, Richard B. Ogilvie helped establish the Regional Transportation Authority. Later, Ogilvie oversaw the sale and reorganization of the bankrupt Milwaukee Road (predecessor of Metra’s two Milwaukee District lines).",
//   'wasAsked' : false
//  },
//  {
//     'question' : "Which current BNSF Railway station was historically known as \"Brush Hill\"?",
//     'answers' : [
//       {  'id' : 0, 'text' : "Congress Park" },
//       {  'id' : 1, 'text' : "Hinsdale" },
//       {  'id' : 2, 'text' : "Clarendon Hills" },
//       {  'id' : 3, 'text' : "LaVergne" }
//     ],
//     'correct' : 1,
//     'explanation' : "The village now known as Hinsdale was first named \"Brush Hill\" and later, \"Fullersburg.\"",
//     'wasAsked' : false
//   },
//   {
//     'question' : "Of named Metra locomotives, only one is not named after a person, Chicago neighborhood, municipality, county, or state. What is it?",
//     'answers' : [
//       {  'id' : 0, 'text' : "Northern Star" },
//       {  'id' : 1, 'text' : "Lake Michigan" },
//       {  'id' : 2, 'text' : "Village of Ontarioville" },
//       {  'id' : 3, 'text' : "Spirit of the Sears Tower" }
//     ],
//     'correct' : 2,
//     'explanation' : "Despite its name, Ontarioville is a small neighborhood in Hanover Park, not an incorporated village. (The other options aren\'t names of Metra locomotives.)",
//     'wasAsked' : false
//   },
//   {
//     'question' : "What year was Metra established?",
//     'answers' : [
//       {  'id' : 0, 'text' : "1952" },
//       {  'id' : 1, 'text' : "1973" },
//       {  'id' : 2, 'text' : "1983" },
//       {  'id' : 3, 'text' : "1992" }
//     ],
//     'correct' : 2,
//     'explanation' : "In 1983, the Illinois General Assembly reorganized the Regional Transportation Authority (RTA) into a planning and financial oversight agency and created the Commuter Rail Division of the RTA (later known as Metra) to directly operate rail service. Pace, the Suburban Bus Division of the RTA, was created at the same time.",
//     'wasAsked' : false
//   },
//   {
//   'question' : "There are ____ Metra stations.",
//   'answers' : [
//     {  'id' : 0, 'text' : "67" },
//     {  'id' : 1, 'text' : "154" },
//     {  'id' : 2, 'text' : "230" },
//     {  'id' : 3, 'text' : "241" }
//   ],
//   'correct' : 3,
//   'explanation' : "Metra\'s current station count is 241.",
//   'wasAsked' : false
//   },
//   {
//     'question' : "The oldest depot in use in Metra\'s system is located at which station?",
//     'answers' : [
//       {  'id' : 0, 'text' : "Lemont" },
//       {  'id' : 1, 'text' : "Union Station" },
//       {  'id' : 2, 'text' : "Riverside" },
//       {  'id' : 3, 'text' : "Kenilworth" }
//     ],
//     'correct' : 0,
//     'explanation' : "The Lemont depot was built in 1858 by the Chicago and Alton Railroad, and is the oldest depot in use in Metra\'s system. The Lockport depot, which is similar in style, opened in 1863. Lincoln's funeral train passed both buildings when it traveled between Chicago and Springfield in May 1865.",
//     'wasAsked' : false
//   },
//   {
//     'question' : "Which non-downtown Metra station has the highest ridership?",
//     'answers' : [
//       {  'id' : 0, 'text' : "Joliet" },
//       {  'id' : 1, 'text' : "Naperville" },
//       {  'id' : 2, 'text' : "Route 59" },
//       {  'id' : 3, 'text' : "Davis Street, Evanston" }
//     ],
//     'correct' : 2,
//     'explanation' : "According to Metra\'s 2014 Boarding/Alighting Count, Route 59 on the BNSF Line had the highest ridership of all stations, with 5,874 weekday boardings. Naperville, the next station to the east, was second, with 4,002 boardings.",
//     'wasAsked' : false
//   },
//   {
//     'question' : "Which Metra line attracts the highest number of reverse commuters (that is, riders traveling outbound in the morning and inbound in the evening)?",
//     'answers' : [
//       {  'id' : 0, 'text' : "BNSF" },
//       {  'id' : 1, 'text' : "Milwaukee District-West" },
//       {  'id' : 2, 'text' : "Union Pacific-West" },
//       {  'id' : 3, 'text' : "Union Pacific-North" }
//     ],
//     'correct' : 3,
//     'explanation' : "Union Pacific-North has the highest number of reverse commuters, and the highest number of trips that neither begin or end downtown. Dense development along this line, in Chicago and lakefront suburbs to the north, has led to heavy use of outlying UP-N stations as destination stations. Over 25% of UP-N morning peak-period alightings take place at non-downtown stations.",
//     'wasAsked' : false
//   },
//   {
//   'question' : "Trains on the two Milwaukee District lines are dispatched from which city?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Crystal Lake, Illinois" },
//     {  'id' : 1, 'text' : "Omaha, Nebraska" },
//     {  'id' : 2, 'text' : "Chicago, Illinois" },
//     {  'id' : 3, 'text' : "Minneapolis, Minnesota" }
//   ],
//   'correct' : 3,
//   'explanation' : "Both Milwaukee District lines are owned and operated by Metra but dispatched by Canadian Pacific from Minneapolis. Canadian Pacific operates freight trains over Metra-owned track and owns track beyond the extent of commuter service (north of Rondout junction on the Milwaukee District-North; west of Big Timber Road on the Milwaukee District-West).",
//   'wasAsked' : false
//   },
//   {
//   'question' : "The predecessor of which Metra line operated out of Dearborn Station in the South Loop?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Rock Island District" },
//     {  'id' : 1, 'text' : "Union Pacific-South" },
//     {  'id' : 2, 'text' : "BNSF Railway" },
//     {  'id' : 3, 'text' : "SouthWest Service" }
//   ],
//   'correct' : 3,
//   'explanation' : "Historically, intercity and commuter service operated by the Wabash and then the Norfolk & Western—which pre-dated Metra on what is now the SouthWest Service—terminated at Dearborn Station. The station closed in May 1971 with the start of Amtrak and the consolidation of Chicago\'s remaining intercity passenger routes at Union Station. The N&W constructed a small brick building just west of Dearborn Station to serve commuters riding its one round-trip train each weekday. This building was used for five years, until a new connecting track was added at 21st Street Junction, allowing N&W commuter service to begin operating out of Union Station in December 1976. After that, the Polk Street Terminal was closed, ending the last remnant of passenger service at/near Dearborn Station.",
//   'wasAsked' : false
//   },
//   {
//   'question' : "What percentage of Metra riders systemwide use station park-and-ride lots?",
//   'answers' : [
//     {  'id' : 0, 'text' : "16%" },
//     {  'id' : 1, 'text' : "38%" },
//     {  'id' : 2, 'text' : "52%" },
//     {  'id' : 3, 'text' : "74%" }
//   ],
//   'correct' : 2,
//   'explanation' : "In 2014, 52% of weekday Metra riders accessed their boarding station in a car they parked at the station. Automobile access rates rise with a station's distance from downtown Chicago—in 2014, 68% of Metra riders boarding at stations over 25 miles from downtown drove to the station.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "How many Metra trains operate each weekday?",
//   'answers' : [
//     {  'id' : 0, 'text' : "110" },
//     {  'id' : 1, 'text' : "552" },
//     {  'id' : 2, 'text' : "704" },
//     {  'id' : 3, 'text' : "951" }
//   ],
//   'correct' : 2,
//   'explanation' : "Metra and its contract carriers (BNSF and Union Pacific) operate 704 revenue trains each weekday.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "How many Metra stations are located in the City of Chicago?",
//   'answers' : [
//     {  'id' : 0, 'text' : "15" },
//     {  'id' : 1, 'text' : "29" },
//     {  'id' : 2, 'text' : "51" },
//     {  'id' : 3, 'text' : "77" }
//   ],
//   'correct' : 3,
//   'explanation' : "Metra is known for serving suburban riders, but 77 of Metra\'s 241 stations are located in Chicago.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "Which Metra predecessor railroad introduced the bi-level \"gallery car\"?",
//   'answers' : [
//     {  'id' : 0, 'text' : "C & NW" },
//     {  'id' : 1, 'text' : "C R I & P" },
//     {  'id' : 2, 'text' : "Milwaukee Road" },
//     {  'id' : 3, 'text' : "C B & Q" }
//   ],
//   'correct' : 3,
//   'explanation' : "Bi-level gallery cars feature a single row of seating on each side of the upper level, allowing conductors to check tickets and collect fares on both levels from the lower level. The design was introduced in 1950 by the Chicago, Burlington and Quincy Railroad, a predecessor of the BNSF, to increase capacity and revenue on their commuter line to Aurora.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "On its weekend trains, Metra lifted a ban on ____ in October 2015.",
//   'answers' : [
//     {  'id' : 0, 'text' : "Pets" },
//     {  'id' : 1, 'text' : "Alcohol" },
//     {  'id' : 2, 'text' : "Smoking" },
//     {  'id' : 3, 'text' : "Bikes" }
//   ],
//   'correct' : 0,
//   'explanation' : "Following a successful pilot program on weekend Rock Island District trains, Metra expanded its pets on trains pilot to all lines (until January 31, 2016).",
//   'wasAsked' : false
//  },
//   {
//   'question' : "On peak-period, peak direction trains, the Quiet Car is typically the ____ car from the locomotive.",
//   'answers' : [
//     {  'id' : 0, 'text' : "First" },
//     {  'id' : 1, 'text' : "Second" },
//     {  'id' : 2, 'text' : "Third" },
//     {  'id' : 3, 'text' : "Fourth" }
//   ],
//   'correct' : 1,
//   'explanation' : "On trains with six or more cars, the designated Quiet Car is the second car from the locomotive or cab car.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "How many locomotives are in Metra\'s fleet?",
//   'answers' : [
//     {  'id' : 0, 'text' : "77" },
//     {  'id' : 1, 'text' : "146" },
//     {  'id' : 2, 'text' : "310" },
//     {  'id' : 3, 'text' : "644" }
//   ],
//   'correct' : 1,
//   'explanation' : "There are 146 locomotives in Metra\'s fleet.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "What year were the last bar cars eliminated from Metra trains?",
//   'answers' : [
//     {  'id' : 0, 'text' : "1977" },
//     {  'id' : 1, 'text' : "1984" },
//     {  'id' : 2, 'text' : "2004" },
//     {  'id' : 3, 'text' : "2008" }
//   ],
//   'correct' : 3,
//   'explanation' : "Metra\'s bar cars made their last runs on the Rock Island District and Milwaukee District-North and West lines in 2008.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "The private railcar running twice each weekday on Union Pacific-North trains is known as:",
//   'answers' : [
//     {  'id' : 0, 'text' : "Car 553" },
//     {  'id' : 1, 'text' : "The Evanstonian" },
//     {  'id' : 2, 'text' : "The Pioneer"},
//     {  'id' : 3, 'text' : "Gen. Sheridan" }
//   ],
//   'correct' : 0,
//   'explanation' : "Car 553 is the last privately owned commuter railcar in the country. As of 2012, the car was open to anyone who paid an annual fee of $900 (in addition to the cost of a Metra monthly ticket).",
//   'wasAsked' : false
//  },
//   {
//   'question' : "The line that is now the ____ was the first railroad built out of Chicago.",
//   'answers' : [
//     {  'id' : 0, 'text' : "Metra Electric District" },
//     {  'id' : 1, 'text' : "Union Pacific-West" },
//     {  'id' : 2, 'text' : "Union Pacific-North" },
//     {  'id' : 3, 'text' : "Rock Island District" }
//   ],
//   'correct' : 1,
//   'explanation' : "The first westbound train out of Chicago departed on October 25, 1848, on the Galena & Chicago Union Railroad. Today, the G&CU\'s main line between Chicago and West Chicago is part of the Union Pacific-West Line.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "Which of these cities has the most Metra stations?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Downers Grove" },
//     {  'id' : 1, 'text' : "Blue Island" },
//     {  'id' : 2, 'text' : "Evanston" },
//     {  'id' : 3, 'text' : "Highland Park" }
//   ],
//   'correct' : 1,
//   'explanation' : "After Chicago, Blue Island has the highest number of Metra stations. Blue Island\'s seven stations are: Burr Oak and Blue Island on the Metra Electric District Blue Island Branch, and 123rd Street, Prairie Street, and Vermont St., Blue Island on the Rock Island District Beverly Branch, and Vermont St., Blue Island (again) on the Rock Island District Main Line. Metra counts Vermont Street as two separate stations, since one side serves Beverly Branch trains and the other serves Main Line trains.",
//   'wasAsked' : false
//  },
//   {
//   'question' : "Which of these is not the name of a Metra station?",
//   'answers' : [
//     {  'id' : 0, 'text' : "Palos Hills" },
//     {  'id' : 1, 'text' : "Ashburn" },
//     {  'id' : 2, 'text' : "Ingleside" },
//     {  'id' : 3, 'text' : "Calumet" }
//   ],
//   'correct' : 0,
//   'explanation' : "The SouthWest Service serves Palos Heights and Palos Park stations, but Palos Hills does not have a Metra station.",
//   'wasAsked' : false
//  },
//   {
//     'question' : "Which of the following Metra lines would NOT connect with the first phase of the proposed STAR Line?",
//     'answers' : [
//       {  'id' : 0, 'text' : "Milwaukee District-West" },
//       {  'id' : 1, 'text' : "Union Pacific-West" },
//       {  'id' : 2, 'text' : "North Central Service" },
//       {  'id' : 3, 'text' : "Rock Island District" }
//     ],
//     'correct' : 3,
//     'explanation' : "The first phase of the proposed STAR Line would connect with the North Central Service, Milwaukee District-West, Union Pacific-West, and BNSF. Future phases may extend further north and east.",
//     'wasAsked' : false
//   }
];



function scoreRenderer(prize, icon, message) {
  $('#prize').html('<id="prize">' + prize);
  $('#prize-icon img').attr('src', icon)
  $('.prize-msg-text').html('<p>' + message + '</p>');
}

function showResult() { 
  $('.score-msg #score').text(score);
  if (score > 15) {
    scoreRenderer(
      'Golden Ticket!', 'img/golden-ticket2.svg', 'Impressive. You&#39;re clearly a Metra expert, and deserve to travel in style with unlimited, free rides anywhere in the system.'
    );
  } 

  else if (score > 4) {
    scoreRenderer(
      'Conductor&#39;s <br>Hat!', 'img/conductor-hat.svg', 'Not bad. In cool weather, your new hat will keep your head warm, and help protect the valuable Metra knowledge inside.'
    );
  } 

  else {
    scoreRenderer(
      'Just Go Home.', 'img/rail-spike.svg', 'You kinda suck at this.'
    );

  };  
}

// When page loads, load info and random question
loadCurrentInfo();
loadRandomQuestion();
renderButtonAnswers();
