import {Meteorite} from "./meteorite.js";

const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

let meteorites = [];

function onResize(oldHeight, newHeight) {
    if (meteorites.length > 100) {
        meteorites = meteorites.slice(0, 100);
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
        const dx = (Math.random() - 0.5) * (Math.random() * 5);
        const dy = (Math.random() - 0.5) * (Math.random() * 5);
        meteorites.push(new Meteorite(ctx, x, y, radius, dx, dy));
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    meteorites.forEach((meteorite) => meteorite.update(canvas, ctx, meteorites, spawn));
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