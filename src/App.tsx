import { useEffect } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Playground } from './components/Playground';
import { Skills } from './components/Skills';
import { Works } from './components/Works';
import { Header, Footer } from './components/Layout';

export function App() {
  useEffect(() => {
    // The fragment target is created after index.html has loaded.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div id="wrap">
      <Header />
      <main id="mainBlock">
        <article>
          <div id="contentsBlock">
            <div id="playground-root"><Playground /></div>
            <About />
            <Skills />
            <Works />
            <Contact />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
