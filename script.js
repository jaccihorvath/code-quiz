// question/answer arrays
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console log"],
        answer: "console log"
    },
];

// declare variables
var score = 0;
var questionIndex = 0;

// hook onto elements
var timeRemaining = document.querySelector("#timer");
var startTimer = document.querySelector("#start-button");
var newQuestion = document.querySelector(".question-container");
var container = document.querySelector(".container");

// timer intervals
var secondsLeft = 76;
var holdInterval = 0;
var timePenalty = 10;

// create multiple choice options
var displayChoices = document.createElement("ul");

// when start button is clicked, start timer
startTimer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
        secondsLeft--;
        timeRemaining.textContent = "time remaining: " + secondsLeft;

    if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                endQuiz();
                timeRemaining.textContent = "time's up!";
            }
    }, 1000);
}
display(questionIndex);
});

// displays next question
function display(questionIndex) {
    //clear previous data
    newQuestion.innerHTML = "";
    displayChoices.innerHTML = "";

    //for loop to loop through all info in the array
    for (var i = 0; i < questions.length; i++) {
        //displays question and answer choices
        var currentQuestion = questions[questionIndex].question;
        var currentChoices = questions[questionIndex].choices;
        newQuestion.textContent = currentQuestion;
    }

    //will show new possible answers for each new question
    currentChoices.forEach(function (newChoice) {
        var possibleChoice = document.createElement("li");
        possibleChoice.textContent = newChoice;
        newQuestion.appendChild(displayChoices);
        possibleChoice.setAttribute("class", "choices");
        displayChoices.appendChild(possibleChoice);
        //event listener for when an answer is selected
        possibleChoice.addEventListener("click", (check));

    })
}
//checks selected answer against correct answer to determine next move
function check(event) {
    var option = event.target;


    if (option.matches("li")) {
        var showResults = document.createElement("div");
        showResults.setAttribute("id", "show-results");

        //correct answer
        if (option.textContent == questions[questionIndex].answer) {
            score++;
            showResults.setAttribute("id", "correct-answer");
            showResults.textContent = "Correct!"
        //incorrect answer
        } else {
            //time penalty for wrong answers
            secondsLeft = secondsLeft - timePenalty;
            showResults.setAttribute("id", "wrong-answer");
            showResults.textContent = "Wrong! The correct answer is " + questions[questionIndex].answer;
        }

    }

    //goes to next question in the array
    questionIndex++;

    //if out of questions, will bring up end page
    if (questionIndex >= questions.length) {
        endQuiz();
    //otherwise, will display next question
    } else {
        display(questionIndex);
    }

    //shows the user whether their answer was correct or incorrect
    displayChoices.appendChild(showResults);
}

//displays end page
function endQuiz() {
    //clears display
    newQuestion.innerHTML = "";
    timeRemaining.innerHTML = "";

    //adds content to end page
    var newHeading = document.createElement("header");
    newHeading.textContent = "ALL DONE!";
    newQuestion.appendChild(newHeading);

    var endText = document.createElement("p");
    newQuestion.appendChild(endText);

    //determines score using time left on clock
    if (secondsLeft >= 0) {
        var timeLeftover = secondsLeft;
        clearInterval(holdInterval);
        endText.textContent = "Your final score is " + timeLeftover;

        newQuestion.appendChild(endText);
    }

    //creates text label prompting user to enter initials
    var enterInitials = document.createElement("label");
    enterInitials.setAttribute("id", "initials");
    enterInitials.textContent = "Enter initials";

    newQuestion.appendChild(enterInitials);

    //creates input for user to enter initials
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "initials");
    // newInput.textContent = "";

    newQuestion.appendChild(newInput);

    //creates submit button
    var submitInitials = document.createElement("button");
    submitInitials.setAttribute("type", "button");
    submitInitials.setAttribute("id", "submit-button");
    submitInitials.textContent = "submit";

    newQuestion.appendChild(submitInitials);

    //creates event listener for submit button
    submitInitials.addEventListener("click", function() {
        //stores user input as a variable
        var userInput = newInput.value;

        //checks to see if user inputed initials
        if (userInput === "") {
            //if user did not enter initials, logs "no value entered"
            alert("Please enter your initials");
            console.log("No value entered");
            
        } else {
            //if user enters initials, stores input as an object
            var highScore = {
                initials: userInput + " - ",
                score: timeLeftover
            }
            console.log(highScore);
            //adds initials and scores to local storage
            var allHighScores = localStorage.getItem("allHighScores");

            if (allHighScores === null) {
                allHighScores = [];
            } else {
                allHighScores = JSON.parse(allHighScores);
            }

            allHighScores.push(highScore);
            var newHighScore = JSON.stringify(allHighScores);
            localStorage.setItem("allHighScores", newHighScore);
            //takes user to highscores page
            window.location.replace("highscores.html");
        }
    });

}