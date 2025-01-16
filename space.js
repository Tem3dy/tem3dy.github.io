import {Asteroid} from "./asteroid.js";

const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

let asteroids = [];

function onResize(oldHeight, newHeight) {
    if (asteroids.length > 100) {
        asteroids = asteroids.slice(0, 100);
    }

    let amount = 0;
    if (newHeight > oldHeight) {
        const difference = newHeight - oldHeight;
        amount += Math.ceil(Math.random() * difference) / 10;
    } else {
        amount += Math.ceil(Math.random() * 10);
    }
    spawn(amount)
}

function spawn(amount) {
    for (let i = 0; i < amount; i++) {
        const radius = Math.random() * 15 + 5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        const dx = Math.max((Math.random() - 0.5) * (Math.random() * 5), 1);
        const dy = Math.max((Math.random() - 0.5) * (Math.random() * 5), 1);
        asteroids.push(new Asteroid(ctx, x, y, radius, dx, dy));
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    asteroids.forEach(asteroid => asteroid.update(canvas, ctx, asteroids, spawn));
    requestAnimationFrame(draw);
}

function adjustCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function prepareCanvas() {
    adjustCanvasDimensions();
    window.addEventListener('resize', () => {
        onResize(canvas.height, window.innerHeight);
        adjustCanvasDimensions();
    });
}

prepareCanvas();
spawn(10);
draw();