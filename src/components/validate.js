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
    hasValidInput(currentInput, currentErrorMessage)
}

function hasValidInput(currentInput, currentErrorMessage) {
    if (checkValidation(currentInput)) {
        hideErrorMessage(currentErrorMessage, currentInput)
    }
    else {
        showErrorMessage(currentErrorMessage, currentInput)
    }
}


function findErrorMessage(currentInput, formElement) {
    return formElement.querySelector(`.${currentInput.id}-error`)
}

function showErrorMessage(currentErrorMessage, currentInput) {
    currentInput.classList.add('popup__input_error-style')
    currentErrorMessage.textContent = currentInput.validationMessage

}

function hideErrorMessage(currentErrorMessage, currentInput) {
    currentInput.classList.remove('popup__input_error-style')
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
    // очищаем ошибки валидации
    inputList.forEach(inputElement => hideErrorMessage(findErrorMessage(inputElement, formElement), inputElement));
    // актуализируем состояние кнопки сабмита
    /*toggleButtonState(formElement, inputList, config); */
}


