import React from 'react';
import CodeExample from './CodeExample';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">
              SQLab - курсовой проект
            </div>
            <h1 className="hero-title">Осваивайте SQL <span className="text-primary">легко и быстро</span></h1>
            <p className="hero-description">
              Освойте язык запросов SQL с помощью интерактивных уроков и удобного тренажёра!
            </p>
          </div>
          <CodeExample />
        </div>
      </div>
    </section>
  );
};
  
export default HeroSection;