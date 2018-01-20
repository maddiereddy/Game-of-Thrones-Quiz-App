// 1. hook up start button and render question page view while removing the landing page view
// 2. display questions
// 3. check answer and give correct answer on feedback page view
// 4. display correct question number
// 5. display correct scrore
// 6. check if end of questions array and continue till end 
// 7. at end of array display results page view

let questionNum = 0;
let score = 0;
let totalQuestions = STORE.length;

// Listen for the Start button to be clicked
function restartQuiz () {
	$('.results-card').on('click', '#results-button', function (event) {
		location.reload();
	});
}

function renderNextQuestion() {
	$("#feedback-button").click(function(event){
    event.preventDefault();

    if(questionNum < totalQuestions) {
    	$(".question-page").removeClass("hidden");
    	$(".feedback-page").addClass("hidden");	

    	renderQuestionPage();
    } else {
    	$(".results-page").removeClass("hidden");
    	$(".feedback-page").addClass("hidden");	

    	// Comment and correct answer
	  	$(".results-score").text(`Score: ${score}/${totalQuestions}`);
	  	$(".results-comments").text(``);
    }
  });
}

function selectionRequired(){
    
  //popup selection required gif
  $('body').append(`
    <div class="overlay">
      <div class="popup">
        <a class="close" href="#">&times;</a>
        <h2>Oops, forgot to pick an answer </h2>
        <div class="gif-container">
          <img src="./giphy-downsized.gif" alt="Please make a selection">
        </div>
      </div>
    </div>`);
  $('.close').click(function () {
    $('.overlay').remove();
  })

}

function renderFeedbackPage() {
	// 0. Error Check - make sure user selected an answer
	// 1. Render Feedback page view
	// 2. Check Answer
	// 3. Display Correct Answer
	// 4. Update Score

	let isCorrect = "Wrong !";

	$("#question-button").click(function(event){

		event.preventDefault();

    let correctAnswer = STORE[questionNum].answers[STORE[questionNum].correctAnswer];
    let userChoice = $('input[name=answer]:checked').val();

    // If no answer is selected, prompt User
    // else update the correct counter
    if (userChoice === undefined) {
      selectionRequired();
      return;
    } else {
			if(userChoice === correctAnswer) {
	    	score++;
	    	isCorrect = "Correct !";
	    } else {
	    	isCorrect = "Wrong !";
	    }

			$(".question-page").addClass("hidden");
	    $(".feedback-page").removeClass("hidden");

	    // render current question number and score
	  	$(".feedback-number").text(`Question: ${(questionNum+1)}/${totalQuestions}`);
	  	$(".feedback-score").text(`Score: ${score}/${totalQuestions}`);

	  	// Comment and correct answer
	  	$(".feedback-comment").text(`${isCorrect} The correct answer is`);
	  	$(".feedback-answer").text(`${correctAnswer}`);

			questionNum++;	

		}
  });
}

// render question page view in DOM
function renderQuestionPage() {

	let question = STORE[questionNum].question;
  let answer1 = STORE[questionNum].answers[0];
  let answer2 = STORE[questionNum].answers[1];
  let answer3 = STORE[questionNum].answers[2];
  let answer4 = STORE[questionNum].answers[3];

  // Uncheck all radio buttons to clear previous selections
  $('input[name=answer]:checked').prop('checked', false);

	//render question and answers
  $('.question-text').text(question);
  $("#answer1").attr("value", answer1);
  $("#answer2").attr("value", answer2);
  $("#answer3").attr("value", answer3);
  $("#answer4").attr("value", answer4);
  $(".answer1-text").text(answer1);
  $(".answer2-text").text(answer2);
  $(".answer3-text").text(answer3);
  $(".answer4-text").text(answer4);

  // render current question number and score
  $(".question-number").text(`Question: ${(questionNum+1)}/${totalQuestions}`);
  $(".question-score").text(`Score: ${score}/${totalQuestions}`);
}

// Listen for the Start button to be clicked
function startQuiz () {
	$('.start-card').on('click', '#start-button', function (event) {
		event.preventDefault();

    $('.start-page').addClass("hidden");
    $('.question-page').removeClass("hidden");
	});
}

//run quiz functions
function initQuiz () {
  startQuiz();
  renderQuestionPage();
  renderFeedbackPage();
  renderNextQuestion();
  restartQuiz();
}

$(initQuiz);