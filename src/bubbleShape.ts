// Periodic radial waves form a smooth, closed outline inside the button bounds.
export function bubblePath(time: number, seed: number) {
  const phase = time * (0.85 + seed * 0.035) + seed * 1.7;
  const points = Array.from<unknown, [number, number]>({ length: 32 }, (_, i) => {
    const angle = i / 32 * Math.PI * 2;
    const radius = 43 + Math.sin(angle * 3 + phase) * 1.8
      + Math.sin(angle * 5 - phase * 1.3) * 0.7;
    return [50 + Math.cos(angle) * radius, 50 + Math.sin(angle) * radius];
  });
  const midpoint = (a: [number, number], b: [number, number]) => `${((a[0] + b[0]) / 2).toFixed(2)},${((a[1] + b[1]) / 2).toFixed(2)}`;
  return `M${midpoint(points[31], points[0])} ` + points.map((point, i) =>
    `Q${point[0].toFixed(2)},${point[1].toFixed(2)} ${midpoint(point, points[(i + 1) % 32])}`
  ).join(' ') + ' Z';
}
