let questions = [
    {
       "id":1,
       "question":"Number(\"1\") - 1 == 0; \rWhat is the result?",
       "a":"True",
       "b":"False",
       "c":"NaN",
       "d":"TypeError",
       "answer":"a"
    },
    {
       "id":2,
       "question":"What is the result? \r(true + false) > 2 + true;",
       "a":"true",
       "b":"false",
       "c":"TypeError",
       "d":"NaN",
       "answer":"2"
    },
    {
       "id":3,
       "question":"What is the result?\r\"1\" - - \"1\";",
       "a":"0",
       "b":"2",
       "c":"11",
       "d":"\"11\"",
       "answer":"b"
    },
    {
       "id":4,
       "question":"What is the result? \r new String(\"This is a string\") instanceof String;        ",
       "a":"true",
       "b":"false",
       "c":"TypeError",
       "d":"NaN",
       "answer":"a"
    },
    {
       "id":5,
       "question":"What is the result? \r[] + [] + 'foo'.split('');        ",
       "a":"\"f,o,o\"",
       "b":"TypeError",
       "c":"[\"f\",\"o\",\"o\"]",
       "d":"[][][\"f\",\"o\",\"o\"]",
       "answer":"a"
    },
    {
       "id":6,
       "question":"For safety, the fuse wire used in the mains for household supply of electricity must be made of metal having",
       "a":"low melting point",
       "b":"high resistance",
       "c":"high melting point",
       "d":"low specific heat",
       "answer":"a"
    },
    {
       "id":7,
       "question":"What is the result? \rnew Array(5).toString();",
       "a":"\",,,,\"",
       "b":"[]",
       "c":"\"[]\"",
       "d":"(empty)",
       "answer":"a"
    },
    {
       "id":8,
       "question":"What is the result? \rString('Hello') === 'Hello';",
       "a":"true",
       "b":"false",
       "c":"TypeError",
       "d":"NaN",
       "answer":"a"
    },
    {
       "id":9,
       "question":"Recession is",
       "a":"slowing down of economic activity over a limited period",
       "b":"period during which unemployment may rise and demand and output may fall, leading to slump in trade",
       "c":"period that results from accumulation of unsold goods, owing to fall in demand",
       "d":"All of the above",
       "answer":"d"
    },
    {
       "id":10,
       "question":"Karl Marx's ideology advocated",
       "a":"a classed unique society",
       "b":"a united society",
       "c":"a classed society",
       "d":"None of the above",
       "answer":"c"
    },
    {
       "id":11,
       "question":"What is the result? \rString('Hello') === 'Hello';",
       "a":"true",
       "b":"false",
       "c":"TypeError",
       "d":"NaN",
       "answer":"a"
    },
    {
       "id":12,
       "question":"What is the result? \r10 > 9 > 8 === true;",
       "a":"True",
       "b":"False",
       "c":"Error",
       "d":"Other",
       "answer":"b"
    },
    {
       "id":13,
       "question":"What is the result? \rNaN === NaN;",
       "a":"true",
       "b":"false",
       "c":"TypeError",
       "d":"NaN",
       "answer":"b"
    },
    {
      "id":14,
      "question":"On a radio, stations are changed by using what control?",
      "a":"Tuning",
      "b":"Volume",
      "c":"Bass",
      "d":"Treble",
      "answer":"a"
   },
   {
      "id":15,
      "question":"Which material is most dense?",
      "a":"Silver",
      "b":"Styrofoam",
      "c":"Butter",
      "d":"Gold",
      "answer":"d"
   },
   {
      "id":16,
      "question":"Which state in the United States is largest by area?",
      "a":"Alaska",
      "b":"California",
      "c":"Texas",
      "d":"Hawai",
      "answer":"a"
   },
   {
      "id":17,
      "question":"What kind of animal traditionally lives in a sty?",
      "a":"Cow",
      "b":"Pig",
      "c":"Fox",
      "d":"Teenager",
      "answer":"b"
   },
   {
      "id":18,
      "question":"The EPA urges people to produce less waste by engaging in efforts to reduce, reuse and what?",
      "a":"Recycle",
      "b":"Rewrap",
      "c":"Repossess",
      "d":"Retire",
      "answer":"a"
   },
   {
      "id":19,
      "question":"What is the second most common gas in the air?",
      "a":"Nitrogen",
      "b":"Oxygen",
      "c":"Water",
      "d":"Helium",
      "answer":"b"
   },
   {
      "id":20,
      "question":"Which month has only 28 days (unless it's a leap year)?",
      "a":"March",
      "b":"September",
      "c":"June",
      "d":"Feburary",
      "answer":"d"
   },
   {
      "id":21,
      "question":"Pythagoras was first to ____ the universal validity of geometrical theorem.",
      "a":"give",
      "b":"prove",
      "c":"both",
      "d":"None of the above",
      "answer":"b"
   },
   {
      "id":22,
      "question":"The American General who led the revolt against the British and declared American independence was",
      "a":"George Washington",
      "b":"Bill Clinton",
      "c":"George Bush",
      "d":"None of the above",
      "answer":"a"
   },
   {
      "id":23,
      "question":"Light Year is related to",
      "a":"energy",
      "b":"speed",
      "c":"distance",
      "d":"intensity",
      "answer":"c"
   },
   {
      "id":24,
      "question":"A liquid asset is",
      "a":"a type of asset that is in cash in the current account of the commercial bank",
      "b":"a type of asset that is in the form of a deposit in the current account of the commercial bank",
      "c":"either of these",
      "d":"None of the above",
      "answer":"c"
   },
   {
      "id":25,
      "question":"Which of these African countries is situated south of the equator?",
      "a":"Ethiopia",
      "b":"Nigeria",
      "c":"Zambia",
      "d":"Chad",
      "answer":"c"
   }
];

const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("counter");
const scoreText = document.getElementById("score");
const restart = document.getElementById("restart");

let questionCounter;
let score;
const MAX_QUESTIONS = 5;
let acceptingAnswers;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    acceptingAnswers = true;
    scoreText.innerText = score;

    availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
    getNewQuestion();
};

const getRandomQuestions = (arr, n) =>{
    let len = arr.length;

    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    console.log(shuffled);
    return (selected = shuffled.slice(0, n));
};

const getNewQuestion = () => {
    if ( availableQuestions.length === 0 ) {
        displayResults();
        return;
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

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
                    score ++;
                    scoreText.innerText = score;
                    classToApply = "correct";
                };

                clickedAnswer.parentElement.classList.add(classToApply);

                setTimeout (()=>{
                    clickedAnswer.parentElement.classList.remove(classToApply);
                    getNewQuestion();
                    acceptingAnswers = true;
                }, 1000)
            });
    })
    availableQuestions.shift();
 };

displayResults = () => {
   const myModalEl = document.getElementById('myModal');
   const modal = new mdb.Modal(endGameModal);
   const modalBody = document.getElementById('modal-body');
   modalBody.innerText = `Tu puntaje: ${score}`;
   modal.show();
   acceptingAnswers = false;
}
restart.addEventListener("click", startGame);

startGame();