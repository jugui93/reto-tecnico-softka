//Declaración de variables que contienen elementos del DOM
const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("counter");
const scoreText = document.getElementById("score");
const restart = document.getElementById("restart");
const finish = document.getElementById("finish");
const save = document.getElementById("save");
// Declaración de variables
let questionCounter;// Almacena el nivel de las preguntas
let score;//Almacena el puntaje que va obtenido el usuario
const MAX_LEVEL = 5;// Deefine # de rondas maximo del juego
let acceptingAnswers;// Almacena booleano para no permitir mas de una respuesta seleccionada
let availableQuestions; // Arreglo de 5 preguntas filtradas por nivel. 

function loadFromFile() { //Función para hacer petición de información al arcivo que contiene las preguntas
   let xhr = new XMLHttpRequest();

   xhr.open("GET", "js.json", false);

   xhr.send();

   xhr.onload = function () {
      if (this.status == 200) {
      } else {
         console.log("Ooops something went wrong");
      }
   };
   return xhr.response;
}

let questions = JSON.parse(loadFromFile()); //Variable que almacena el banco de preguntas
const startGame = () => { //Función encargada de iniciar el juego
   questionCounter = 0;
   score = 0;
   acceptingAnswers = true;
   scoreText.innerText = score;
   registerUser(); //Función que abre ventana para ingresar el usuario

   availableQuestions = getRandomQuestions( // Función que permite obtener 5 preguntas ordenadas aleatoriamente 
      questions,
      MAX_LEVEL,
      questionCounter
   );
   getNewQuestion(); //Función que retorna una pregunta
};

const getRandomQuestions = (arr, m, n) => { // Función que retorna un arreglo de 5 preguntas dependiendo del nivel en que se encuentra
   const questionsByLevel = [...arr].slice(m * n, m * n + 5);// Toma 5 preguntas del banco de preguntas de acuerdo al nivel
   const shuffled = [...questionsByLevel].sort(() => 0.5 - Math.random());// Organiza las preguntas de manera aleatoria
   return shuffled; //retorna 5 preguntas ordenadas de manera aleatoria
};

const getNewQuestion = () => { //Función encargada de mostrar en pantalla peguntas en cada ronda
   if (availableQuestions.length === 0) { //condicional para finalizar el juego en la ronda 5
      displayResults();// muestra ventana con el puntaje obtenido
      window.localStorage.setItem("Score", `${score}`); //Almacenamiento delpuntje en localStorage
      return;
   }

   questionCounter++;//Incrementa el nivel en cada ronda
   questionCounterText.innerText = `${questionCounter}/${MAX_LEVEL}`;//Muestra el nivel en pantalla
   currentQuestion = availableQuestions[0];//toma la primer pregunta del arreglo
   question.innerText = currentQuestion.question;// Muestra la pregunta en pantalla

   answers.forEach((answer) => { // Método que muestra en pantalla cada una de la opciones de respuesta
      answer.innerText = currentQuestion[answer.dataset["answer"]];
   });

   answers.forEach((answer) => { // Método que agrega manejador de eventos a cada pregunta
      answer.addEventListener("click", (e) => {
         if (!acceptingAnswers) {//condicional para aceptar solo una respuesta
            return;
         }
         acceptingAnswers = false;
         const clickedAnswer = e.target;//se identifica la preguta seleccionada

         const answeredLetter = clickedAnswer.dataset["answer"];// Se identifica la letra que se seleccionó como respuesta

         let classToApply = "incorrect";//Se define clase que se aplica or defecto al elemento seleccionado. 

         if (answeredLetter === currentQuestion.answer) { //Condicional para respuesta correcta o incorrecta
            score += questionCounter * MAX_LEVEL;//incremento del puntaje de acuerdo al nivel
            scoreText.innerText = score;//actualización del puntaje en pantalla
            classToApply = "correct";// Se define clase para el elemento seleccionado
            clickedAnswer.parentElement.classList.add(classToApply);//Aplica clase al padre del elemento seleccionado

            setTimeout(() => { // se define tiempo de espera de un segundo para pasar a la siguinte pregunta
               clickedAnswer.parentElement.classList.remove(classToApply);//Remueve la clase aplicada
               availableQuestions = getRandomQuestions(// Se actualizan las preuntas de acuerdo al nivel
                  questions,
                  MAX_LEVEL,
                  questionCounter
               );
               getNewQuestion(); //Se obtiene una nueva pregunta
               acceptingAnswers = true;
            }, 1000);
         } else { //Cuando la respuesta es incorrecta se ejecuta esta sección 
            clickedAnswer.parentElement.classList.add(classToApply);//Apica clase al elemento seleccionado
            displayResults();// muestra el resultado en ventana
            window.localStorage.setItem("Score", `${score}`);// almacena el puntaje del usuario
            setTimeout(() => { //tiempo de espera para remover la clase aplicada al elemento
               clickedAnswer.parentElement.classList.remove(classToApply);//Remueve la clase aplicada
            }, 2000);
            return;
         }
      });
   });
};

const registerUser = () => { //función que muestra ventana de registro de usuario
   const myModalEl = document.getElementById("myModal");
   const modal1 = new mdb.Modal(userRegisterModal);
   modal1.show();
};

const displayResults = () => { //función que muestra ventana con los resultados
   const myModalEl = document.getElementById("myModal");
   const modal = new mdb.Modal(endGameModal);
   const modalBody = document.getElementById("modal-body");
   modalBody.innerText = `Your score: ${score}`;
   modal.show();
   acceptingAnswers = false;
};

const saveRegistrer = () => {//Función que alamcena en localStorage nobre de usuario
   window.localStorage.setItem("User", nickname.value);
};

restart.addEventListener("click", startGame); //Evento que reinicia el juego
finish.addEventListener("click", displayResults); //Evento que finaliza el juego en cualquier momento
save.addEventListener("click", saveRegistrer);//Evento que almacena nombre de usuario
startGame();
