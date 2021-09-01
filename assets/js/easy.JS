// get all boxes
const boxes = document.querySelectorAll('.box')
//add event listener to all boxes
boxes.forEach( box => {
    box.addEventListener('click', Play)
})

// Restart BUTTON
document.querySelector('.restart-btn').addEventListener('click',()=>location.reload())

// Get the board
let board = document.getElementsByClassName('.board')

const GRID = [
    // horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // diagonal
    [0,4,8],
    [2,4,6]
]

// Player Names
let playerX = "Ronald"//String(prompt("Enter Player X Name:"))
let playerCircle = "Jess" //String(prompt("Enter Player O Name:"))

document.querySelector('.X h4').innerText = playerX
document.querySelector('.Circle h4').innerText = playerCircle

// if TURN is true it mean it is x's turn to play
var Turn = true
// Player class turn. The HTML classname of the current player
var PlayerTurnClass = "x"

function PlaceMarker(element){
    if(element.classList.contains('x') | element.classList.contains('circle')){
        //alert("Box has already been selected..")
    }else{
        element.classList.add(PlayerTurnClass)
    }
}

function SwapTurn(){
    Turn = !Turn
    PlayerTurnClass = Turn?"x":"circle"
    document.querySelector('.board').classList.replace( PlayerTurnClass=="x"?"circle":"x" ,PlayerTurnClass)
}

function CheckWin(){
    // For some set in th grid
    return GRID.some(set => {
        //For every element in the set
        return set.every( index=>{
            // return true if the box class Check is valid
            return boxes[index].classList.contains(PlayerTurnClass)
        })
    })
}

function CheckDraw(){
    return [...boxes].every( box=>{
        if(box.classList.contains('x') | box.classList.contains('circle')){
            return true
        }
    } )
}

function showMessage(title,msg){
    var message = document.querySelector('.message')
    message.querySelector('.msg-title').innerText = title
    message.querySelector('.msg-text').innerText = msg
    message.classList.add('show')
}

//The playing fired by clicks on the board boxes
function Play(){
    PlaceMarker(this)
    var PlayerName = "" 

    if(PlayerTurnClass=="x"){
        PlayerName = playerX
    }else{
        PlayerName = playerCircle
    }

    if(CheckWin()){
        showMessage("WIN", PlayerName + " WON" )
    }else if(CheckDraw()){
        showMessage("DRAW", "IT'S A DRAW" )
    }else{
        SwapTurn()
    }
}