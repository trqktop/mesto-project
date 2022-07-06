export { resetError, enableValidation, disableSubmitButton, findErrorMessage, hideErrorMessage }


// включение валидации вызовом enableValidation
// все настройки передаются при вызове


function enableValidation(config) {
    const formArr = Array.from(document.querySelectorAll(config.formSelector))
    formArr.forEach((formElement) => {
        setEventListeners(config, formElement)
    });
}


function setEventListeners(config, formElement) {
    const popupSubmitButtonToggleStyle = config.inactiveButtonClass;
    formElement.addEventListener('input', function (evt) {
        hasValidForm(config, formElement, evt.target, popupSubmitButtonToggleStyle)
    });
}

function checkValidation(formElement) {
    return formElement.checkValidity()
}

function hasValidForm(config, formElement, currentInput, popupSubmitButtonToggleStyle) {
    const currentErrorMessage = findErrorMessage(currentInput, formElement)
    const submitButton = formElement.querySelector(config.submitButtonSelector)
    if (checkValidation(formElement)) {
        activeSubmitButton(submitButton, popupSubmitButtonToggleStyle)
    } else {
        disableSubmitButton(submitButton, popupSubmitButtonToggleStyle)
    }
    hasValidInput(currentInput, currentErrorMessage, config)
}

function hasValidInput(currentInput, currentErrorMessage, config) {
    if (checkValidation(currentInput)) {
        hideErrorMessage(currentErrorMessage, currentInput, config)
    }
    else {
        showErrorMessage(currentErrorMessage, currentInput, config)
    }
}


function findErrorMessage(currentInput, formElement) {
    return formElement.querySelector(`.${currentInput.id}-error`)
}

function showErrorMessage(currentErrorMessage, currentInput, config) {
    currentInput.classList.add(config.inputErrorClass)
    currentErrorMessage.textContent = currentInput.validationMessage

}

function hideErrorMessage(currentErrorMessage, currentInput, config) {
    currentInput.classList.remove(config.inputErrorClass)
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


function resetError(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach(inputElement => hideErrorMessage(findErrorMessage(inputElement, formElement), inputElement, config));
}

