'use strict'

const CONTENT = [
    {
        question: 'Originated in Italy. A pale yellow colored cheese made from sheep\'s or cow\'s milk. Typically grated or shredded. Flavor(s) - salty, sharp, smokey, spicy.',
        choices: ['Mozzarella', 'Parmesan', 'Ricotta', 'Pecorino Romano'],
        answer: 'Pecorino Romano'
    },
    {
        question: 'Originated in France. A cream colored cheese made from cow\'s milk. Typically has a soft inside encased by a rind. Flavor(s) - mild, fruity, nutty, tangy.',
        choices: ['Gorgonzola', 'Brie', 'Bleu', 'Goat'],
        answer: 'Brie'
    },
    {
        question: 'Originated in the United States. A white or orange colored cheese made from cow\'s milk. Typically sliced or added to sandwiches. Flavor(s) - mild, creamy.',
        choices: ['Cheddar', 'Provolone', 'American', 'Muenster'],
        answer: 'American'
    },
    {
        question: 'Originated in Italy. A pale yellow colored cheese made from cow\'s milk. Typically grated or shredded. Flavor(s) - savory, sharp, fruity, nutty.',
        choices: ['Ricotta', 'Parmesan', 'Mozzarella', 'Pecorino Romano'],
        answer: 'Parmesan'
    },
    {
        question: 'Originated in Italy. A white colored cheese made from cow\'s, goat\'s, sheep\'s, & water buffalo\'s milk. Typically spooned or used as a filling. Flavor(s) - sweet.',
        choices: ['Ricotta', 'Havarti', 'Burrata', 'Mozzarella'],
        answer: 'Ricotta'
    },
    {
        question: 'Originated in England. A white or orange cheese made from cow\'s milk. Typically sliced, cubed, or added to sandwiches. Flavor(s) - mild, sharp, creamy.',
        choices: ['American', 'Muenster', 'Cheddar', 'Provolone'],
        answer: 'Cheddar'
    },
    {
        question: 'Originated in Italy. A white colored cheese made from water buffalo\'s milk. Typically has a soft inside encased by a thin outer shell. Flavor(s) - milky, buttery.',
        choices: ['Burrata', 'Mozzarella', 'Ricotta', 'Gouda'],
        answer: 'Burrata'
    },
    {
        question: 'Originated in Greece. A white colored cheese made from goat\'s & sheep\'s milk. Typically crumbled. Flavor(s) - salty, tangy.',
        choices: ['Bleu', 'Goat', 'Gorgonzola', 'Feta'],
        answer: 'Feta'
    },
    {
        question: 'Originated in Italy. A white colored cheese made from water buffalo\'s milk. Typically sliced or shredded. Flavor(s) - milky.',
        choices: ['Gouda', 'Burrata', 'Mozzarella', 'Ricotta'],
        answer: 'Mozzarella'
    },
    {
        question: 'Originated in Italy. A pale white/yellow colored cheese made from cow\'s milk. Typically sliced or added to sandwiches. Flavor(s) - mild, sharp, buttery, spicy, sweet, tangy.',
        choices: ['American', 'Provolone', 'Muenster', 'Cheddar'],
        answer: 'Provolone'
    }
];

let currentQuestion = 0;
let currentScore = 0;

//listen for click on 'start'
//remove instructions & submit button
//load first question
//load question & score
function handleStartQuiz() {
$('.js-submit-btn').on('click', function(event) {   
    event.preventDefault();                        
    $('.js-instructions').remove();                
    $('.js-submit-btn').remove();                 

    $('.js-quiz').html(createQuestion());        
    $('.js-footer').html(displayScore());       
});
}

//return the question HTML
function createQuestion() {

const choicesHTML = CONTENT[currentQuestion].choices.reduce((accumulator, choice, index) => {
  accumulator += `
        <div>
            <input required type="radio" id="choice${index}" name="choice" value="${choice}">
            <label for="choice${index}">${choice}</label>
        </div>`;
        return accumulator
}, '')

  return ` 
    <form class="form">
    <fieldset>
      <legend>
        <h1>Question ${currentQuestion + 1} of 10</h1>
        <p>${CONTENT[currentQuestion].question}</p>
      </legend>
        ${choicesHTML}
        <button type="submit" name="submit" class="answer js-answer-btn">Submit Answer</button>
        </fieldset>
</form>`;
}

//return the score html
function displayScore() {
    return `
    <div class="scorecard">
        <h2>Current score: ${currentScore} / 10</h2>
    </div>`;
}

//listen for click on 'submit answer' button
//check if radio button was selected
//userInput set to checked radio button
//check user input against answer
//if correct, set correct feedback & increment score
//if incorrect, set incorrect feedback
//display feedback
//display updated question & score
function evaluateAnswer(){
    $('body').on('submit', '.form', function(event) {
    event.preventDefault();

    let feedback = '';                               
    let userInput = $('input[type=radio]:checked').val();let correctAnswer = CONTENT[currentQuestion].answer;
     
     if (userInput === correctAnswer) {                 
          currentScore++                               
          feedback = ` 
            <div class="correct-feedback">
                <h1>You are correct!</h1>
                <button type="submit" name="submit" class="next js-next-btn">Move On</button>
            <div>`;
      } else {                                              feedback = `                                    
            <div class="incorrect-feedback">
                <h1>Woops! You are incorrect.</h1>
                <p>The correct answer was ${correctAnswer}</p>
                <button type="submit" name="submit" class="next js-next-btn">Move On</button>
            </div>`;
        }   
        currentQuestion++;
        $('.js-quiz').html(feedback);        
        $('.js-footer').html(displayScore());      
});
}

//listen for a click on the 'next quesion' button
//increment question
//if final question, display final results html & remove current score
//if not final question, display next question html
//display updated question & score
function nextQuestion() {
$('body').on('click', '.js-next-btn', function(event) {
    event.preventDefault();                   
    if (currentQuestion === CONTENT.length) {           
        $('.js-quiz').html(displayFinalResults());
        $('.js-footer').html('');
    } else {
        $('.js-quiz').html(createQuestion());
        $('.js-footer').html(displayScore());  
    }  
});
}

//return the  final results html
function displayFinalResults() {
    return `
    <div class="final-results">
        <h2>Your final score is ${currentScore * 10}% (${currentScore} / ${CONTENT.length})</h2>
        <button name="reset" class="reset js-reset-btn">Try Again</button>
    </div>`;
}

//listen for a click on the 'try again' button
//reset current question variable & current score variable
function resetQuiz() {
$('body').on('click', '.js-reset-btn', function(event) {
    event.preventDefault();
    currentQuestion = 0;           
    currentScore = 0;
    $('.js-quiz').html(createQuestion());
    $('.js-footer').html(displayScore());
});
}

//callback function when page loads
//activates all other functions
function handleCheeseQuiz() {
handleStartQuiz();
createQuestion();
displayScore();
evaluateAnswer();
nextQuestion();
displayFinalResults();
resetQuiz();
}

$(handleCheeseQuiz);