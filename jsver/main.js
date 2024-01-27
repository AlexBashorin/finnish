import data from "../source_data/qa.json" assert { type: 'json' };

const answer = document.getElementById("answer")
const inpValue = document.querySelector(".user-answer")
const checkBtn = document.querySelector(".check-btn")
const engWord = document.querySelector(".engword")

let eng;
let fin;
function getRandomWord() {
    const r = data[Math.floor(Math.random() * data.length)]
    eng = engWord.textContent = r.eng
    fin = r.fin
}
getRandomWord()

checkBtn.addEventListener("click", () => {
    let v = inpValue.value 
    console.log(fin)   

    if (v && fin) {
        if (v == fin) {
            answer.textContent = "Верно!"
        } else {
            answer.textContent = "Не верно, сорри"
        }
    }
})