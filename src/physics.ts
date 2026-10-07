export interface Ball {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  phase: number;
  held: { id: number; x: number; y: number; time: number } | null;
}

export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function constrain(ball: Ball, width: number, height: number) {
  const maxX = Math.max(0, width - ball.size);
  const maxY = Math.max(0, height - ball.size);
  if (ball.x < 0 || ball.x > maxX) ball.vx *= -0.8;
  if (ball.y < 0 || ball.y > maxY) ball.vy *= -0.8;
  ball.x = clamp(ball.x, 0, maxX);
  ball.y = clamp(ball.y, 0, maxY);
}

export function step(balls: Ball[], width: number, height: number, dt: number) {
  for (const ball of balls) {
    if (ball.held) continue;
    // Keep a gentle, changing current even after a throw loses its momentum.
    ball.phase = (ball.phase ?? 0) + dt * 0.009;
    const driftX = Math.cos(ball.phase) * 0.65;
    const driftY = Math.sin(ball.phase * 0.73) * 0.55;
    const blend = 1 - Math.pow(0.99, dt);
    ball.vx += (driftX - ball.vx) * blend;
    ball.vy += (driftY - ball.vy) * blend;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    ball.vx *= Math.pow(0.997, dt);
    ball.vy *= Math.pow(0.997, dt);
    constrain(ball, width, height);
  }
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i], b = balls[j];
      const dx = b.x + b.size / 2 - a.x - a.size / 2;
      const dy = b.y + b.size / 2 - a.y - a.size / 2;
      const distance = Math.hypot(dx, dy);
      const overlap = (a.size + b.size) / 2 - distance;
      if (overlap <= 0 || a.held || b.held) continue;
      const nx = distance ? dx / distance : 1, ny = distance ? dy / distance : 0;
      a.x -= nx * overlap / 2; a.y -= ny * overlap / 2;
      b.x += nx * overlap / 2; b.y += ny * overlap / 2;
      const velocity = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
      if (velocity > 0) {
        a.vx -= velocity * nx; a.vy -= velocity * ny;
        b.vx += velocity * nx; b.vy += velocity * ny;
      }
      constrain(a, width, height); constrain(b, width, height);
    }
  }
}
