// Find the input element
var input = document.getElementById('decimal-field');

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    function restrictInput() {
        if (inputFilter(this.value)) {
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
            this.oldValue = this.value;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    }

    // Truncate to 15 chars.
    textbox.value = textbox.value.substring(0, 15);

    // Apply restriction when typing, copying/pasting, dragging-and-dropping, etc.
    textbox.addEventListener("input", restrictInput);
    textbox.addEventListener("keydown", restrictInput);
    textbox.addEventListener("keyup", restrictInput);
    textbox.addEventListener("mousedown", restrictInput);
    textbox.addEventListener("mousedown", restrictInput);
    textbox.addEventListener("contextmenu", restrictInput);
    textbox.addEventListener("drop", restrictInput);
}

// Checks whether an input should be treated like an empty decimal value.
function isEmptyDecimal(value) {
    return value === "" || value === "-" || value === "." || value === "-.";
}

// If the field is not marked readonly, then restrict input to decimal only.
if(!fieldProperties.READONLY) {
    setInputFilter(input, function (value) {
        // Empty value.
        if (isEmptyDecimal(value)) {
            return true;
        }

        // Only 15 characters allowed.
        if (value.length > 15) {
            return false;
        }

        // Only allow digits (optionally with one decimal separator) to be entered.
        // A negative sign at the beginning is also allowed.
        return /^-?\d*[.]?\d*$/.test(value);
    });
}

// Define what happens when the user attempts to clear the response
function clearAnswer() {
    input.innerHTML = '';
} 

// If the field is not marked readonly, then focus on the field and show the on-screen keyboard (for mobile devices)
function setFocus() {
    if(!fieldProperties.READONLY){
        input.focus();
        if (window.showSoftKeyboard) {
            window.showSoftKeyboard();
        }
    }
}

// Save the user's response (update the current answer)
input.oninput = function() {
    setAnswer(isEmptyDecimal(input.value) ? "" : input.value);
};
