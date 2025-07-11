const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

// Toggle dropdown menu
dropdownToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log("alignment clicked")
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Hide dropdown when clicking outside
document.addEventListener('click', function() {
    dropdownMenu.style.display = 'none';
});

// Handle alignment button clicks
dropdownMenu.querySelectorAll('button').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const command = btn.getAttribute('data-value');
        document.execCommand(command, false, null);

        // Optionally, update the icon on the toggle button
        dropdownToggle.innerHTML = btn.innerHTML;

        dropdownMenu.style.display = 'none';
        });
})



const toolbar = document.getElementById('toolbar');
const editor = document.getElementById('editor');
const state = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    superscript: false,
    subscript: false,
    small: false,
    fontName: "Arial",
    fontSize: "14px",
    foreColor: "black",
    hiliteColor: "yellow",
}


function applyCurrentStyles(span) {
    if (state.bold) span.style.fontWeight = "bold";
    if (state.italic) span.style.fontStyle = "italic";
    if (state.underline) span.style.textDecoration = "underline";
    if (state.strikethrough) span.style.textDecoration = "line-through";
    if (state.superscript) span.style.verticalAlign = "super";
    if (state.subscript) span.style.verticalAlign = "sub";
    if (state.small) span.style.fontSize = "smaller";
    if (state.fontName) span.style.fontFamily = state.fontName;
    if (state.fontSize) span.style.fontSize = state.fontSize;
    if (state.foreColor) span.style.color = state.foreColor;
    if (state.hiliteColor) span.style.backgroundColor = state.hiliteColor;
}

// Todo: Check if the selection has the style
function selectionHasStyle(style) {

}

// Todo: Toggle the style. If the selection has the style, remove it. If the selection does not have the style, add it.
function toggleStyle(style) {

}

// Handle styled typing
editor.addEventListener('beforeinput', (e) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
  
    // If user types a character
    if (e.inputType === 'insertText' && e.data) {
      e.preventDefault();
      const span = document.createElement('span');
      applyCurrentStyles(span);
      span.textContent = e.data;
  
      range.insertNode(span);
      range.setStartAfter(span);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
        e.preventDefault();
        const span = document.createElement('span');
        applyCurrentStyles(span);

        span.textContent = e.data;
        range.deleteContents();
        range.insertNode(span);
        range.setStartAfter(span);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
})


// toolbar.addEventListener('click', function(e) {
//     let command = e.target.id;
//     console.log("Command: ", command)
//     if (!command) return;
//     if (command === 'createLink') {
//         console.log("link clicked")
//         let url = prompt('Enter the link URL:', 'https://');
//         if (url) document.execCommand(command, false, url);
//     } else if (command === 'fontName' || command === 'fontSize' || command === 'foreColor' || command === 'hiliteColor') {
//         // Handled by change event
//     } else {
//         document.execCommand(command, false, null);
//         e.target.classList.toggle("active")
//     }
// });







// document.addEventListener('DOMContentLoaded', function() {
    
//     const fileInput = document.getElementById('fileInput');
//     const imageUploadBtn = document.getElementById('imageUploadBtn');
//     const latexBtn = document.getElementById('latexBtn');
//     const latexModal = document.getElementById('latexModal');
//     const latexInput = document.getElementById('latexInput');
//     const insertLatex = document.getElementById('insertLatex');
//     const closeLatex = document.getElementById('closeLatex');


//     // Color pickers
//     toolbar.querySelectorAll('input[type=color]').forEach(input => {
//         input.addEventListener('input', function(e) {
//             let command = e.target.dataset.command;
//             let value = e.target.value;
//             document.execCommand(command, false, value);
//         });
//     });

//     // Image/File upload
//     imageUploadBtn.addEventListener('click', function() {
//         fileInput.click();
//     });
//     fileInput.addEventListener('change', function(e) {
//         Array.from(e.target.files).forEach(file => {
//             if (file.type.startsWith('image/')) {
//                 const reader = new FileReader();
//                 reader.onload = function(evt) {
//                     document.execCommand('insertImage', false, evt.target.result);
//                 };
//                 reader.readAsDataURL(file);
//             } else {
//                 // Insert a link to the file
//                 const url = URL.createObjectURL(file);
//                 const fileName = file.name;
//                 document.execCommand('insertHTML', false, `<a href="${url}" download>${fileName}</a>`);
//             }
//         });
//         fileInput.value = '';
//     });

//     // LaTeX modal
//     latexBtn.addEventListener('click', function() {
//         latexModal.style.display = 'block';
//     });
//     closeLatex.addEventListener('click', function() {
//         latexModal.style.display = 'none';
//     });
//     insertLatex.addEventListener('click', function() {
//         const latex = latexInput.value.trim();
//         if (latex) {
//             // Insert LaTeX as a span with a special class
//             document.execCommand('insertHTML', false, `<span class="latex">\(${latex}\)</span>`);
//             if (window.MathJax) MathJax.typesetPromise([editor]);
//         }
//         latexInput.value = '';
//         latexModal.style.display = 'none';
//     });

//     // Re-render LaTeX on input
//     editor.addEventListener('input', function() {
//         if (window.MathJax) MathJax.typesetPromise([editor]);
//     });
// });
