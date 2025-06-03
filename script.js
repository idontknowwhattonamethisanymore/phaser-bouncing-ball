let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 0.5;
let xspeed = 1.0;
let lives = 10;
let livesText;
let gameOver = false;

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball");
    ball.setDisplaySize(ballSize, ballSize);

    // Enable input on the ball
    ball.setInteractive();

    // Display lives
    livesText = this.add.text(16, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#fff' });

    // On click, shrink, speed up, and gain a life
    ball.on('pointerdown', () => {
        if (gameOver) return;
        // Reduce size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Speed up by 10%
        xspeed *= 1.1;
        yspeed *= 1.1;

        // Gain a life
        lives += 1;
        livesText.setText('Lives: ' + lives);
    });
}

function update() {
    if (gameOver) return;

    ball.y += yspeed;
    ball.x += xspeed;

    let bounced = false;

    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1;
        bounced = true;
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;
        bounced = true;
    }

    // Lose a life on bounce
    if (bounced) {
        lives -= 1;
        livesText.setText('Lives: ' + lives);

        if (lives <= 0) {
            livesText.setText('Game Over');
            gameOver = true;
            ball.disableInteractive();
        }
    }
}
