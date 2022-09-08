let startButton = document.querySelector('.start-button');
let input = document.querySelector('input');
let mayinTarlasi = document.querySelector('.mayin-container');

let countOfButton;
let countOfBomb;
let score = 0;
const numbers = /[0-9]/g;

input.addEventListener('keyup', function(e){
    if(e.key.match(numbers)){
        startButton.disabled  = false;
    }
})

startButton.addEventListener('click', () => {
    //  refresh everything for next game;
    countOfBomb = 0;
    score = 0;
    startButton.disabled  = true;
    mayinTarlasi.innerHTML = '';
    countOfButton = input.value ** 2;
    createButtons(countOfButton)
})


// creation of buttons
function createButtons(countOfButton){

    //   make bomb div square
    mayinTarlasi.style.gridTemplateColumns = `repeat(${Math.sqrt(countOfButton)}, 1fr)`;

    // add buttons
    for(let i=1; i<=countOfButton; i++ ){
        mayinTarlasi.innerHTML += `
            <div class="bomb-container" data-id="${i}">
                <button class="bomb-button" onclick="showBomb('${i}')"></button>
            </div>
        `
    }
    // create number of bombs
    countOfBomb = countOfButton * 10 /100; 

    for(let i=1; i<=countOfBomb; i++){
        // call function for placing of bombs
        createBombs();
    }
}


//  creation of bombs
function createBombs(){
  
    let positionOfBomb = Math.floor(Math.random(1) * countOfButton);

    let bombDiv = document.createElement('div');
    bombDiv.className = 'bomb';
    document.querySelectorAll('.bomb-container').forEach(function(bmb){

        if(bmb.getAttribute('data-id') == positionOfBomb){

            bmb.appendChild(bombDiv);

        }
    })
}


function showBomb(id){
    score++;
    let divId = document.querySelector(`[data-id="${id}"]`);
    let buttonDiv = divId.querySelector('.bomb-button');
    let bombDiv = divId.querySelector('.bomb');

    if(divId.contains(bombDiv)){
        buttonDiv.style.display = 'none';

        document.querySelectorAll('.bomb').forEach((el) => {
            el.previousElementSibling.style.display = 'none';

            document.querySelectorAll('.bomb-button').forEach((btn) => {
                btn.disabled = 'true';
                btn.style.backgroundColor = 'skyblue';
                localStorage.setItem('Score: ', `${score}`);
            })
        })
    }
    else{
        buttonDiv.style.backgroundColor = 'skyblue';
        buttonDiv.disabled = true;
    }
}

