
export class FormValidator {
    constructor(config, currentElementValidate) {//принимает вторым параметром элемент той формы, которая валидируется;
        this.formSelector = config.formSelector
        this.inactiveButtonClass = config.inactiveButtonClass
        this.submitButtonSelector = config.submitButtonSelector
        this.inputErrorClass = config.inputErrorClass
        this.inputSelector = config.inputSelector
        this.currentElementValidate = currentElementValidate
        this.errorClass = config.errorClass



        this.currentInput
        this.currentErrorMessage
        this.currentSubmitButton = this.currentElementValidate.querySelector(this.submitButtonSelector)
        this.inputList = Array.from(this.currentElementValidate.querySelectorAll(this.inputSelector))
    }
    enableValidation() {
        this._disableSubmitButton()
        this._hideErrorMessage()
        // this._resetError()
        this._setEventListeners()

    }

    _setEventListeners() {
        this.currentElementValidate.addEventListener('input', (evt) => {
            this.currentInput = evt.target
            this._hasValidForm()
        });
    }

    _checkValidation() {
        return this.currentElementValidate.checkValidity()
    }



    _hasValidForm() {
        this.currentErrorMessage = this._findErrorMessage()
        this._checkValidation() ? this._activeSubmitButton() : this._disableSubmitButton()
        this._hasValidInput()
    }

    _hasValidInput() {
        this._checkValidation() ? this._hideErrorMessage() : this._showErrorMessage()
    }


    _findErrorMessage() {
        return this.currentElementValidate.querySelector(`.${this.currentInput.id}-error`)
    }

    _showErrorMessage() {
        this.currentInput.classList.add(this.inputErrorClass)
        this.currentErrorMessage.textContent = this.currentInput.validationMessage
    }


    _hideErrorMessage() {
        this.inputList.forEach(input => {
            input.classList.remove(this.inputErrorClass)
            this.currentInput = input
            this._findErrorMessage().textContent = ''
            //  this.currentElementValidate.querySelector(`.${input.id}-error`).textContent = ''
        })


        //this.currentInput.classList.remove(this.inputErrorClass)
        //this.currentErrorMessage.textContent = '';
    }


    _disableSubmitButton() {
        this.currentSubmitButton.classList.add(this.inactiveButtonClass)
        this.currentSubmitButton.disabled = true;
    }

    _activeSubmitButton() {
        this.currentSubmitButton.classList.remove(this.inactiveButtonClass)
        this.currentSubmitButton.disabled = false;
    }
}
