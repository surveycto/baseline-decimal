// Find the input element
var input = document.getElementById('decimal-field');

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
    setAnswer(input.value);
}
