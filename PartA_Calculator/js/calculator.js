$(document).ready(() => {
    const $num1 = $('#num1');
    const $num2 = $('#num2');
    const $result = $('#result');
    const $logoutBtn = $('#logout-btn');

    let session = JSON.parse(sessionStorage.getItem('userSession')) || JSON.parse(localStorage.getItem('userSession'));

    if (!session || !session.isLoggedIn) {
        window.location.href = 'login.html';
        return; // Stop execution
    }

    $('#welcome-message').text(`Welcome, ${session.username}!`);

    const calculate = (num1, num2, operation) => {
        switch (operation) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                return num2 === 0 ? 'Error: Division by Zero' : num1 / num2;
            default:
                return 'Error: Invalid Operation';
        }
    };

    const displayError = (fieldId, message) => {
        $(`#${fieldId}`).addClass('is-invalid');
        $(`#${fieldId}-error`).text(message);
    };

    const clearError = (fieldId) => {
        $(`#${fieldId}`).removeClass('is-invalid');
        $(`#${fieldId}-error`).empty();
    };

    const validateInput = (fieldId) => {
        const $input = $(`#${fieldId}`);
        const value = $input.val().trim();
        clearError(fieldId);

        if (!value) {
            displayError(fieldId, 'This field is required');
            return false;
        }

        // The regex checks for an optional sign, any number of digits, and an optional decimal part.
        const numericRegex = /^-?\d+(\.\d+)?$/; 
        if (!numericRegex.test(value)) {
            displayError(fieldId, 'Please enter a valid number');
            return false;
        }

        return true;
    };

    $num1.on('focus', () => clearError('num1')).on('keyup', () => validateInput('num1'));
    $num2.on('focus', () => clearError('num2')).on('keyup', () => validateInput('num2'));

    $('.calculator-grid button').on('click', (e) => {
        const operation = $(e.currentTarget).data('operation');
        
        if (!validateInput('num1') || !validateInput('num2')) {
            return; // Stop if validation fails
        }

        const num1 = parseFloat($num1.val());
        const num2 = parseFloat($num2.val());
        
        const resultValue = calculate(num1, num2, operation);

        $result.val(resultValue).css('color', resultValue.toString().includes('Error') ? 'red' : 'black');
    });

    $logoutBtn.on('click', () => {
        sessionStorage.removeItem('userSession');
        localStorage.removeItem('userSession');

        $('#calculator-card').fadeOut(500, () => {
            window.location.href = 'login.html';
        });
    });
});