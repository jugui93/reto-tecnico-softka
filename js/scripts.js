const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("counter");
const scoreText = document.getElementById("score");
const restart = document.getElementById("restart");
const finish = document.getElementById("finish");

let questionCounter;
let score;
const MAX_LEVEL = 5;
let acceptingAnswers;
let availableQuestions;

function loadFromFile() {
   let xhr = new XMLHttpRequest();

   xhr.open("GET", "js.json", false);

   xhr.send();

   xhr.onload = function (){
      if (this.status ==200){
      
      }else{
         console.log("Ooops something went wrong")
      }
   }
   return xhr.response;
}

let questions = JSON.parse(loadFromFile());
const startGame = () => {
    questionCounter = 0;
    score = 0;
    acceptingAnswers = true;
    scoreText.innerText = score;

    availableQuestions = getRandomQuestions(questions, MAX_LEVEL, questionCounter);
    getNewQuestion();
};

const getRandomQuestions = (arr, m, n) =>{

   const questionsByLevel = [...arr].slice(m * n, m * n + 5);
   console.log(questionsByLevel)
    const shuffled = [...questionsByLevel].sort(() => 0.5 - Math.random());
    console.log(shuffled[0]);
    return  shuffled
};

const getNewQuestion = () => {
    if ( availableQuestions.length === 0 ) {
        displayResults();
        return;
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_LEVEL}`;

    currentQuestion = availableQuestions[0];
    question.innerText = currentQuestion.question;

    answers.forEach ((answer)=>{
        answer.innerText = currentQuestion[answer.dataset["answer"]];
    })

    answers.forEach ((answer)=>{
            answer.addEventListener("click", e => {
                if (!acceptingAnswers){
                    return;
                }
                acceptingAnswers = false;
                const clickedAnswer = e.target;

                const answeredLetter = clickedAnswer.dataset["answer"];

                let classToApply = "incorrect";

                if (answeredLetter === currentQuestion.answer){
                    score += questionCounter * MAX_LEVEL;
                    scoreText.innerText = score;
                    classToApply = "correct";
                    clickedAnswer.parentElement.classList.add(classToApply);

                    setTimeout (()=>{
                     clickedAnswer.parentElement.classList.remove(classToApply);
                     availableQuestions = getRandomQuestions(questions, MAX_LEVEL, questionCounter );
                     getNewQuestion();
                     acceptingAnswers = true;
                 }, 1000)
                }else {
                  clickedAnswer.parentElement.classList.add(classToApply);
                  displayResults();
                  setTimeout(()=>{
                  clickedAnswer.parentElement.classList.remove(classToApply)}, 2000)
                  return;
                };
            });
    });
 };

displayResults = () => {
   const myModalEl = document.getElementById('myModal');
   const modal = new mdb.Modal(endGameModal);
   const modalBody = document.getElementById('modal-body');
   modalBody.innerText = `Your score: ${score}`;
   modal.show();
   acceptingAnswers = false;
}
restart.addEventListener("click", startGame);
finish.addEventListener("click", displayResults);

startGame();