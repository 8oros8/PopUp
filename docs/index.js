'use strict'

const startButton = document.getElementById('startButton')
const bodyWrapper = document.getElementById('bodyWrapper')
const popUp = document.getElementById('popUp')
const closeButton = document.getElementById('closeButton')
const salaryInput = document.getElementById('salaryInput')
const calculateButton = document.getElementById('calculateButton')
const optionsButtons = document.querySelectorAll('.optionsButton')

startButton.onclick = function () {
    startButton.style.transition = 'none'
    bodyWrapper.style.display = 'none'
    popUp.style.display = 'flex'
    for (let button of optionsButtons) {
        button.style.transition = '200ms ease-in'
    }
}

closeButton.onclick = function () {
    startButton.style.transition = '500ms ease-in'
    bodyWrapper.style.display = 'flex'
    popUp.style.display = 'none'
    for (let button of optionsButtons) {
        button.style.transition = 'none'
    }
}

salaryInput.onfocus = function (event) {
    event.target.value = ''
    event.target.type = "number"
    event.target.style.color = '#000000'
}
salaryInput.onblur = function (event) {
    event.target.type = "text"
    event.target.style.color = '#BEC5CC'
}
calculateButton.onclick = function (event) {
    event.target.style.color = '#EA0029;'
    if ((salaryInput.value === '') && (document.getElementById('errorMessage') === null)) {
        let errorMessage = document.createElement('label')
        salaryInput.after(errorMessage)
        errorMessage.id = 'errorMessage'
        errorMessage.innerText = 'Поле обязательно для заполнения'
        salaryInput.style.border = '1px solid #EA0029'
    }
}
