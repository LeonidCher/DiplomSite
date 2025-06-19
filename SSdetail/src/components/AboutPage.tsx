import React from 'react';
import './style/about.css';

const AboutPage: React.FC = () => {
  const team = [
    { name: 'Иван Иванов', role: 'Мастер-полировщик', bio: '10 лет опыта в полировке авто.' },
    { name: 'Мария Петрова', role: 'Специалист по керамике', bio: 'Эксперт в нанесении покрытий.' },
  ];

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="about-title">О компании</h1>
        <div className="about-history">
          <h2>Наша история</h2>
          <p>SS Detailing была основана в 2020 году с целью предоставления премиум-услуг по уходу за автомобилями. За 5 лет мы обслужили более 1000 клиентов, заслужив репутацию надежного партнера.</p>
        </div>
        <div className="about-team">
          <h2>Наша команда</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <h3>{member.name}</h3>
                <p><strong>Роль:</strong> {member.role}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="about-guarantees">
          <h2>Гарантии</h2>
          <p>Мы предоставляем гарантию до 24 месяцев на керамические покрытия и 12 месяцев на полировку.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;