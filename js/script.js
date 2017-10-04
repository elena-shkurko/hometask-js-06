document.addEventListener('DOMContentLoaded', () => {
    var containerBlock = document.querySelector('#container-block');
    var innerBlock = document.querySelector('#inner-block');
    var textareaBlock = document.querySelector('#textarea-block');
    var pressKey = document.querySelector('#press-key');

    var manager = TaskManager(containerBlock, innerBlock, textareaBlock, pressKey);
    manager.bindEventHandlers();
});

var TaskManager = (containerBlock, innerBlock, textareaBlock, pressKey) => {
    const CTRL_BUTTON_CODE = 17;
    const S_BUTTON_CODE = 83;
    const E_BUTTON_CODE = 69;
    const ESC_BUTTON_CODE = 27;

    var toggleEdit = () => {
        containerBlock.classList.toggle("editMode");
    };

    var SaveValue = (event) => {
        var containsClass = containerBlock.classList.contains("editMode");

        if (containsClass) {
            innerBlock.innerText = textareaBlock.value;

        } else {
            textareaBlock.value = innerBlock.innerText;
        }
    };

    var cancelEditing = () => {
        textareaBlock.value = '';
        containerBlock.classList.remove('editMode');
    };

    var bindEventHandlersToKeys = () => {
        toggleEdit();
        SaveValue();
        cancelEditing();
    };

    var bindKeyboardShortcutsHandlers = () => {

        var isCtrlPressed = false;

        document.onkeydown = (event) => {
            console.log('Pressed button #' + event.which);
            if (event.which == CTRL_BUTTON_CODE) {
                isCtrlPressed = true
            }
            if (event.which == S_BUTTON_CODE && isCtrlPressed) {
                event.preventDefault();
                SaveValue();
                pressKey.innerText = 'You pressed "Ctrl + S"';
                isCtrlPressed = false
            }
            if (event.which == E_BUTTON_CODE && isCtrlPressed) {
                event.preventDefault();
                toggleEdit();
                pressKey.innerText = 'You pressed "Ctrl + E"';
                isCtrlPressed = false
            }
        };
        document.onkeyup = (event) => {
            if (event.which == ESC_BUTTON_CODE) {
                event.preventDefault();
                cancelEditing();
                pressKey.innerText = 'You pressed "Esc"';
            }
            console.log('Leaved button #' + event.which);
        };
    };

    return {
        bindEventHandlers: () => {
            bindEventHandlersToKeys();
            bindKeyboardShortcutsHandlers();
        }
    };

};