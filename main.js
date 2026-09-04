let field = document.querySelector('.field')

var COLORS = [
    "rgb(26, 25, 25)",
    "rgb(255, 102, 46)",
    "rgb(26, 218, 84)",
    "rgb(83, 15, 255)",
    "rgb(255, 236, 26)",
    "rgb(142, 229, 255)"
]

setInterval(function () {
    let result = '';
    let temp_cells = document.querySelectorAll('.cell');

    for (let i = 0; i < temp_cells.length; i += 1) {
        let cell = temp_cells[i];
        let color = cell.style.backgroundColor;

        let colorIndex = "0";
        for (let j = 0; j < COLORS.length; j++) {
            if (color === COLORS[j]) {
                colorIndex = j.toString();
                break;
            }
        }

        result += colorIndex;
    }
    document.cookie = `pixel-result=${result};max-age=100000`;
}, 30000);

function get_result_from_cookie() {
    let cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i += 1) {
        let cookie = cookies[i].split('=')
        if (cookie[0] == 'pixel-result') {
            return cookie[1]
        }
    }
    return '0' * 450
}

let temp_result = get_result_from_cookie();
for (let i = 0; i < 450; i += 1) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', `${i}`);

    if (temp_result !== '0' && temp_result[i] !== undefined) {
        cell.style.backgroundColor = COLORS[parseInt(temp_result[i])];
    } else {
        cell.style.backgroundColor = DEFAULT_COLOR;
    }

    field.appendChild(cell);
}


var CURRENT_COLOR = "rgb(255, 102, 46)";
var DEFAULT_COLOR = "rgb(26, 25, 25)";

var COLOR_MAP = {
    "red": "rgb(255, 102, 46)",
    "green": "rgb(26, 218, 84)",
    "blue": "rgb(83, 15, 255)",
    "yellow": "rgb(255, 236, 26)",
    "skyblue": "rgb(142, 229, 255)"
};

var IS_CLICKED = false;

document.addEventListener('mousedown', function () {
    IS_CLICKED = true;
})

document.addEventListener('mouseup', function () {
    IS_CLICKED = false;
})

let cells = document.querySelectorAll('.cell')
for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    FILL_MODE = false;

    cell.addEventListener('click', function () {
        cell.style.backgroundColor = CURRENT_COLOR;
    })

    cell.addEventListener('mouseover', function () {
        if (IS_CLICKED) {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })

    cell.addEventListener('mousedown', function () {
        if (FILL_MODE) {
            let cell_id = parseInt(cell.getAttribute('id'));


            for (let j = 0; j < cells.length; j++) {
                cells[j].style.backgroundColor = CURRENT_COLOR;
            }
        } else {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })
}

let color_cells = document.querySelectorAll('.color-cell')
for (let i = 0; i < color_cells.length; i++) {
    let color_cell = color_cells[i];
    color_cell.addEventListener('click', function () {
        let colorClass = ""
        if (color_cell.classList.contains("red")) colorClass = "red";
        else if (color_cell.classList.contains("green")) colorClass = "green";
        else if (color_cell.classList.contains("blue")) colorClass = "blue";
        else if (color_cell.classList.contains("yellow")) colorClass = "yellow";
        else if (color_cell.classList.contains("skyblue")) colorClass = "skyblue";

        CURRENT_COLOR = COLOR_MAP[colorClass];

        document.querySelector('.selected').classList.remove('selected')
        color_cell.classList.add('selected')
    })
}

document.querySelector('.eraser').addEventListener('click', function () {
    FILL_MODE = false;
    CURRENT_COLOR = DEFAULT_COLOR;

    document.querySelector('.selected').classList.remove('selected')

    this.classList.add('selected')
})

var FILL_MODE = false;

document.querySelector('.fill-tool').addEventListener('click', function () {
    FILL_MODE = true;

    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})


let save = document.querySelector('.save')
save.addEventListener('click', function() {
    domtoimage.toPng(field)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    
    })

    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
})

let main = document.querySelector('.main-container')
let page = document.querySelector('.all')
document.querySelector('.btn').addEventListener('click', function() {
    main.style.opacity = '1';
    main.style.display = 'block';
    page.style.opacity = '0';
    page.style.display = 'none'
})
