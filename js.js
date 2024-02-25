let hour = 0; 
let minute = 0; 
let second = 0; 
let count = 0;
let timer = false;

const generateField = () => {
  hideSettingsBlock();

  const countOfLine = getValueFromInput("countInput");
  const bombCount = getValueFromInput("bombInput");
  fillArray(countOfLine * countOfLine, bombCount)
  showGameBlock()
  const field = document.getElementById("game-block");
  const widthBlock = field.getBoundingClientRect().width
  const sizeOfBlock = (widthBlock / countOfLine) - 2
  for(let i = 0; i < (countOfLine * countOfLine); i++){
    const block = document.createElement("div")
    block.className = "play-field"
    block.style.width = sizeOfBlock.toFixed(0) + "px";
    block.style.height = sizeOfBlock.toFixed(0) + "px";
    block.id = "play-field-" + i;
    block.setAttribute("onclick", `checkBlock(${i})`)
    //block.setAttribute("oncontextmenu", `supposition(${i})`)
    field.appendChild(block)
  }
}

window.addEventListener(
  "contextmenu",
  function (e) {
    if(e.target.className == "play-field"){
      e.preventDefault();
      if(e.target.innerText == "*")
        e.target.innerText = ""
      else
      e.target.innerText = "*"
    }
  },
  false,
)

function getValueFromInput(inputId){
  const input = document.getElementById(inputId);
  return input.value
}

function hideSettingsBlock(){
  const settingsBlock = document.getElementById("start-game-block");
  settingsBlock.style.display = "none"
}

function showGameBlock(){
  const gameBlock = document.getElementById("game-block");
  gameBlock.style.display = "flex"
}


function checkBlock(index){
  if(window.blocksArray[index].hasBomb){
    const block = document.getElementById('play-field-' + index)
    block.innerText = "b"
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function fillArray(length, bombCount){
  window.blocksArray = new Array(length);
  for(let i = 0; i < length; i++){
    window.blocksArray[i] = {
      hasBomb: false,
      openned: false 
    }
  }
  for(let i = 0; i < bombCount; i++){
    const x = getRandomInt(length)
    window.blocksArray[x].hasBomb = true 
  }
}