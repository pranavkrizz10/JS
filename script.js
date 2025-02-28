const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const times=document.querySelectorAll(".times")
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let botIndex=0;
let firstChance=true;
let botTime=0.25;
initializeGame();
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running || currentPlayer!='X'){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    
    if(currentPlayer=="O"){
        statusText.textContent = `My turn`;
        botTurn();
    }
    else{
        statusText.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;    
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `I WIN!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `DRAW!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    botIndex=0;
    firstChance=true;
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

async function botTurn() {
     setTimeout(async () => {
        if (possibleWin()) {
            // Successfully marked winning move
        } else if (firstChance) {
            firstBotTurn();
        } else if (blockWin()) {
            // Blocked opponent's win
        } else {
            markCorner(); // Default move
        }

        // Ensure checkWinner() runs after all conditions
        await checkWinner();
    }, botTime*1000);
}


function firstBotTurn(){
    if(options[4]==''){
        options[4] = currentPlayer;
        cells[4].textContent = currentPlayer;
        firstChance=false;
    }
    else{
        markCorner();
        firstChance=false
    }
}

function markCorner(){
    let randint=randInt();
        while(options[randint]!=''){
            randint=randInt(); 
        }
        options[randint]=currentPlayer;
        cells[randint].textContent = currentPlayer;
}

function possibleWin(){
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        let ind=0;
        if(cellA == "" && cellB == "" || cellA == "" && cellC == "" || cellB == "" && cellC == "" || cellA == "" && cellB == "" && cellC == ""){
            continue;
        }
        else if(cellA == cellB && cellC == '' && cellA=='O'){
            ind=condition[2];
            options[ind] = currentPlayer;
            cells[ind].textContent = currentPlayer;
            return true;
        } else if (cellC == cellB && cellA==''&& cellB=='O'){
            ind=condition[0];
            options[ind] = currentPlayer;
            cells[ind].textContent = currentPlayer;
            return true;
        } else if(cellA == cellC && cellB=='' && cellA=='O'){
            ind=condition[1];
            options[ind] = currentPlayer;
            cells[ind].textContent = currentPlayer;
            return true;
        }
    }
}

function blockWin(){
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        let ind=0;
        if(cellA == "" && cellB == "" || cellA == "" && cellC == "" || cellB == "" && cellC == "" || cellA == "" && cellB == "" && cellC == ""){
            continue;
        }
        else if(cellA == cellB && cellC == ''){
            ind=condition[2];
            options[ind] = currentPlayer;
            cells[ind].textContent = currentPlayer;
            return true;
        } else if (cellC == cellB && cellA==''){
            ind=condition[0];
            console.log(options[condition[0]])
            options[ind] = currentPlayer;
            cells[ind].textContent = currentPlayer;
            return true;
        } else if(cellA == cellC && cellB==''){
            ind=condition[1];
            options[ind] = currentPlayer;
            cells[ind].textContent = currentPlayer;
            return true;
        }
    }
}

function randInt(){
    const nums = [0, 2, 6, 8];
    const randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
}

times.forEach(time=> {
    time.addEventListener('click',()=>{
        botTime=parseFloat(time.innerText);
        document.getElementById('selectedTime').innerHTML=`<h3>Bot response speed: ${botTime}s</h3> `
    })
})
