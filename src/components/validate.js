
export const validator = () => (function () {
    enableValidation()
    function enableValidation() {
        const formList = Array.from(document.querySelectorAll('form'));
        formList.forEach((formElement) => {


            setEventListeners(formElement)
        });
    }
    function setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
        inputList.forEach((inputElement) => {
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
        const errorMessage = document.querySelector(`.${inputElement.id}-error`)
        errorMessage.textContent = inputElement.validationMessage

    }
    function hideErrorMessage(inputElement) {
        const errorMessage = document.querySelector(`.${inputElement.id}-error`)
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

})()


