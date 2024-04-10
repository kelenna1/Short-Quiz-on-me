const questions = [
    {
        question: "What type of music would you never catch me listening to?",
        answers: [
            { text: "Jazz", correct: false},
            { text: "Rock", correct: true},
            { text: "Rap", correct: false},
            { text: "Blues", correct: false},
        ]
    },
    {
        question: "What was my favorite subject in secondary school?",
        answers: [
            { text: "Basic science", correct: true},
            { text: "Technical drawing", correct: false},
            { text: "Mathematics", correct: false},
            { text: "Physics", correct: false},
        ]
    },
    {
        question: "What's my third name?",
        answers: [
            { text: "Odinaka", correct: false},
            { text: "Ikenna", correct: false},
            { text: "Chidera ", correct: false},
            { text: "onyedikachi", correct: true},
        ]
    },
    {
        question: "What's my comfort show?",
        answers: [
            { text: "How I met your mother", correct: false},
            { text: "Friends", correct: true},
            { text: "The Office", correct: false},
            { text: "Young Sheldon", correct: false},
        ]
    },
    {
        question: "Who is my favourite friends character?",
        answers: [
            { text: "Joey", correct: true},
            { text: "Phoebe", correct: false},
            { text: "Monica", correct: false},
            { text: "Chandler", correct: false},
            { text: "Rachel", correct: false},
            { text: "Ross", correct: false},
        ]
    },
    {
        question: "What is my love language",
        answers: [
            { text: "Physical Touch", correct: false},
            { text: "Words of affirmation", correct: false},
            { text: "Quality time", correct: true},
            { text: "Act of service", correct: false},
        ]
    },
    {
        question: "My favourite movie genre is ",
        answers: [
            { text: "Comedy", correct: false},
            { text: "Action", correct: false},
            { text: "Romcom", correct: true},
            { text: "Horror", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    if(score <= 3){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! ... You no try oo`;
    }
    else if(score > 3 && score <= 6){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! ... Clap for yourself`;
    }
    else if(score = 7){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! ... osheyyy, just go paste aza for my DM😂`;
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
