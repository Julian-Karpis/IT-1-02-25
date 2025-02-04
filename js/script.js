let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

let playerWidth = 10;
let playerHeight = 50;
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

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    context.fillStyle = "skyblue";
    //player1.y += player1.velocityY;
    let nextPlayerY = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayerY)) {
        player1.y = nextPlayerY;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    context.fillStyle = "skyblue";
    //player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

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
    for (let i = 0; i < board.height; i += 25) {
        context.fillStyle = "white";
        context.fillRect(boardWidth/2 - 10, i, 5, 5)
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

function resetGame(direction ){
     ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: 1,
        velocityY: 2
    }
}


