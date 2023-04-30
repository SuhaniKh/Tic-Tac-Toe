const player = document.querySelector("[data-player]");
const boxes = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");

let currplayer;
let gamegrid;

const winningpositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Let create initial function 

function initgame(){
    currplayer = "X";
    player.innerText = `Current Player - ${currplayer}`;
    gamegrid = ["","","","","","","","",""];
    //UI pe empty karna hai :
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    btn.classList.remove("active");
}

initgame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

function handleClick(index){
    if(gamegrid[index]===""){
        boxes[index].innerText = currplayer;
        gamegrid[index] = currplayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn 
        swapTurn();
        //check for winning
        checkGameOver();
    }
}

function swapTurn(){
    if(currplayer==="X"){
        currplayer = "0";
    }

    else{
        currplayer = "X";
    }

    player.innerText = `Current Player - ${currplayer}`;
}

function checkGameOver(){
    let answer = "";
    let gridCount = 0;
     
    winningpositions.forEach((position)=>{
        if(gamegrid[position[0]]===gamegrid[position[1]] && gamegrid[position[1]]===gamegrid[position[2]]&& gamegrid[position[0]]!=""){
            //check which one is winner:
            if(gamegrid[position[0]]==="X")    answer = "X";
            else    answer = "0";

            //disable pointer event 
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            //now there is a winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    gamegrid.forEach((box)=>{
        if(box!="") gridCount++;
    })

    if(answer!=""){
    player.innerText = `Winner Player - ${answer}`;
    btn.classList.add("active");
    return;}

    if(gridCount>=9){
        player.innerText = "Game Tied";
        btn.classList.add("active");
    }
    return;
}

btn.addEventListener("click",initgame);