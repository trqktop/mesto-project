/*
import { errorMessage } from "./constants.js"



const errorMessage = document.querySelector(`.${inputElement.id}-error`)

const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
const errorMessage = document.querySelector(`.${inputElement.id}-error`)



function enableValidation(formArr) {
    formArr.forEach((formElement) => {
        setEventListeners(formElement)
    });
}
function setEventListeners(formElement) {
    formElement.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            hasValidInput(inputElement, formElement)
        });
    });
}

function checkValidation(formElement) {
    return formElement.checkValidity()
}

function hasValidInput(inputElement, formElement) {
    if (checkValidation(formElement)) {
        hideErrorMessage(inputElement)
        activeSubmitButton(formElement)

    } else {
        showErrorMessage(inputElement)
        disableSubmitButton(formElement)
    }
}

function showErrorMessage(inputElement) {
    errorMessage.textContent = inputElement.validationMessage
}

function hideErrorMessage() {
    errorMessage.textContent = ''
}

function disableSubmitButton(formElement) {
    const submitButton = formElement.querySelector('.popup__submit-button')
    submitButton.classList.add('popup__submit-button_disabled')
    submitButton.disabled = true;
}

function activeSubmitButton(formElement) {
    const submitButton = formElement.querySelector('.popup__submit-button')
    submitButton.classList.remove('popup__submit-button_disabled')
    submitButton.disabled = false;
}


*/