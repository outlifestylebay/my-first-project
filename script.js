let currentScore = 0; // Initialisiere die Punktzahl mit 0
let currentQuestionIndex = 0;
const questions = [
    {
        question: "Welche der folgenden Aktivitäten verbraucht in der Regel die größte Menge Wasser pro Nutzung??",
        choices: [
            "Duschen",
            "Klospülung",
            "Baden",
            "Zähneputzen"
        ],
        answer: 1
    },
    {
        question: "Was ist einer der Hauptgründe für Wasserknappheit auf der Welt? ",
        choices: [
            "angemessene Nutzung unserer Wasserressourcen",
            "Steigendes Bildungsniveau",
            "Wachsende Bevölkerung",
            "Alle oben genannten"
        ],
        answer: 2
    },
    {
        question: "Welche der folgenden Auswirkungen kann Wasserknappheit auf die Umwelt haben?",
        choices: [
            "Erhöhung der Biodiversität",
            "Steigerung der landwirtschaftlichen Produktion",
            "Hungersnöte",
            "Verbesserung der Wasserqualität in Flüssen und Seen"
        ],
        answer: 2
    },
    {
        question: "Wie viele Menschen weltweit haben keinen Zugang zu sauberem und sicheren Trinkwasser?",
        choices: [
            "Etwa 1 Millionen Menschen",
            "Etwa 2 Milliarden Menschen",
            "Etwa 1 Milliarde Menschen",
            "Etwa 2 Millionen Menschen"
        ],
        answer: 1
    },
    {
        question: "Welche der folgenden Maßnahmen ist eine effektive Methode, um Wasser zu sparen?",
        choices: [
            "Täglich ein Bad nehmen",
            "Das Bewässern von Pflanzen während der heißesten Tageszeit",
            "Den Wasserhahn beim Zähneputzen laufen lassen",
            "Spülmaschiene benutzen anstatt mit der Hand abwaschen"
        ],
        answer: 3
    },
];

function saveScore() {
    const name = prompt('Bitte gib deinen Namen ein:');
    if (name) {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.push({ name: name, score: currentScore });
        localStorage.setItem('highscores', JSON.stringify(highscores));
        loadHighscore();
    }
}



function showQuestion(questionIndex) {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');

    questionElement.textContent = questions[questionIndex].question;
    choicesElement.innerHTML = '';

    questions[questionIndex].choices.forEach(function(choice, index) {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-button'); // Füge eine Klasse für das Styling hinzu
        button.onclick = function() { selectAnswer(index); };
        choicesElement.appendChild(button);
    });
}

function selectAnswer(index) {
    const correct = questions[currentQuestionIndex].answer;
    document.getElementById('choices').innerHTML = ''; // Lösche alte Antwortmöglichkeiten und Feedback bevor das Feedback angezeigt wird
    if (index === correct) {
        const feedbackElement = document.createElement('p');
        feedbackElement.textContent = 'RICHTIG.';
        feedbackElement.style.color = 'green';
        document.getElementById('choices').appendChild(feedbackElement);
        currentScore++;
        setTimeout(showNextQuestion, 10000); // Zeige nach 10 Sekunden die nächste Frage
    } else {
        // Zeige das Feedback sofort, aber erlaube dem Benutzer nicht, zur nächsten Frage zu gehen, bis er die richtige Antwort gewählt hat
        const feedbackElement = document.createElement('p');
        feedbackElement.textContent = 'FALSCH.';
        feedbackElement.style.color = 'red';
        document.getElementById('choices').appendChild(feedbackElement);
        setTimeout(showNextQuestion, 50000); // Zeige nach 50 Sekunden die nächste Frage
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('quizContainer').innerHTML = `<h1>Quiz beendet!</h1><p>Deine Punktzahl: ${currentScore} von ${questions.length}</p>`;
        // Link zum Weltwasserbericht hinzufügen
        const linkElement = document.createElement('a');
        linkElement.textContent = 'Mehr erfahren zu Wasser in Österreich';
        linkElement.href = 'https://info.bml.gv.at/themen/wasser/wasser-oesterreich.html'; // Ersetze dies durch die tatsächliche URL zum Weltwasserbericht
        linkElement.target = '_blank'; // Öffnet den Link in einem neuen Tab
        document.getElementById('quizContainer').appendChild(linkElement);
    } else {showQuestion(currentQuestionIndex);
        setTimeout(function() {
        const feedbackElement = document.createElement('p');
        feedbackElement.textContent = questions[currentQuestionIndex].infoText;
        feedbackElement.style.color = 'blue'; // Ändere die Farbe nach deinen Wünschen
        document.getElementById('quizContainer').appendChild(feedbackElement);
    }, 
}
       
function startQuiz() {
    // Weiterleitung zur Quiz-Seite (zum Beispiel "quiz.html")
    window.location.href = "quiz.html";
}

window.onload = function() {
    showQuestion(currentQuestionIndex);
};



