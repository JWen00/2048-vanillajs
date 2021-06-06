var BOARD_SIZE = 4;
var SQUARE_WIDTH = 50; 
var BORDER_WIDTH = 3;
var GAME_OVER = false;

function render_square(index, value) { 
    let id = "square" + String(index);
    var square = document.getElementById(id);
    if (value == '2') square.style.backgroundColor = "#EEE4DA";
    else if (value == '4') square.style.backgroundColor = "#EDE0C8";
    else if (value == '8') square.style.backgroundColor = "#F2B179";
    else if (value == '16') square.style.backgroundColor = "#F59563";
    else if (value == '32') square.style.backgroundColor = "#EEE4DA";
    else if (value == '64') square.style.backgroundColor = "#F65E3B";
    else if (value == '128') square.style.backgroundColor = "#EDCF72";
    else if (value == '256') square.style.backgroundColor = "#EEE4DA";
    else if (value == '512') square.style.backgroundColor = "#EEE4DA";
    else if (value == '1024') square.style.backgroundColor = "#EEE4DA";
    else if (value == '2048') square.style.backgroundColor = "#EEE4DA";
    else if (value == '0') square.style.backgroundColor = "#CDC1B4";
    if (value != 0) square.innerHTML = value;
    else square.innerHTML = "";
}
function isGameOver(board) { 
    // Check down 
    for (let i = 0; i < BOARD_SIZE - 1; ++i) { 
        for (let j = 0; j < BOARD_SIZE; ++j) { 
            if (board[i][j] == 0)  {
                return false;
            } 
            if (board[i][j] == board[i + 1][j]) return false;
        }
    }
    // Check right
    for (let i = 0; i < BOARD_SIZE; ++i) { 
        for (let j = 0; j < BOARD_SIZE - 1; ++j) { 
            if (board[i][j] == 0) {
                console.log(i, j, "is empty");
                return false;
            }  
            if (board[i][j] == board[i][j + 1]) return false;
        }
    }
    if (board[BOARD_SIZE - 1][BOARD_SIZE - 1] == 0) return false;
    return true;
}
function addNew(board) { 
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.ceil(max));
    }
      
    let a = [];
    for (let i = 0; i < BOARD_SIZE; ++i) { 
        for (let j = 0; j < BOARD_SIZE; ++j) {
            if (board[i][j] == 0) a.push(i * BOARD_SIZE + j); 
        }
    } 
    if (a.length == 0) return board; 

    let new_location = a[getRandomInt(a.length)];
    let new_value = getRandomInt(2) % 2 ? 2 : 4; 
    board[Math.floor(new_location / BOARD_SIZE)][new_location % BOARD_SIZE] = new_value;
    return board;
}
function slide(board, direction) {
    if (direction == "up") { 
        for (let j = 0; j < BOARD_SIZE; ++j) {  
            for (let i = 0; i < BOARD_SIZE - 1; ++i) {  
                if (board[i][j] == 0) { 
                    for (let t = i + 1; t < BOARD_SIZE; ++t) { 
                        if (board[t][j] != 0) {
                            board[i][j] = board[t][j];
                            board[t][j] = 0;
                            break;
                        }
                    }
        
                }
            } 
        } 
    } else if (direction == "left") { 
        for (let i = 0; i < BOARD_SIZE; ++i) {  
            for (let j = 0; j < BOARD_SIZE - 1; ++j) {  
                if (board[i][j] == 0) { 
                    for (let t = j + 1; t < BOARD_SIZE; ++t) { 
                        if (board[i][t] != 0) {
                            board[i][j] = board[i][t];
                            board[i][t] = 0;
                            break;
                        }
                    }
        
                }
            } 
        } 

    } else if (direction == "right") { 
        for (let i = 0; i < BOARD_SIZE; ++i) {  
            for (let j = BOARD_SIZE - 1; j > 0; --j) {  
                if (board[i][j] == 0) { 
                    for (let t = j - 1; t >= 0; --t) { 
                        if (board[i][t] != 0) {
                            board[i][j] = board[i][t];
                            board[i][t] = 0;
                            break;
                        }
                    }
        
                }
            } 
        } 
    } else if (direction == "down") { 
        for (let j = 0; j < BOARD_SIZE; ++j) {  
            for (let i = BOARD_SIZE - 1; i > 0; --i) {  
                if (board[i][j] == 0) { 
                    for (let t = i - 1; t >= 0; --t) { 
                        if (board[t][j] != 0) {
                            board[i][j] = board[t][j];
                            board[t][j] = 0;
                            break;
                        }
                    }
        
                }
            } 
        } 
    }
    return board;
}
function merge(board, direction) {
    if (direction == "up") { 
        for (let j = 0; j < BOARD_SIZE; ++j) {  
            for (let i = 0; i < BOARD_SIZE - 1; ++i) {  
                if (board[i][j] == board[i+1][j]) { 
                    board[i][j] *= 2;
                    board[i+1][j] = 0;
                }
            } 
        } 
    } else if (direction == "left") { 
        for (let i = 0; i < BOARD_SIZE; ++i) {  
            for (let j = 0; j < BOARD_SIZE - 1; ++j) {  
                if (board[i][j] == board[i][j+1]) { 
                    board[i][j] *= 2;
                    board[i][j+1] = 0;
                }
            } 
        } 
    } else if (direction == "right") { 
        for (let i = 0; i < BOARD_SIZE; ++i) {  
            for (let j = BOARD_SIZE - 1; j > 0; --j) {  
                if (board[i][j] == board[i][j-1]) { 
                    board[i][j] *= 2;
                    board[i][j-1] = 0;
                }
            } 
        } 
    } else if (direction == "down") { 
        for (let j = 0; j < BOARD_SIZE; ++j) {  
            for (let i = BOARD_SIZE - 1; i > 0; --i) {  
                if (board[i][j] == board[i-1][j]) { 
                    board[i][j] *= 2;
                    board[i-1][j] = 0;
                }
            } 
        } 
    }
    return board;
}
function calculateBoard(board, direction) { 
    board = slide(board, direction);  
    board = merge(board, direction); 
    board = slide(board, direction); 
    return board;
}
function renderBoard(board) { 
    for (let i = 0; i < BOARD_SIZE; ++i) { 
        for (let j = 0; j < BOARD_SIZE; ++j) { 
            render_square((i*BOARD_SIZE) + j + 1, board[i][j])
        }
    }
}
function generateHTML() { 
    let game_board = document.getElementById('game-board'); 
    let game_over = document.getElementById('game-over');
    let game_container = document.getElementById('game-container');
    game_over.style.zIndex = 0;
    for (let i = 0; i < BOARD_SIZE; ++i) { 
        let newRow = document.createElement('div'); 
        newRow.classList.add('row');
        for (let j = 0; j < BOARD_SIZE; ++j) { 
             let newSq = document.createElement('div');
             newSq.classList.add("square");
             newSq.id = "square" + String(i * BOARD_SIZE + j + 1);
             newRow.appendChild(newSq);
        }
        game_board.appendChild(newRow);
    } 
    let board_size = BOARD_SIZE * SQUARE_WIDTH + BORDER_WIDTH * 2;
    game_over.style.height = String(board_size) + "px";
    game_over.style.width = String(board_size) + "px";
    game_container.style.height = String(board_size) + "px";
    game_container.style.width = String(board_size) + "px";
    return board;
}
function createBoard() { 
    let board = []; 
    document.getElementById('game-over').style.zIndex = 0;
    for (let i = 0; i < BOARD_SIZE; ++i) { 
        let newRow = document.createElement('div'); 
        newRow.classList.add('row');
        var new_row = []; 
        for (let j = 0; j < BOARD_SIZE; ++j) { 
             if (i == 0 && j == 0) { 
                 new_row.push(2);
             }
             else new_row.push(0);
        }
        board.push(new_row);
    } 
    return board;
}
function restart() { 
    GAME_OVER = false;
    board = createBoard();
    renderBoard(board); 
}

function setBoardSize() {
    let input = document.getElementById('input-board-size');
    let new_size = Number(input.value); 
    if (new_size > 20) { 
        input.style.border = "1px solid red;"; 
    }
    document.getElementById('game-board').innerHTML = '';
    BOARD_SIZE = new_size; 
    generateHTML(); 
    board = createBoard();
    renderBoard(board); 
}

var board = createBoard();
generateHTML();
renderBoard(board);
document.addEventListener('keydown', (e) => { 
    
    if (e.code == "ArrowUp") { 
        e.preventDefault();
        board = calculateBoard(board, "up");
    } else if (e.code == "ArrowDown") { 
        e.preventDefault();
        board = calculateBoard(board, "down"); 
    } else if (e.code == "ArrowLeft") { 
        e.preventDefault();
        board = calculateBoard(board, "left");
    } else if (e.code == "ArrowRight") {
        e.preventDefault();
        board = calculateBoard(board, "right");
    }  else return;
    
    if (GAME_OVER) return;
    board = addNew(board);
    if (isGameOver(board) == true) {  
        document.getElementById('game-over').style.zIndex = 10;
        GAME_OVER = true;
    }
    renderBoard(board);
})


/* Adjust board size via input*/
var input = document.getElementById('input-board-size');
var decBtn = document.getElementById('decrement-btn');
var incBtn = document.getElementById('increment-btn');
var errMsg = document.getElementById('input-error-msg');
var setBtn = document.getElementById('set-size-btn');
var currValue = BOARD_SIZE;
input.value = currValue;
input.onchange = () => {
    currValue = Number(input.value)
    if (currValue > 30 || currValue < 3) { 
        input.style.border = '1px solid red'
        errMsg.style.display = 'block';
        setBtn.disabled = true;
        setBtn.style.opacity = 0.7;
        console.log('disabled: ', setBtn.disabled);
    } else { 
        errMsg.style.display = 'none';
        input.style.border = 'none';
        setBtn.disabled = false;
        setBtn.style.opacity = 1;


    }
}
incBtn.addEventListener('click', () => {
    if (currValue < 30) {
        input.value = ++currValue;
        console.log(currValue, input.value)
        incBtn.style.opacity = 1;
        decBtn.style.opacity = 1;
    } 
    
    if (currValue === 30) { 
        incBtn.style.opacity = 0.7;
    }
})
decBtn.addEventListener('click', () => { 
    if (currValue > 3) {
        input.value = --currValue;
        decBtn.style.opacity = 1;
        incBtn.style.opacity = 1;
    }
    
    if (currValue === 3) {
        decBtn.style.opacity = 0.7;
    }

})
