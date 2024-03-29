// import data from "../source_data/qa.json" assert { type: 'json' };
let data = []

await fetch("../qa.json")
    .then(response => {
        return response.json();
    })
    .then(d => data = d);


const answer = document.getElementById("answer")
const inpValue = document.querySelector(".user-answer")
const checkBtn = document.querySelector(".check-btn")
const engWord = document.querySelector(".engword")
const handleAnsw = document.querySelector(".handleAnswer")
const handleAnswVal = document.querySelector(".handleAnswer__value")
const nextWord = document.querySelector(".nextWord")

const showAnswer = document.querySelector(".showAnswer")
const realAnswer = document.querySelector(".realAnswer")
const didSaw = document.querySelector(".didSaw")

let eng;
let fin;
function getRandomWord() {
    const r = data[Math.floor(Math.random() * data.length)]
    eng = engWord.textContent = r.eng
    fin = r.fin
    realAnswer.textContent = ""
    didSaw.textContent = ""
    inpValue.value = ""
}
getRandomWord()

checkBtn.addEventListener("click", () => checkWord())
inpValue.addEventListener("keyup", (e) => {
    if (e.target.key == "Enter" || e.keyCode == 13) { checkWord() }
})

nextWord.addEventListener("click", () => getRandomWord())

showAnswer.addEventListener("click", () => {
    realAnswer.textContent = fin
    didSaw.textContent = "👀"
})

function checkWord() {
    let v = inpValue.value

    if (v && fin) {
        if (v.toLowerCase() == fin.toLowerCase()) {
            answer.textContent = "Верно!"
            handleAnsw.style.display = "none"
            handleAnswVal.innerHTML = ""
        } else {
            handleAnsw.style.display = "none"
            handleAnswVal.innerHTML = ""

            answer.textContent = "Неверно, сорри"

            let userV = []
            userV = v.split("")
            let finV = []
            finV = fin.split("")

            if (userV.length < finV.length) {
                let dif = finV.length - userV.length
                let empty = new Array(dif)
                empty.fill("_")

                userV.push(...empty)
            }

            let handAns = []
            for (let i = 0; i < userV.length; i++) {
                if (userV[i].toLowerCase() == finV[i].toLowerCase()) {
                    let rune = {
                        isValid: true,
                        v_val: userV[i],
                        fin_val: finV[i]
                    }
                    handAns.push(rune)
                } else {
                    let rune = {
                        isValid: false,
                        v_val: userV[i],
                        fin_val: finV[i]
                    }
                    handAns.push(rune)
                }
            }

            if (handAns && handAns.length > 0) {
                for (let i of handAns) {
                    const r = document.createElement("p")
                    if (i.isValid == false) {
                        r.classList.add("wrongRune")
                        r.textContent = i.v_val == " " ? "__" : i.v_val
                    } else {
                        r.textContent = i.fin_val == " " ? "__" : i.fin_val
                    }
                    handleAnswVal.appendChild(r)
                }

                handleAnsw.style.display = "block"
            }
        }
    }
}


// Speach
const playResult = document.querySelector(".play_result")

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "fi";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

playResult.onclick = () => {
    recognition.start();
    console.log("Ready to receive a color command.");
};

recognition.onresult = (event) => {
    const color = event.results[0][0].transcript;
    let res = `Result received: ${color}.`;
    // bg.style.backgroundColor = color;
    console.log(res);
    inpValue.value = color
    checkWord()
};

// syn speech
const synth = window.speechSynthesis;

// const inputForm = document.querySelector("form");
// const inputTxt = document.querySelector("input");
// const voiceSelect = document.querySelector("select");

// let voices;

// function loadVoices() {
//   voices = synth.getVoices();
//   for (let i = 0; i < voices.length; i++) {
//     const option = document.createElement("option");
//     option.textContent = `${voices[i].name} (${voices[i].lang})`;
//     option.value = i;
//     voiceSelect.appendChild(option);
//   }
// }

// in Google Chrome the voices are not ready on page load
// if ("onvoiceschanged" in synth) {
//   synth.onvoiceschanged = loadVoices;
// } else {
//   loadVoices();
// }

document.querySelector(".speechPlease").onclick = (event) => {
//   event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(fin);
//   utterThis.voice = voices[voiceSelect.value];
  synth.speak(utterThis);
//   inputTxt.blur();
};
