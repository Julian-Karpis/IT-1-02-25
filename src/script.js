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

let gameStarted = false;
let ballSpeed = 1;

let gameOver = false;
//score
const winningScore = 1;

//definerer spillemodus 
let gameMode = "PvE"



document.addEventListener("DOMContentLoaded", function() {
    const menu = document.createElement("div");
    menu.id = "menu";

    const title = document.createElement("h1");
    title.innerText = "PONG";

    const modeText = document.createElement("p");
    modeText.innerText = "Choose game mode:"; 

    const modeButtons = document.createElement("div");
    const modes = { "PvE": "Singleplayer", "PvP": "Multiplayer" };

    //trykke knapp løkke
    for (let mode in modes) {
        const button = document.createElement("button");
        button.innerText = modes[mode];
        button.onclick = function() {
            setGameMode(mode);
            menu.style.display = "block";
            modeButtons.style.display = "none";
            showDifficultySelection();
        };
        modeButtons.appendChild(button);
    }


    const difficultyText = document.createElement("p");
    difficultyText.innerText = "Choose difficulty:";

    const difficultyButtons = document.createElement("div");
    difficultyButtons.id = "difficultySelection";
    difficultyButtons.style.display = "none";
    const difficulties = { "Easy": 1, "Medium": 2, "Hard": 3 };
    let gameStarted = false;
    let player1Score = 0;
    let player2Score = 0;
    const winningScore = 5;
    
    for (let label in difficulties) {
        const button = document.createElement("button");
        button.innerText = label;
        button.onclick = () => {
            ballSpeed = difficulties[label];
            difficultyButtons.style.display = "none";
            difficultyText.innerText = "Press any key to start";
            document.addEventListener("keydown", startGame);
        };
        difficultyButtons.appendChild(button);
    }

    // Ensure the menu appears before the game starts
    document.body.appendChild(menu);
    menu.appendChild(title);
    menu.appendChild(modeText)
    menu.appendChild(modeButtons);
    menu.appendChild(difficultyText);
    menu.appendChild(difficultyButtons);
    
});

function showDifficultySelection() {
    const difficultySelection = document.getElementById("difficultySelection");
    difficultySelection.style.display = "block";
    
}

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
}

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

    document.addEventListener("keydown", startGame);
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        menu.style.display = "none";
        initializeBall();
        document.removeEventListener("keydown", startGame);
        requestAnimationFrame(update); // Start the game loop
    }
}

function initializeBall() {
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = ballSpeed;
    ball.velocityY = ballSpeed;
}

function update() {

    if (gameOver) return;
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


    //sjekke spillemodus 
    if (gameMode === "PvE") {
        aiPaddleMovement();
    } else if (gameMode === "PvP") {
        let nextPlayer2Y = player2.y + player2.velocityY;
        if (!outOfBounds(nextPlayer2Y)) {
            player2.y = nextPlayer2Y;
        }
    }

    //player2.y += player2.velocityY;

    if (gameStarted) {

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
        if (detectCollision(ball, player1)) {
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
        checkGameOver();
    }


    //score 
    context.font = "45px sans-serif"
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);

    //draw 
    const netHeight = boardHeight;
    const netWidth = 5;
    const netGap = 15;
    context.fillStyle = "white";

    for (let i = 0; i < netHeight; i += netGap * 2) {
        context.fillRect(boardWidth / 2 - netWidth / 2, i, netWidth, netGap)
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

function resetGame(direction) {
    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction === 1 ? 1 : -1,
        velocityY: ball.velocityY,
    }
}

function checkGameOver() {
    if (player1Score >= winningScore || player2Score >= winningScore) {
        gameOver = true;
        showGameOverScreen();
    
}
}

function showGameOverScreen() {
    const gameOverText = document.createElement("div");
    gameOverText.id = "game-over"
    gameOverText.innerText = `Game Over! ${player1Score > player2Score ? 'Spiller 1 vant!' : 'Spiller 2 vant!'}`;
    document.body.appendChild(gameOverText);

    const restartButton = document.createElement("button");
    restartButton.id = "restart-button";
    restartButton.innerText = "Tilbake til meny";
    restartButton.onclick = restartGame;
    document.body.appendChild(restartButton);
}

function aiPaddleMovement() {
    let aiSpeed = ballSpeed * 1.2;
    let aiCenter = player2.y + player2.height / 2;

    if (ball.y < aiCenter - 10) {
        player2.y -= aiSpeed;
    } else {
        player2.y += aiSpeed;
    }

    player2.y = Math.max(0, Math.min(player2.y, boardHeight - player2.height));
}

function restartGame() {
    //refresher siden 
    location.reload();
}