// DOM elements...
const doc = document.querySelector("body")
const root = document.querySelector(":root")
const cells = document.querySelectorAll("[data-cell]")
const board = document.querySelector("#board")
const displayMsg = document.querySelector("#display-message")
const winTxt = document.querySelector("#display-message h2")
const restartBtn = document.querySelector("#restart-btn")
const menuItems = document.querySelectorAll(`.menu-item`)
const menuBtn = document.querySelector(".menu")
const aside = document.querySelector("aside")
const xScoreBox = document.querySelector("#x-score")
const cScoreBox = document.querySelector("#circle-score")
const themeBtn = document.querySelector("#changeTheme")
const themeForm = document.querySelector(".theme-options")
const darkTM = document.querySelector("#darkTM")
const lightTM = document.querySelector("#lightTM")
const timer = document.querySelector("#timer")
const fastMsg = document.querySelector(".fastestWin")
const inputField = document.querySelector("#username")
const userForm = document.querySelector(".action")

// variables...
let popArr = []
let popUp
let xScore = 0
let cScore = 0
let prevVal = 1
let timerArr = []
let xGameTime = []
let cGameTime = []
let minTime
const C_CLASS = 'circle'
const X_CLASS = 'x'
let circleTurn = false
let isWin = false

board.classList.add(X_CLASS)


// UI rendering...
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("close")
  aside.classList.toggle("show")
  document.querySelectorAll(".action").forEach(item => {
    item.classList.remove("show")
  })
})

userForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let user = inputField.value
  document.querySelectorAll(".action")[0].classList.remove("show")
  popUp = confirm("Click 'OK' to select X or click 'CANCEL' to select Circle")

  popUp ? alert("Username set on (x)") : alert("Username set on (circle)")
  popUp ? popArr[0] = user : popArr[0] = undefined
  localStorage.setItem("username", user)
  inputField.value = ''

  let xLabel = document.querySelector(`label[for="x-score"]`).textContent
  let cLabel = document.querySelector(`label[for="circle-score"]`).textContent

  if (popArr[0] && popUp === true) {
    document.querySelector(`label[for="x-score"]`).textContent = `${localStorage.getItem("username")}`
  } else {
    document.querySelector(`label[for="x-score"]`).textContent = 'X'
  }

  if (popArr[0] === undefined && popUp === false) {
    document.querySelector(`label[for="circle-score"]`).textContent = `${localStorage.getItem("username")}`
  } else {
    document.querySelector(`label[for="circle-score"]`).textContent = 'O'
  }


  console.log(xLabel);
  console.log(cLabel);
})

themeForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const darkTheme = darkTM.checked
  const lightTheme = lightTM.checked

  if (darkTheme) {
    localStorage.setItem("theme", "dark")
    doc.classList.add("dark-theme")
    themeBtn.textContent = "☀️"
  }

  if (lightTheme) {
    localStorage.setItem("theme", "light")
    doc.classList.remove("dark-theme")
    themeBtn.textContent = "🌙"
  }

  const disMsg = darkTheme ? "Dark theme enabled" : "Light theme enabled"
  document.querySelectorAll(".action")[1].classList.remove("show")
  alert(disMsg)
})

window.addEventListener("load", () => {

  if (localStorage.getItem("theme") === "light") {
    doc.classList.remove("dark-theme")
  } else if (localStorage.getItem("theme") === "dark") {
    doc.classList.add("dark-theme")
  }

  if (doc.classList.contains("dark-theme")) {
    themeBtn.textContent = "☀️"
  } else {
    themeBtn.textContent = "🌙"
  }
})

themeBtn.addEventListener("click", () => {
  doc.classList.toggle("dark-theme")

  if (doc.classList.contains("dark-theme")) {
    themeBtn.textContent = "☀️"
  } else {
    themeBtn.textContent = "🌙"
  }
})

menuItems.forEach((menuItem, index) => {
  menuItem.addEventListener("click", (e) => {
    document.querySelectorAll(".action")[index].classList.toggle("show")
  })
})

inputField.addEventListener("input", (e) => {

  if (e.target.value === '') {
    document.querySelector("[data-submit]").classList.remove("effect")
  } else {
    document.querySelector("[data-submit]").classList.add("effect")
  }
})

displayMsg.addEventListener("submit", (e) => {
  e.preventDefault()
})


// game logic

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

    if (popArr[0] && popUp === true) {
      winner = `${localStorage.getItem("username")} Wins!`
    }
 
    else winner = "X Wins!";
    xScore = xScore + 1
    end()
    endGame(winner)
    xScoreBox.textContent = `${xScore}`
    cScoreBox.textContent = `${cScore}`
    xGameTime.push(prevVal)
    
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
    if (popArr[0] === undefined && popUp === false) {
      popArr.shift()
      winner = `${localStorage.getItem("username")} Wins!`
    }
    else winner = "Circle Wins!";
    cScore = cScore + 1
    end()
    endGame(winner)
    cScoreBox.textContent = `${cScore}`
    xScoreBox.textContent = `${xScore}`
    cGameTime.push(prevVal)
    
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
  restart()
})

function restart () {
  hover(circleTurn)
  timer.textContent = ''
  prevVal = 1
  start(true)

  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
    cell.classList.remove(X_CLASS, C_CLASS)
  })
  
  let xMinTime = Math.min(...xGameTime)
  let cMinTime = Math.min(...cGameTime)
  minTime = Math.min(xMinTime, cMinTime)
  
  if (popArr[0] && popUp === true && (xMinTime < cMinTime)) {
    fastMsg.textContent = `${localStorage.getItem("username")}: ${minTime} s`
  }
  else if (popArr[0] === undefined && popUp === false && (cMinTime < xMinTime)) {
    fastMsg.textContent = `${localStorage.getItem("username")}: ${minTime} s`
  }
  else if (popArr[0] && popUp === true && (xMinTime === cMinTime)) {
    fastMsg.textContent = `${localStorage.getItem("username")}: ${minTime} s`
  }
  else if (popArr[0] === undefined && popUp === false && (xMinTime === cMinTime)) {
    fastMsg.textContent = `${localStorage.getItem("username")}: ${minTime} s`
  }
  else {
    let ctxt = xMinTime < cMinTime ? "X" : "Circle"
    fastMsg.textContent = `${ctxt}: ${minTime} s`
  }
}

function start (val) {
  
  board.addEventListener("click", (e) => {
    if (board.contains(e.target)) {
      val ? timerFunx(true) : timerFunx(false)
    }
  }, {once: true})
  
}

function end () {
  start(false)
}

function timerFunx (val) {
  
  if (val) {
    timer.textContent = "0" + prevVal
    
    var timerId = setInterval(() => {
      prevVal < 9 ? timer.textContent = `0${++prevVal}`: timer.textContent = `${++prevVal}`
    }, 1000)
    
    timerArr[0] = timerId
  } else if (!val) {
    clearInterval(timerArr[0])
  }
}

start(true)
