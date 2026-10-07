import { works } from '../data/portfolio';

export function Works() {
  return (
    <section id="area04">
      <h2 className="inviewbox">WORKS</h2>
      <ul className="work_area inviewbox">
        {works.map(work => (
          <li key={work.href}>
            <a href={work.href}>
              <figure><img src={work.image} alt="" /></figure>
              <p>{work.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
