function getRanNum(min, max) {
    return Math.random() * (max-min) + min
}

function handleCheck(problem, answerInputElem, answer) {
    if (answerInputElem.value == '') {
        //console.log("no input")
        return
    }
    if (answerInputElem.value == answer) {
        console.log(true)
        document.querySelector(`.${problem} .feedback`).innerHTML = '✅'
        document.querySelector(`.${problem} .answer-input`).disabled = true
    } else {
        console.log(false)
        attempts_GL3Q1 += 1
        document.querySelector(`.${problem} .feedback`).innerHTML = '❌'
        document.querySelector(`.${problem} .attempts`).innerHTML = attempts_GL3Q1
        answerInputElem.value = ''
    }
}



// problem 1
const checkButton1Elem = document.querySelector(".GL3Q1 .check-button")
const answerInput1Elem = document.querySelector(".GL3Q1 .answer-input")

const ans_GL3Q1 = GL3Q1()
let attempts_GL3Q1 = 0
console.log(ans_GL3Q1)

checkButton1Elem.addEventListener("click", () => handleCheck('GL3Q1', answerInput1Elem, ans_GL3Q1))
answerInput1Elem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleCheck('GL3Q1', answerInput1Elem, ans_GL3Q1)
    }
})

function GL3Q1() {
    const iTemp = 32//getRanNum(30,60).toFixed(1)
    const iPressure = 24.3//getRanNum(20,50).toFixed(1)
    const fTemp = 6.7//getRanNum(0,29).toFixed(1)

    document.querySelector('.GL3Q1 .iTemp').innerHTML = `${iTemp}`
    document.querySelector('.GL3Q1 .fTemp').innerHTML = `${fTemp}`
    document.querySelector('.GL3Q1 .iPressure').innerHTML = `${iPressure}`

    const mod_iTemp = iTemp + 273
    const mod_fTemp = fTemp + 273
    const ans_fPressure = parseFloat((iPressure * mod_fTemp / mod_iTemp).toFixed(1))
    return ans_fPressure
}



// problem 3
const checkButton3Elem = document.querySelector(".GL3Q3 .check-button")
const answerInput3Elem = document.querySelector(".GL3Q3 .answer-input")

const ans_GL3Q3 = GL3Q3()
let attempts_GL3Q3 = 0
console.log(ans_GL3Q3)

checkButton3Elem.addEventListener("click", () => handleCheck('GL3Q3', answerInput3Elem, ans_GL3Q3))
answerInput3Elem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleCheck('GL3Q3', answerInput3Elem, ans_GL3Q3)
    }
})

function GL3Q3() {
    const constVol = 20//getRanNum(20,60).toFixed(0)
    const fPressure = 64.9//getRanNum(30,60).toFixed(1)
    const iPressure = 57.4//getRanNum(20,50).toFixed(1)
    const fTemp = 28.2//getRanNum(0,29).toFixed(1)

    document.querySelector('.GL3Q3 .constVol').innerHTML = `${constVol}`
    document.querySelector('.GL3Q3 .fPressure').innerHTML = `${fPressure}`
    document.querySelector('.GL3Q3 .fTemp').innerHTML = `${fTemp}`
    document.querySelector('.GL3Q3 .iPressure').innerHTML = `${iPressure}`

    const mod_fTemp = fTemp + 273
    const ans_iTemp = parseFloat((iPressure * mod_fTemp / fPressure - 273).toFixed(1)) 
    return ans_iTemp
}






