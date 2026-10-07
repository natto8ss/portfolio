import { skills } from '../data/portfolio';

export function Skills() {
  return (
    <section id="area03" aria-labelledby="skills-title">
      <h2 id="skills-title" className="inviewbox">SKILL</h2>
      <ol className="skill-list">
        {skills.map((skill, index) => (
          <li className="skill-row" key={skill.title}>
            <span className="skill-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className="skill-copy">
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
            <div className="skill-tools">
              {skill.learning && <span className="skill-learning">挑戦中</span>}
              <ul aria-label="使用技術">
                {skill.technologies.map(technology => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
