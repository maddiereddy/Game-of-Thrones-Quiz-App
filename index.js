//-----------------To-Do Check List----------------------//
// 1. Hook up start button and render question page view while removing the landing page view
// 2. Display questions
// 3. Error Checking: make sure user makes a selection
// 4. Check answer and give correct answer on feedback page view
// 5. Display correct question number
// 6. Display correct scrore
// 7. Check if end of questions array and continue till end 
// 8. At end of questions array display results page view
// 9. Re-start quiz if requested

// Initialize global variables
let questionNum = 0;
let score = 0;
let totalQuestions = STORE.length;
 
// Listen for the re-start button to be clicked
// Re-load app if clicked
function restartQuiz () {

	$('.results-card').on('click', '#results-button', function (event) {
		location.reload();
	});
}

// Display comment text on results page
function addComment() {
  let commentText = "";

  // display different comment depending on user score 
  if (score === 0) {
    commentText = results-comments[0];
  } else if (score > 0 && score < 4) {
    commentText = COMMENTS[1];
  } else if (score > 3 && score < 7) {
    commentText = COMMENTS[2];
  } else if (score > 6 && score < 10) {
    commentText = COMMENTS[3];
  } else {
    commentText = COMMENTS[4];
  }

  $(".results-comments").text(`${commentText}`);
}

// check if list of questions completed 
// if not, continue to next question in array
// else, display results page
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
      addComment();
	  }
  });
}

// display pop up window that prompts user to make a selection
function selectionRequired(){
  
  $('body').append(`
    <div class="overlay">
      <div class="popup">
        <a class="close" href="#">&times;</a>
        <h2>Oops, forgot to pick an answer ?</h2>
        <img class="popup-gif" src="./giphy-downsized.gif" alt="Please make a selection">
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
      // display pop up window
      selectionRequired();
      return;

    } else {

      // different comment text based on if answer is correct
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

// listen for the Start button to be clicked
// hide landing page and display question page
function startQuiz () {

	$('.start-card').on('click', '#start-button', function (event) {
		event.preventDefault();

    $('.start-page').addClass("hidden");
    $('.question-page').removeClass("hidden");
	});
}

// run quiz app functions
function initQuiz () {
  startQuiz();
  renderQuestionPage();
  renderFeedbackPage();
  renderNextQuestion();
  restartQuiz();
}

$(initQuiz);