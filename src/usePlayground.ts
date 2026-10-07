import { useEffect, useRef } from 'react';
import type { HTMLAttributes } from 'react';
import type { Ball } from './physics';
import { clamp, constrain, step } from './physics';
import { bubblePath } from './bubbleShape';

const positions: [number, number, number][] = [[0.08, 0.13, 168], [0.77, 0.1, 125], [0.03, 0.7, 108], [0.81, 0.69, 182], [0.47, 0.02, 65], [0.48, 0.88, 78], [0.28, 0.06, 92], [0.94, 0.38, 70], [0.18, 0.46, 62], [0.65, 0.8, 100], [0.3, 0.92, 55], [0.66, 0.35, 82], [0.04, 0.4, 48], [0.36, 0.3, 58], [0.57, 0.15, 46], [0.92, 0.92, 64], [0.38, 0.68, 52], [0.73, 0.56, 60]];
export const BUBBLE_COUNT = positions.length;

export function usePlayground(paused: boolean) {
  const stage = useRef<HTMLDivElement>(null);
  const elements = useRef<(HTMLButtonElement | null)[]>([]);
  const balls = useRef<Ball[]>([]);
  const waveTime = useRef(0);
  const bounds = useRef({ width: 0, height: 0 });
  const paint = () => balls.current.forEach((ball, i) => {
    const element = elements.current[i];
    if (element) {
      element.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0)`;
      element.querySelector('path')?.setAttribute('d', bubblePath(waveTime.current, i));
    }
  });

  useEffect(() => {
    const resize = () => {
      if (!stage.current) return;
      const { width, height } = stage.current.getBoundingClientRect();
      bounds.current = { width, height };
      balls.current = positions.map(([x, y, size], i) => {
        size *= width < 600 ? 0.6 : 1;
        const element = elements.current[i];
        if (element) {
          element.style.width = `${size}px`;
          element.style.height = `${size}px`;
        }
        return { x: x * (width - size), y: y * (height - size), size, phase: i * 2.4, vx: (i % 2 ? -1 : 1) * 0.45, vy: 0.25, held: null };
      });
      paint();
    };
    const observer = new ResizeObserver(resize);
    if (stage.current) observer.observe(stage.current);
    resize();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    let frame: number;
    let last: number | undefined;
    const tick = (time: number) => {
      const dt = last ? Math.min((time - last) / 16.667, 2) : 1;
      last = time;
      if (!document.hidden) {
        waveTime.current += dt / 60;
        step(balls.current, bounds.current.width, bounds.current.height, dt);
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  const handlers = (i: number): HTMLAttributes<HTMLButtonElement> => ({
    onPointerDown(event) {
      if (event.button !== 0) return;
      const ball = balls.current[i];
      if (ball.held) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      ball.held = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp };
      ball.vx = ball.vy = 0;
    },
    onPointerMove(event) {
      const ball = balls.current[i];
      if (!ball.held || ball.held.id !== event.pointerId) return;
      const dx = event.clientX - ball.held.x, dy = event.clientY - ball.held.y;
      const dt = Math.max(8, event.timeStamp - ball.held.time) / 16.667;
      ball.x += dx; ball.y += dy;
      ball.vx = clamp(dx / dt, -24, 24); ball.vy = clamp(dy / dt, -24, 24);
      ball.held = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp };
      constrain(ball, bounds.current.width, bounds.current.height);
      paint();
    },
    onPointerUp(event) {
      const ball = balls.current[i];
      if (ball.held?.id !== event.pointerId) return;
      if (paused || event.timeStamp - ball.held.time > 100) ball.vx = ball.vy = 0;
      ball.held = null;
    },
    onLostPointerCapture() { balls.current[i].held = null; },
    onPointerCancel() { const ball = balls.current[i]; ball.held = null; ball.vx = ball.vy = 0; },
    onKeyDown(event) {
      const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault();
      const ball = balls.current[i];
      ball.x += direction[0] * 24; ball.y += direction[1] * 24;
      ball.vx = ball.vy = 0;
      constrain(ball, bounds.current.width, bounds.current.height);
      paint();
    },
  });
  return { stage, elements, handlers };
}
