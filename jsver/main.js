// import data from "../source_data/qa.json" assert { type: 'json' };
let data = []

await fetch("./qa.json")
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

const showAnswer = document.querySelector(".showAnswer")
const realAnswer = document.querySelector(".realAnswer")
const didSaw = document.querySelector(".didSaw")

let eng;
let fin;
function getRandomWord() {
    const r = data[Math.floor(Math.random() * data.length)]
    eng = engWord.textContent = r.eng
    fin = r.fin
}
getRandomWord()

checkBtn.addEventListener("click", () => checkWord())
inpValue.addEventListener("keyup", (e) => {
    if(e.target.key == "Enter" || e.keyCode == 13) {checkWord()}
})

showAnswer.addEventListener("click", () => {
    realAnswer.textContent = fin
    didSaw.textContent = "👀"
})

function checkWord() {
    let v = inpValue.value

    if (v && fin) {
        if (v == fin) {
            answer.textContent = "Верно!"
            handleAnsw.style.display = "none"
            handleAnswVal.innerHTML = ""
        } else {
            handleAnsw.style.display = "none"
            handleAnswVal.innerHTML = ""

            answer.textContent = "Не верно, сорри"

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
                if (userV[i] == finV[i]) {
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
