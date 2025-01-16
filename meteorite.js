export class Meteorite {
    constructor(ctx, x, y, radius, dx, dy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw(ctx) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update(canvas, ctx, meteorites, spawn) {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.respawn(meteorites, spawn);
        }
        this.draw(ctx);
    }

    respawn(meteorites, spawn) {
        const index = meteorites.indexOf(this);
        if (index > -1) {
            meteorites.splice(index, 1);
        }
        spawn(1);
    }
}