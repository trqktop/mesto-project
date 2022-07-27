//export { resetError, enableValidation, disableSubmitButton, findErrorMessage, hideErrorMessage }


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export class FormValidator {
    constructor(config) {
        this.formSelector = config.formSelector
        this.inactiveButtonClass = config.inactiveButtonClass
        this.submitButtonSelector = config.submitButtonSelector
        this.inputErrorClass = config.inputErrorClass
        this.inputSelector = config.inputSelector
    }
    enableValidation() {
        const formArr = Array.from(document.querySelectorAll(this.formSelector))
        formArr.forEach((formElement) => {
            this._setEventListeners(formElement)
        });
    }

    _setEventListeners(formElement) {
        const popupSubmitButtonToggleStyle = this.inactiveButtonClass;
        formElement.addEventListener('input', function (evt) {
            this._hasValidForm(formElement, evt.target, popupSubmitButtonToggleStyle)
        });
    }

    _checkValidation(formElement) {
        return formElement.checkValidity()
    }

    _hasValidForm(formElement, currentInput, popupSubmitButtonToggleStyle) {
        const currentErrorMessage = this._findErrorMessage(currentInput, formElement)
        const submitButton = formElement.querySelector(this.submitButtonSelector)
        if (this._checkValidation(formElement)) {
            this._activeSubmitButton(submitButton, popupSubmitButtonToggleStyle)
        } else {
            this._disableSubmitButton(submitButton, popupSubmitButtonToggleStyle)
        }
        this._hasValidInput(currentInput, currentErrorMessage)
    }

    _hasValidInput(currentInput, currentErrorMessage) {
        if (this._checkValidation(currentInput)) {
            this._hideErrorMessage(currentErrorMessage, currentInput)
        }
        else {
            this._showErrorMessage(currentErrorMessage, currentInput)
        }
    }


    _findErrorMessage(currentInput, formElement) {
        return formElement.querySelector(`.${currentInput.id}-error`)
    }

    _showErrorMessage(currentErrorMessage, currentInput) {
        currentInput.classList.add(this.inputErrorClass)
        currentErrorMessage.textContent = currentInput.validationMessage

    }

    _hideErrorMessage(currentErrorMessage, currentInput) {
        currentInput.classList.remove(this.inputErrorClass)
        currentErrorMessage.textContent = '';
    }


    _disableSubmitButton(submitButton, popupSubmitButtonToggleStyle) {
        submitButton.classList.add(popupSubmitButtonToggleStyle)
        submitButton.disabled = true;
    }

    _activeSubmitButton(submitButton, popupSubmitButtonToggleStyle) {
        submitButton.classList.remove(popupSubmitButtonToggleStyle)
        submitButton.disabled = false;
    }


    resetError(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
        inputList.forEach(inputElement => this._hideErrorMessage(this._findErrorMessage(inputElement, formElement), inputElement));
    }

}


