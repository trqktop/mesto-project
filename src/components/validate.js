export { enableValidation, disableSubmitButton, findErrorMessage, hideErrorMessage }




function enableValidation(formArr, currentSubmitButton, popupSubmitButtonToggleStyle) {
    formArr.forEach((formElement) => {
        setEventListeners(formElement, currentSubmitButton, popupSubmitButtonToggleStyle)
    });

}


function setEventListeners(formElement, currentSubmitButton, popupSubmitButtonToggleStyle) {
    formElement.addEventListener('input', function (evt) {
        hasValidInput(formElement, evt.target, currentSubmitButton, popupSubmitButtonToggleStyle)
    });
}

function checkValidation(formElement) {
    return formElement.checkValidity()
}

function hasValidInput(formElement, currentInput, currentSubmitButton, popupSubmitButtonToggleStyle) {
    const currentErrorMessage = findErrorMessage(currentInput, formElement)
    const submitButton = formElement.querySelector(currentSubmitButton)
    if (checkValidation(formElement)) {
        hideErrorMessage(currentErrorMessage)
        activeSubmitButton(submitButton, popupSubmitButtonToggleStyle)

    } else {
        showErrorMessage(currentInput, currentErrorMessage)
        disableSubmitButton(submitButton, popupSubmitButtonToggleStyle)
    }

}
function findErrorMessage(currentInput, formElement) {
    return formElement.querySelector(`.${currentInput.id}-error`)
}

function showErrorMessage(currentInput, currentErrorMessage) {
    currentErrorMessage.textContent = currentInput.validationMessage
}

function hideErrorMessage(currentErrorMessage) {
    currentErrorMessage.textContent = '';
}

function disableSubmitButton(submitButton, popupSubmitButtonToggleStyle) {
    submitButton.classList.add(popupSubmitButtonToggleStyle)
    submitButton.disabled = true;
}


function activeSubmitButton(submitButton, popupSubmitButtonToggleStyle) {
    submitButton.classList.remove(popupSubmitButtonToggleStyle)
    submitButton.disabled = false;
}

