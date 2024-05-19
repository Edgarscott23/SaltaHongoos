const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let score = 0;
let isJumping = false;
let jumpSpeed = 0;
const gravity = 0.5;
const moveSpeed = 5;  // Velocidad de movimiento horizontal
let moveLeft = false;
let moveRight = false;

const player = {
    x: 200,
    y: 500,
    width: 30,
    height: 30,
    color: 'red',
};

const platforms = [
    { x: 200, y: 550, width: 100, height: 10, color: 'green' },
    { x: 100, y: 400, width: 100, height: 10, color: 'green' },
    { x: 300, y: 250, width: 100, height: 10, color: 'green' },
];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function update() {
    if (isJumping) {
        player.y -= jumpSpeed;
        jumpSpeed -= gravity;

        if (jumpSpeed <= 0) {
            isJumping = false;
        }
    } else {
        player.y += gravity;
    }

    // Movimiento horizontal
    if (moveLeft && player.x > 0) {
        player.x -= moveSpeed;
    }
    if (moveRight && player.x + player.width < canvas.width) {
        player.x += moveSpeed;
    }

    platforms.forEach(platform => {
        if (player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height &&
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            !isJumping) {
            isJumping = true;
            jumpSpeed = 10;
            score += 10;
            document.getElementById('score').textContent = score;
        }
    });

    if (player.y > canvas.height) {
        resetGame();
    }
}

function resetGame() {
    player.y = 500;
    score = 0;
    document.getElementById('score').textContent = score;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping) {
        isJumping = true;
        jumpSpeed = 10;
    }
    if (e.code === 'ArrowLeft') {
        moveLeft = true;
    }
    if (e.code === 'ArrowRight') {
        moveRight = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
        moveLeft = false;
    }
    if (e.code === 'ArrowRight') {
        moveRight = false;
    }
});

gameLoop();