import { useEffect, useState } from 'react';
import type { HTMLAttributes, RefCallback } from 'react';
import { BUBBLE_COUNT, usePlayground } from '../usePlayground';

type BubbleColor = 'pink' | 'blue';

interface BubbleProps {
  index: number;
  color: BubbleColor;
  elementRef: RefCallback<HTMLButtonElement>;
  handlers: HTMLAttributes<HTMLButtonElement>;
}

function Bubble({ index, color, elementRef, handlers }: BubbleProps) {
  return <button ref={elementRef} className={`bubble bubble-${index} bubble-${color}`} aria-label={`丸 ${index + 1}。ドラッグ、または矢印キーで移動`} {...handlers}><svg viewBox="0 0 100 100" aria-hidden="true"><path /></svg></button>;
}

export function Playground() {
  const [colors] = useState(() => {
    const palette: BubbleColor[] = Array.from({ length: BUBBLE_COUNT }, (_, i) => i < BUBBLE_COUNT / 2 ? 'pink' : 'blue');
    for (let i = palette.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [palette[i], palette[j]] = [palette[j], palette[i]];
    }
    return palette;
  });
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const { stage, elements, handlers } = usePlayground(paused);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return <section className="playground" aria-labelledby="hero-title">
    <div className="play-stage" ref={stage}>
      <div className="hero-copy"><h1 id="hero-title" aria-label="YAMAMOTO ERINA">{['YAMAMOTO', 'ERINA'].map(name => <span className="name-line" key={name} aria-hidden="true">{[...name].map((letter, index) => <span className="name-letter" key={index}>{letter}</span>)}</span>)}</h1><p className="hero-description">Frontend Engineer</p></div>
      {Array.from({ length: BUBBLE_COUNT }, (_, i) => <Bubble key={i} index={i} color={colors[i]} elementRef={el => { elements.current[i] = el; }} handlers={handlers(i)} />)}
    </div>
  </section>;
}

