const container = document.querySelector('.container');
const btnInput = document.querySelector('.btn-input');
const range = document.getElementById('border-radius');
const clearGrid = document.querySelector('.clear-all');
const toggleGrid = document.getElementById('toggle-grid');
const toggleEraser = document.getElementById('lol-checkbox');
const takeScreenshotBtn = document.querySelector('.take-screen')
let labelGridText = document.querySelector('[for="toggle-grid"]').textContent
let divsInContainer =  document.createElement('div');
let colorPicker = document.getElementById('color-pick');
let toggle = Boolean();
let inputEl = document.querySelector('.input-size')

let colorChoice;

function createGridFromInput(num) {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
        divsInContainer = document.createElement('div')
        divsInContainer.classList.add('square')
        divsInContainer.style.cssText = `height: ${550 / num}px; width: ${550 / num}px;`
        container.appendChild(divsInContainer);
    }
    }
    changeCellRadius(range.value)
}

function enableToggle(e) {
    toggle = true;
    e.preventDefault()
    if (e.target !== container) {
        toggleing(e)
        e.preventDefault()
    }
}

function disableToggle() {
    toggle = false;
}

function toggleing(e) {
    if (toggle === false) {
        return
    }

    //e.target.classList.add('addColorToDiv')
    if (toggleEraser.checked) {
        e.target.classList.remove('addColorToDiv');
        e.target.style.background = '';
    } else if (!toggleEraser.checked) {

        if (!colorChoice) {
            e.target.classList.add('addColorToDiv')
        } else {
        e.target.style.background = colorChoice;
        }
    }
}

function draw() {
    container.onmousedown = enableToggle;
    container.childNodes.forEach(function(div) {
        
        div.onmouseenter = toggleing;
    })
    container.onmouseup = disableToggle;
}

function deleteGrid(container) {
    while(container.firstChild) {
        container.removeChild(container.lastChild)
    }
}

btnInput.addEventListener('click', () => {
    if (inputEl.value > 100 || inputEl.value < 1) {
        alert('Please enter a number between 1 and 100')
    } else {
        deleteGrid(container)
        createGridFromInput(inputEl.value)
        toggleGridOnOff()
        draw()
        inputEl.value = '';
    }
})

range.addEventListener('change', (e) => {
    changeCellRadius(e.target.value)
})

colorPicker.addEventListener('input', (event) => {
    colorChoice = event.target.value;
})

clearGrid.addEventListener('click', () => {
    eraseEverything();
})

function eraseEverything() {
    for (let i = 0; i < container.childNodes.length; i++) {
        if (container.childNodes[i].toString().indexOf('Text') !== -1 ) {
            continue;
        } else {
        container.childNodes[i].classList.remove('addColorToDiv')
        container.childNodes[i].style.backgroundColor = '';
        }
    }
}

function changeCellRadius(radius) {

    for (let i = 0; i < container.childNodes.length; i++) {
        if (container.childNodes[i].toString().indexOf('Text') !== -1 ) {
            continue;
        } else {
        container.childNodes[i].style.cssText += `border-radius: ${radius}%`
        }
    }
    
}

function toggleGridOnOff() {
    if (toggleGrid.checked === false) {
        for (let i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].toString().indexOf('Text') !== -1 ) {
                continue;
            } else {
            container.childNodes[i].style.cssText += 'outline: none'
            }
        }
        
    } else if (toggleGrid.checked) {
        for (let i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].toString().indexOf('Text') !== -1 ) {
                continue;
            } else {
            container.childNodes[i].style.cssText += 'outline: 1px solid grey;'
            }
        }
        
    }
}

toggleGrid.addEventListener('change', toggleGridOnOff)

function report() {
    html2canvas(container, {
      onrendered: function(canvas) {
        // let pngUrl = canvas.toDataURL(); 
        // let img = document.querySelector(".screen");
        // img.src = pngUrl; 
        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        const a = document.createElement('a')
        a.setAttribute('download', 'better-than-van-Gogh.png')
        a.setAttribute('href', image)
        a.click()
      },
    });
  }

takeScreenshotBtn.addEventListener('click', report)

createGridFromInput(34);
draw()