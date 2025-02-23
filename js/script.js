let board;
let boardWidth = 1024;
let boardHeight = 500;
let context;

let playerWidth = 10;
let playerHeight = 100;
let playerVelocityY = 0;

//spiller1
let player1 = {
    x: 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

//spiller2
let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2
}

let player1Score = 0;
let player2Score = 0;


window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // tegn inn spiller1
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);

    // tegn inn spiller2
    document.addEventListener("keyup", movePlayer)


}

function drawPaddle1(player) {
    // Color 1: 5/10 of the rectangle (first half)
    context.fillStyle = "  #F55050 ";
   
  
    context.fillRect(player.x, player.y, player.width, player.height * 0.5); 

    // Color 2: 1/10 of the rectangle (middle section)
    context.fillStyle = "white";
    context.fillRect(player.x, player.y + player.height * 0.5, player.width, player.height * 0.03); 

    // Color 3: 4/10 of the rectangle (last section)
    context.fillStyle = "#404041";
    context.fillRect(player.x, player.y + player.height * 0.53, player.width, player.height * 0.35); 
}

function drawPaddle2(player) {
    // Color 1: 5/10 of the rectangle (first half)
    context.fillStyle = "#FBD900";
    context.fillRect(player.x, player.y, player.width, player.height * 0.5); 

    // Color 2: 1/10 of the rectangle (middle section)
    context.fillStyle = "white";
    context.fillRect(player.x, player.y + player.height * 0.5, player.width, player.height * 0.03); 

    // Color 3: 4/10 of the rectangle (last section)
    context.fillStyle = "#404041";
    context.fillRect(player.x, player.y + player.height * 0.53, player.width, player.height * 0.35); 
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    context.fillStyle = "white";
context.fillRect(0, boardHeight / 2 - 10, board.width, 5);

    drawPaddle1(player1);
    drawPaddle2(player2);

    //player1.y += player1.velocityY;
    let nextPlayerY = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayerY)) {
        player1.y = nextPlayerY;
    }


    
    //player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
   

    //ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //dersom ballen treffer 
    if (ball.y <= 0 || (ball.y + ball.height) >= boardHeight) {
        ball.velocityY *= -1 //reverser retning
    }

    //sprett ballen tilbake
    if(detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.velocityX *= -1;
        }
    } else if (detectCollision(ball, player2)) {
        if (ball.x + ball.width >= player2.x) {
            ball.velocityX *= -1;
        }
    }

    //game over 
    if (ball.x <= 0) {
        player2Score++;
        resetGame(1);
    } 
    else if (ball.x + ball.width >= boardWidth) {
        player1Score++;
        resetGame(2);
    }


    //score 
    context.font = "45px sans-serif"
    context.fillText(player1Score, boardWidth/5 , 45);
    context.fillText(player2Score, boardWidth*4/5 - 45, 45);

    //draw 
    const netHeight = boardHeight;
    const netWidth = 5;
    const netGap = 15; 
    context.fillStyle = "white";

    for (let i = 0; i < netHeight; i += netGap * 2) {
        context.fillRect(boardWidth/2 - netWidth/2, i, netWidth, netGap)
}


    function outOfBounds(yPosition) {
        return (yPosition < 0 || yPosition + playerHeight > boardHeight)
    }

}

    function movePlayer(e) {
        if (e.code == "KeyW") {
            player1.velocityY = - 3;
        }
        else if (e.code == "KeyS") {
            player1.velocityY = 3;
        }

        if (e.code == "ArrowUp") {
            player2.velocityY = - 3;
        }
        else if (e.code == "ArrowDown") {
            player2.velocityY = 3;
        }
    }

    function detectCollision(a, b) {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

function resetGame(direction){
     ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: ball.velocityX,
        velocityY: ball.velocityY,
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const menu = document.createElement("div");
    menu.id = "menu";
    menu.style.position = "absolute";
    menu.style.top = "0";
    menu.style.left = "0";
    menu.style.width = "100%";
    menu.style.height = "100%";
    menu.style.background = "rgba(0, 0, 0, 0.8)";
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.justifyContent = "center";
    menu.style.alignItems = "center";
    menu.style.color = "white";
    menu.style.fontFamily = "Arial, sans-serif";

    const title = document.createElement("h1");
    title.innerText = "PONG";
    title.style.marginBottom = "20px";

    const difficultyText = document.createElement("p");
    difficultyText.innerText = "Choose difficulty:";
    difficultyText.style.marginBottom = "10px";

    const difficultyButtons = document.createElement("div");
    const difficulties = { "Easy": 1, "Medium": 2, "Hard": 3 };
    let ballSpeed = 1;
    let gameStarted = false;
    let player1Score = 0;
    let player2Score = 0;
    const winningScore = 5;

    for (const [label, speed] of Object.entries(difficulties)) {
        const button = document.createElement("button");
        button.innerText = label;
        button.style.margin = "5px";
        button.style.padding = "10px 15px";
        button.style.fontSize = "16px";
        button.style.cursor = "pointer";
        button.addEventListener("click", function() {
            ballSpeed = speed;
            difficultyButtons.style.display = "none";
            difficultyText.innerText = "Press any key to start";
            document.addEventListener("keydown", startGame);
        });
        difficultyButtons.appendChild(button);
    }

    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            menu.style.display = "none";
            document.removeEventListener("keydown", startGame);
            initializeBall();
            requestAnimationFrame(update); // Start the game loop
        }
    }

    function initializeBall() {
        ball.x = boardWidth / 2;
        ball.y = boardHeight / 2;
        ball.velocityX = ballSpeed;
        ball.velocityY = ballSpeed;
    }

    // Ensure the menu appears before the game starts
    document.body.appendChild(menu);
    menu.appendChild(title);
    menu.appendChild(difficultyText);
    menu.appendChild(difficultyButtons);
});
