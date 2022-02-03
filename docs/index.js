'use strict'

const startButton = document.querySelector('.startButton')
const bodyWrapper = document.querySelector('.bodyWrapper')
const popUp = document.querySelector('.popUp')
const closeButton = document.querySelector('.closeButton')
const salaryInput = document.querySelector('.salaryInput')
const calculateButton = document.querySelector('.calculateButton')
const optionsButtons = document.querySelectorAll('.optionsButton')
const optionsButtonPayment = document.getElementById('optionsButtonPayment')
const optionsButtonDuration = document.getElementById('optionsButtonDuration')
let currentIncome = 0

startButton.onclick = function () {
    startButton.style.transition = 'none'
    popUp.style.display = 'flex'
    for (let button of optionsButtons) {
        button.style.transition = '200ms ease-in'
    }
    setTimeout(function () {
        bodyWrapper.style.display = 'none'
    }, 200)
}

optionsButtonDuration.onclick = function () {
    if (optionsButtonPayment.classList.contains('activeButton')) {
        optionsButtonPayment.classList.remove('activeButton')
    }
    optionsButtonDuration.classList.add('activeButton')
}
optionsButtonPayment.onclick = function () {
    if (optionsButtonDuration.classList.contains('activeButton')) {
        optionsButtonDuration.classList.remove('activeButton')
    }
    optionsButtonPayment.classList.add('activeButton')
}

closeButton.onclick = function () {
    startButton.style.transition = '500ms ease-in'
    bodyWrapper.style.display = 'flex'
    popUp.style.display = 'none'
    if (document.querySelector('.calculationWrapper') !== null) {
        document.querySelector('.calculationWrapper').remove()
    }
    salaryInput.type = 'text'
    salaryInput.value = 'Введите данные'
    salaryInput.style.color ='#BEC5CC'
    for (let button of optionsButtons) {
        button.style.transition = 'none'
    }
}

salaryInput.onfocus = function () {
    salaryInput.value = salaryInput.value === "Введите данные" ? salaryInput.value = '' : salaryInput.value
    salaryInput.type = "number"
    salaryInput.style.color = '#000000'
}

calculateButton.onclick = function () {
    calculateButton.style.color = '#EA0029;'
    if (((salaryInput.value === '') || (salaryInput.value === 'Введите данные')) && (document.querySelector('.errorMessage') === null)) {
        function inputError () {
            let errorMessage = document.createElement('label')
            salaryInput.after(errorMessage)
            errorMessage.className = 'errorMessage'
            errorMessage.innerText = 'Поле обязательно для заполнения'
            salaryInput.style.border = '1px solid #EA0029'
        }
        inputError()
        if (document.querySelector('.calculationWrapper')) {
            document.querySelector('.calculationWrapper').remove()
        }
    }
    if ((typeof(+salaryInput) === 'number') && (+salaryInput.value > 500)) {
        if (document.querySelector('.errorMessage')) {
            salaryInput.style.border = '1px solid #DFE3E6'
            document.querySelector('.errorMessage').remove()
        }
        let yearIncome = parseInt(salaryInput.value) * 12
        let yearlyTaxDeduction = yearIncome*0.13
        let yearsNumber = Math.ceil(260000/yearlyTaxDeduction)
        function calculate() {
            let calculationWrapper = document.createElement('div')
            calculationWrapper.className = 'calculationWrapper'
            calculationWrapper.innerHTML = '<div class="blackText">\n' +
                '        Итого можете внести в качестве досрочных:\n' +
                '    </div>\n'
            for (let i = 0; i < yearsNumber; i++) {
                let calculationItem = document.createElement('div')
                calculationItem.className = 'calculationItem'
                let checkboxInput = document.createElement('div')
                checkboxInput.className = 'checkboxInput'
                let calculationText = document.createElement('div')
                calculationText.className = 'calculationText'
                let calculationItemNumber = document.createElement('div')
                calculationItemNumber.className = 'blackText'
                calculationItemNumber.innerText = (i === yearsNumber-1)? `${260000%yearlyTaxDeduction}` :`${yearlyTaxDeduction}`
                let calculationItemYear = document.createElement('div')
                calculationItemYear.className = 'grayText'
                calculationItemYear.innerText = '\u00A0'+'за ' + `${i+1}` + '-й год'
                calculationText.append(calculationItemNumber,calculationItemYear)
                calculationItem.append(checkboxInput, calculationText)
                calculationWrapper.append(calculationItem)
            }
            calculateButton.after(calculationWrapper)
            currentIncome = +salaryInput.value
            let checkboxInputs = document.querySelectorAll('.checkboxInput')
            for (let checkbox of checkboxInputs) {
                function fillCheckbox(checkbox) {
                    if (checkbox.innerText === '') {
                        checkbox.innerText = '✓'
                        checkbox.style.background = '#FF5E56'
                    }
                    else {
                        checkbox.innerText = ''
                        checkbox.style.background = 'none'
                    }
                }
                checkbox.onclick = function () {
                    fillCheckbox(checkbox)
                }
                checkbox.parentElement.lastElementChild.onclick = function () {
                    fillCheckbox(checkbox)
                }
            }
        }
        if ((document.querySelector('.calculationWrapper')) && (yearIncome/12 !== currentIncome )) {
            document.querySelector('.calculationWrapper').remove()
            calculate()
        }
        if (!(document.querySelector('.calculationWrapper'))) {
            calculate()
        }
    }
}

