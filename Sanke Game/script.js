const board = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');

const boardSize = 20;
const boxSize = board.clientWidth / boardSize;

let snake = [{ x: 5, y: 5 }];
let direction = 'RIGHT';
let food = { x: 10, y: 10 };
let score = 0;
let highScore = 0;
let gameInterval;

function createBoard() {
    board.innerHTML = '';
    snake.forEach(part => {
        const snakePart = document.createElement('div');
        snakePart.style.width = `${boxSize}px`;
        snakePart.style.height = `${boxSize}px`;
        snakePart.style.background = 'green';
        snakePart.style.position = 'absolute';
        snakePart.style.left = `${part.x * boxSize}px`;
        snakePart.style.top = `${part.y * boxSize}px`;
        board.appendChild(snakePart);
    });

    const foodElement = document.createElement('div');
    foodElement.style.width = `${boxSize}px`;
    foodElement.style.height = `${boxSize}px`;
    foodElement.style.background = 'red';
    foodElement.style.position = 'absolute';
    foodElement.style.left = `${food.x * boxSize}px`;
    foodElement.style.top = `${food.y * boxSize}px`;
    board.appendChild(foodElement);
}

function update() {
    const head = { ...snake[0] };
    if (direction === 'RIGHT') head.x++;
    if (direction === 'LEFT') head.x--;
    if (direction === 'DOWN') head.y++;
    if (direction === 'UP') head.y--;

    if (head.x === food.x && head.y === food.y) {
        score++;
        if (score > highScore) highScore = score;
        generateFood();
    } else {
        snake.pop();
    }

    if (head.x >= boardSize || head.x < 0 || head.y >= boardSize || head.y < 0 || collision(head)) {
        resetGame();
        return;
    }

    snake.unshift(head);
    createBoard();
    scoreElement.textContent = `Score: ${score}`;
    highScoreElement.textContent = `High Score: ${highScore}`;
}

function collision(head) {
    return snake.some(part => part.x === head.x && part.y === head.y);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
    };
}

function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 5, y: 5 }];
    direction = 'RIGHT';
    score = 0;
    generateFood();
    createBoard();
    scoreElement.textContent = `Score: ${score}`;
    highScoreElement.textContent = `High Score: ${highScore}`;
    gameInterval = setInterval(update, 100);
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

document.querySelectorAll('.controls i').forEach(control => {
    control.addEventListener('click', e => {
        const key = e.target.getAttribute('data-key');
        if (key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
        if (key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
        if (key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
        if (key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    });
});

resetGame();
