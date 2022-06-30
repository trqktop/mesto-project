export { enableValidation, disableSubmitButton }




function enableValidation(formArr) {
    formArr.forEach((formElement) => {
        setEventListeners(formElement)
    });

}


function setEventListeners(formElement) {
    formElement.addEventListener('input', function (evt) {
        hasValidInput(formElement, evt.target)
    });
}

function checkValidation(formElement) {
    return formElement.checkValidity()
}

function hasValidInput(formElement, currentInput) {
    const currentErrorMessage = findErrorMessage(currentInput)
    const submitButton = formElement.querySelector('.popup__submit-button')
    if (checkValidation(formElement)) {
        hideErrorMessage(currentErrorMessage)
        activeSubmitButton(submitButton)

    } else {
        showErrorMessage(currentInput, currentErrorMessage)
        disableSubmitButton(submitButton)
    }

}
function findErrorMessage(currentInput) {
    return document.querySelector(`.${currentInput.id}-error`)
}

function showErrorMessage(currentInput, currentErrorMessage) {
    currentErrorMessage.textContent = currentInput.validationMessage
}

function hideErrorMessage(currentErrorMessage) {
    currentErrorMessage.textContent = '';
}


function disableSubmitButton(submitButton) {
    submitButton.classList.add('popup__submit-button_disabled')
    submitButton.disabled = true;
}


function activeSubmitButton(submitButton) {
    submitButton.classList.remove('popup__submit-button_disabled')
    submitButton.disabled = false;
}

