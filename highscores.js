//declare variables
var highScores = document.querySelector(".highscore");
var tryAgain = document.querySelector("#try-again");
var clearScores = document.querySelector("#clear-button");

//event listener to clear out high scores
clearScores.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

//gets info from local storage
var allHighScores = localStorage.getItem("allHighScores");
allHighScores = JSON.parse(allHighScores);

//loops through to retrieve highscores and displays them to page
if (allHighScores) {
    for (var i = 0; i < allHighScores.length; i++) {
        var addHighScore = document.createElement("li");
        addHighScore.textContent = allHighScores[i].initials + " " + allHighScores[i].score;

        highScores.appendChild(addHighScore);
    }
}
//event listener to redirt user back to homepage to play again
tryAgain.addEventListener("click", function () {
    window.location.replace("index.html");
})