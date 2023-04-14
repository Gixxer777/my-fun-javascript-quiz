var quizArea = document.getElementById("quiz");
var startBtn = document.getElementById("startQuiz");
var timer = document.getElementById("timerEl");

var timerCount = 60;
var score;
var endQuiz = document.getElementById("endQuiz");
//var scoreForm = document.querySelector("#score");
var questions = [
  {
    question: "What is not a Javascript data type?",
    answerChoices: ["1. Number", "2. Modulus", "3. String", "4. Boolean"],
    correctAnswer: "2. Modulus",
  },
  {
    question: "What gives you the remainder after dividing two numbers?",
    answerChoices: ["1. Number", "2. Modulus", "3. String", "4. Boolean"],
    correctAnswer: "2. Modulus",
  },
  {
    question: "What does == check for in Javascript?",
    answerChoices: ["1. Equal in type and value", "2. Equal in value", "3. Greater than", "4. Less than"],
    correctAnswer: "2. Equal in value",
  },
  {
    question: "Which data type can be a true or false value in Javascript?",
    answerChoices: ["1. Number", "2. Boolean", "3. String", "4. Undefined"],
    correctAnswer: "2. Boolean",
  },
  {
    question: "How would you find the number of elements in an array?",
    answerChoices: ["1. Pop method", "2. Length property", "3. Push method", "4. Shift method"],
    correctAnswer: "2. Length property",
  }
]

var currentQuestion = 0;

function startQuiz(event) {
  event.preventDefault();
  // start the quiz!
  // 1. Start timer
	startTimer();
  // 2. create a question
 	generateQuestion();
  // 3. create answer choices
	//generateAnswerChoices();
  // 4. add event listeners to my answer choice buttons and that will validate whether they chose the right answer or not
    validateAnswer();
  // 5. move on to next question
	//currentQuestion++;
}

function generateQuestion() {
  var question = questions[currentQuestion].question;
  // create an element (p, div)
   var divEl = document.createElement("div")
  // write into that element using our question variable (textContent)
   divEl.textContent = questions[currentQuestion].question;
  // append that question element into our quiz area (appendChild)
   quizArea.appendChild(divEl);
  // generateAnswerChoices
  divEl.setAttribute("style", "text-align: center; font-size: 24px")
 generateAnswerChoices();
}

function generateAnswerChoices() {
  // for loop i < questions[currentQuestion].answerChoices.length
  for (i = 0; i < questions[currentQuestion].answerChoices.length; i++) {

  // create an element (button)
  var btnEl = document.createElement("button")
  // write into that element using our answerChoices variable (textContent)
  btnEl.textContent = questions[currentQuestion].answerChoices[i];
  // add event listener btn.addEventListener("click", validateAnswer)
 btnEl.onclick = function(e){
    validateAnswer(e);
 }
  // append that question element into our quiz area (appendChild)
  quizArea.appendChild(btnEl);
  btnEl.setAttribute("style", "align-items: center; font-size: 16px; margin: 120px")
  }
}

function validateAnswer(e) {
 // event.preventDefault();
  // grab text of button that was clicked (event.target.textContent)
  if (e.target.textContent === questions[currentQuestion].correctAnswer) {
    currentQuestion++;
  } else {
    timerCount-=10;
    currentQuestion++;
  }

	if (currentQuestion === questions.length) {
        endGame();
    } 
    // Clear quiz area
   quizArea.innerHTML = "";
  // call generateQuestion again to start on the next question
  generateQuestion();
}

function startTimer() {
  timer = setInterval(function() {
    if (timerCount > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timerCount + ' seconds remaining';
      // Decrement `timerCount` by 1
      timerCount--;
    } else if (timerCount === 1) {
      // When `timerCount` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timerCount + ' second remaining';
      timerCount--;
    } else {
      // Once `timerCount` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timerCount);
	endGame();
     
    }
  }, 1000)
}

function endGame() {

   clearInterval(timer)
  // score
  var score = timerCount;
  
}

function saveScore(event) {
  event.preventDefault();
  var score = JSON.parse(localStorage.getItem("score")) || []
  var scoreObj = {
    initials: event.target.children[0].value,
    score: timerCount,
  }
  score.push(scoreObj);
  // sets the score into local storage
  localStorage.setItem("score", JSON.stringify(score));
}

function getScore() {
  // get high score out of localstorage
  var score = JSON.parse(localStorage.getItem("score"))
  for (var i = 0; i < score.length;  i++) {
    console.log(score[i])
    var scoreEL = document.createElement("p");
    scoreEL.textContent = score[i].initials;
    endQuiz.appendChild(scoreEL);

}
}
getScore ();
startBtn.addEventListener("click", startQuiz);

scoreForm.addEventListener("submit", saveScore);