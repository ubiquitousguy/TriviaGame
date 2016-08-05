var questions = [{
    question: "Who's Seinfeld's next door neighbor?",
    choices: ["Newman", "George", "Elaine", "Kramer"],
    correctAnswer: 3 },

    { question: "When _____ Met Sally?",
    choices: ["John", "Harry", "Tom", "Elliot"],
    correctAnswer: 1},

   { question: "What's the bartender's name in Cheers?",
    choices: ["Sam", "James", "Norman", "George"],
    correctAnswer: 0 },

   { question: "Who plays Forest Gump?",
    choices: ["Tom Hanks", "Billy Crystal", "Keanu Reeves", "Tom Cruise"],
    correctAnswer: 0 },

    { question: "Who says 'Hey now'?",
    choices: ["Howard Stearn", "Bababooey", "Rush Limbaugh", "Dick Clark"],
    correctAnswer: 0 }];

    var currentQuestion = 0;
    var correctAnswers = 0;
    var quizOver = false;
    var count = 30;
    var counter=setInterval(timer,1000);
    var resetCounter = 30;

      function timer() {

        count=count-1;
        if (count == 0) {
          alert('GAME OVER!!!');
          clearInterval(counter);
          // return;
      }
        document.getElementById("timer").innerHTML=count + " secs";

  };

$(document).ready(function(){
  // Display the first question
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();

  // On clicking next, display the next question
  $(this).find(".nextButton").on("click", function () {
      if (!quizOver) {

          value = $("input[type='radio']:checked").val();

          if (value == undefined) {
              $(document).find(".quizMessage").text("Please select an answer");
              $(document).find(".quizMessage").show();
          } else {

              $(document).find(".quizMessage").hide();

              if (value == questions[currentQuestion].correctAnswer) {
                  correctAnswers++;
              }

              currentQuestion++;

              if (currentQuestion < questions.length) {
                  displayCurrentQuestion();
              } else {
                  displayScore();
                  //                    $(document).find(".nextButton").toggle();
                  //                    $(document).find(".playAgainButton").toggle();
                  // Change the text in the next button to ask if user wants to play again
                  $(document).find(".nextButton").text("Play Again?");

                  quizOver = true;

              }
          }
      } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
          quizOver = false;
          $(document).find(".nextButton").text("Next Question");
          resetQuiz();
          displayCurrentQuestion();
          hideScore();
      }
  });

// This displays the current question AND the choices
function displayCurrentQuestion() {

  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizBox > .question");
  var choiceList = $(document).find(".quizBox > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  // Set the questionClass text to the current question
  $(questionClass).text(question);

  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();

  var choice;
  for (i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
  }
}
function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  count = 30;
  $('#timer').html(count);
  hideScore();

}

function displayScore() {
  $(document).find(".quizBox > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizBox > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}


});
