const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "J.K. Rowling", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Earth", correct: false },
            { text: "Mercury", correct: true },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question: "Which element has the atomic number 1?",
        answers: [
            { text: "Helium", correct: false },
            { text: "Oxygen", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Nitrogen", correct: false }
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answers: [
            { text: "1910", correct: false },
            { text: "1912", correct: true },
            { text: "1914", correct: false },
            { text: "1916", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Who is known as the 'Father of Computers'?",
        answers: [
            { text: "Charles Babbage", correct: true },
            { text: "Alan Turing", correct: false },
            { text: "Thomas Edison", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false }
        ]
    }
];

const quesElement = document.getElementById('question');
const ansBtn = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    quesElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        ansBtn.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = "true"
    })
    nextBtn.style.display = "block"
}

function showScore(){
    resetState();
    quesElement.innerHTML = `You score ${score} out of ${questions.length}`
    nextBtn.innerHTML = "Play Again"
    nextBtn.style.display = "block"
}


function handleNextBtn(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else {
        showScore()
    }
}


nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else {
        startQuiz()
    }
})


startQuiz();
