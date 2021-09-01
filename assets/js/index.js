// get all boxes
const boxes = document.querySelectorAll('.box')
//add event listener to all boxes
boxes.forEach( box => {
    box.addEventListener('click', Play)
} )

document.querySelector('.restart-btn').addEventListener('click',()=>location.reload())

// Get the board
let board = document.getElementsByClassName('.board')

const GRID = [
    // horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]

// Player Names
let playerX = String(prompt("Enter Player X Name:"))
let playerCircle = String(prompt("Enter Player O Name:"))

document.querySelector('.X h4').innerText = playerX
document.querySelector('.Circle h4').innerText = playerCircle

// if TURN is true it mean it is x's turn to play
var Turn = true
// Player class turn. The HTML classname of the current player
var PlayerTurnClass = "x"

function PlaceMarker(element){
    element.classList.contains('x') | element.classList.contains('circle') ? null:element.classList.add(PlayerTurnClass)
}

function SwapTurn(){
    Turn = !Turn
    PlayerTurnClass = Turn?"x":"circle"
    document.querySelector('.board').classList.replace( PlayerTurnClass=="x"?"circle":"x" ,PlayerTurnClass)
}

function CheckWin(){
    return GRID.some(set => {
        return set.every( index=>{
            return boxes[index].classList.contains(PlayerTurnClass)
        } )
    })
}

function CheckDraw(){
    return [...boxes].every( box=>{
        return box.classList.contains('x') | box.classList.contains('circle')
    } )
}

function showMessage(title,msg){
    var message = document.querySelector('.message')
    message.querySelector('.msg-title').innerText = title
    message.querySelector('.msg-text').innerText = msg
    message.classList.add('show')
}

//The playing fired by clicks on the board
function Play(){
    PlaceMarker(this)
    var PlayerName = PlayerTurnClass=="x"?playerX:playerCircle 
   CheckWin()? showMessage("WIN", PlayerName + " WON" ): CheckDraw()?showMessage("DRAW", "IT'S A DRAW" ):SwapTurn()
}