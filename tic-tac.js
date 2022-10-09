const cells = document.querySelectorAll("[data-cell]")
const board = document.querySelector("#board")
const displayMsg = document.querySelector("#display-message")
const winTxt = document.querySelector("#display-message h2")
const restartBtn = document.querySelector("#restart-btn")

const xScoreBox = document.querySelector("#x-score")

const cScoreBox = document.querySelector("#circle-score")

const themeBtn = document.querySelector("#changeTheme")

const timer = document.querySelector("#timer")


const C_CLASS = 'circle'
const X_CLASS = 'x'
let circleTurn = false
let isWin = false

board.classList.add(X_CLASS)

themeBtn.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark-theme")
  if (themeBtn.textContent.includes("🌙")) {
    themeBtn.textContent = "☀️"
  } else {
    themeBtn.textContent = "🌙"
  }
})

const handleClick = (e) => {
  let nextTurn = circleTurn ? C_CLASS : X_CLASS
  
  e.target.classList.add(nextTurn)
  hover(!circleTurn)
  
  nextMove()
  checkWin()
  checkDraw()

  isWin = false
  
}

function hover (par) {
  board.classList.remove(X_CLASS, C_CLASS)
  par ? board.classList.add(C_CLASS) : board.classList.add(X_CLASS)
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, {once: true})
})

function nextMove () {
  circleTurn = !circleTurn
}

let xScore = 0
let cScore = 0

function checkWin () {

  let cellArr = [...cells]
  let winner;
  
  if (
    cellArr[0].classList.contains(X_CLASS) &&
    cellArr[1].classList.contains(X_CLASS) &&
    cellArr[2].classList.contains(X_CLASS) ||
    cellArr[3].classList.contains(X_CLASS) &&
    cellArr[4].classList.contains(X_CLASS) &&
    cellArr[5].classList.contains(X_CLASS) ||
    cellArr[6].classList.contains(X_CLASS) &&
    cellArr[7].classList.contains(X_CLASS) &&
    cellArr[8].classList.contains(X_CLASS) 
||
  
    cellArr[0].classList.contains(X_CLASS) &&
    cellArr[3].classList.contains(X_CLASS) &&
    cellArr[6].classList.contains(X_CLASS) ||
    cellArr[1].classList.contains(X_CLASS) &&
    cellArr[4].classList.contains(X_CLASS) &&
    cellArr[7].classList.contains(X_CLASS) ||
    cellArr[2].classList.contains(X_CLASS) &&
    cellArr[5].classList.contains(X_CLASS) &&
    cellArr[8].classList.contains(X_CLASS) ||
  
    cellArr[0].classList.contains(X_CLASS) &&
    cellArr[4].classList.contains(X_CLASS) &&
    cellArr[8].classList.contains(X_CLASS) ||
  
    cellArr[2].classList.contains(X_CLASS) &&
    cellArr[4].classList.contains(X_CLASS) &&
    cellArr[6].classList.contains(X_CLASS)
  
  ) {
    winner = "X Wins!";
    xScore = xScore + 1
    end()
    endGame(winner)
    xScoreBox.textContent = `${xScore}`
    cScoreBox.textContent = `${cScore}`
    
    if (xScore < cScore) {
      xScoreBox.style.color = "red"
      cScoreBox.style.color = "green"
    } else if (cScore < xScore) {
      xScoreBox.style.color = "green"
      cScoreBox.style.color = "red"
    } else {
      xScoreBox.style.color = "gray"
      cScoreBox.style.color = "gray"
    }
    
    isWin = true
    
  } else if (
  
    cellArr[0].classList.contains(C_CLASS) &&
    cellArr[1].classList.contains(C_CLASS) &&
    cellArr[2].classList.contains(C_CLASS) ||
    cellArr[3].classList.contains(C_CLASS) &&
    cellArr[4].classList.contains(C_CLASS) &&
    cellArr[5].classList.contains(C_CLASS) ||
    cellArr[6].classList.contains(C_CLASS) &&
    cellArr[7].classList.contains(C_CLASS) &&
    cellArr[8].classList.contains(C_CLASS) 
||
  
    cellArr[0].classList.contains(C_CLASS) &&
    cellArr[3].classList.contains(C_CLASS) &&
    cellArr[6].classList.contains(C_CLASS) ||
    cellArr[1].classList.contains(C_CLASS) &&
    cellArr[4].classList.contains(C_CLASS) &&
    cellArr[7].classList.contains(C_CLASS) ||
    cellArr[2].classList.contains(C_CLASS) &&
    cellArr[5].classList.contains(C_CLASS) &&
    cellArr[8].classList.contains(C_CLASS) ||
  
    cellArr[0].classList.contains(C_CLASS) &&
    cellArr[4].classList.contains(C_CLASS) &&
    cellArr[8].classList.contains(C_CLASS) ||
  
    cellArr[2].classList.contains(C_CLASS) &&
    cellArr[4].classList.contains(C_CLASS) &&
    cellArr[6].classList.contains(C_CLASS)
  
  ) {
    winner = "Circle Wins!";
    cScore = cScore + 1
    end()
    endGame(winner)
    cScoreBox.textContent = `${cScore}`
    xScoreBox.textContent = `${xScore}`
    
    if (xScore < cScore) {
      xScoreBox.style.color = "red"
      cScoreBox.style.color = "green"
    } else if (cScore < xScore) {
      xScoreBox.style.color = "green"
      cScoreBox.style.color = "red"
    } else {
      xScoreBox.style.color = "gray"
      cScoreBox.style.color = "gray"
    }
    
    isWin = true
  }
  
}

function checkDraw () {
  let arr = [...cells]
  
  let draw = arr.every(val => {
    
    if (
      (val.classList.contains(X_CLASS) || val.classList.contains(C_CLASS)) && !isWin
    ) {
      return true
    }
  })
  
  if (draw) {
    xScoreBox.textContent = `${xScore}`
    cScoreBox.textContent = `${cScore}`
    end()
    endGame("Draw")
  }
}


function endGame (winner) {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick)
  })
  board.classList.remove(X_CLASS, C_CLASS)
  winTxt.textContent = `${winner}`
  displayMsg.classList.add("show-message")
}

restartBtn.addEventListener('click', () => {
  winTxt.textContent = ''
  displayMsg.classList.remove("show-message")
  hover(circleTurn)
  start(true)

  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
    cell.classList.remove(X_CLASS, C_CLASS)
  })
})

function start (val) {
  
  const startTime = new Date()
  
  board.addEventListener("click", (e) => {
    if (board.contains(e.target)) {
      
      if (val) {
        console.log("Fired!")
      } else {
        console.log("Ended!")
      }
      
      //let timerId = setInterval(funx,1000)
    }
  }, {once: true})
  
}
start(true)

function end () {
  start(false)
}

function increment () {
  
  if (Number(timer.textContent) <= 8) {
    timer.textContent = `0${Number(timer.textContent) + 1}`;
  } else {
    timer.textContent = `${Number(timer.textContent) + 1}`;
  }
}



