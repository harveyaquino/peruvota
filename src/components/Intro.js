import React, { useEffect, useState } from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'radial-gradient(ellipse at 20% 50%, rgba(255,215,0,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,77,77,0.06) 0%, transparent 60%), #0a0a0f',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  bgText: {
    position: 'absolute',
    fontSize: 'clamp(100px, 30vw, 280px)',
    fontFamily: "'Bebas Neue', cursive",
    color: 'rgba(255,255,255,0.02)',
    userSelect: 'none',
    pointerEvents: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
  flag: {
    fontSize: '48px',
    marginBottom: '16px',
    display: 'block',
  },
  eyebrow: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '11px',
    color: '#FFD700',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    marginBottom: '12px',
    opacity: 0.8,
  },
  title: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: 'clamp(52px, 15vw, 100px)',
    lineHeight: 0.9,
    letterSpacing: '-1px',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #fff 0%, #FFD700 50%, #FF4D4D 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  year: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: 'clamp(28px, 8vw, 52px)',
    color: 'rgba(255,255,255,0.15)',
    letterSpacing: '8px',
    marginBottom: '24px',
  },
  subtitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(15px, 3vw, 18px)',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '380px',
    lineHeight: 1.6,
    marginBottom: '40px',
  },
  cards: {
    display: 'flex',
    gap: '12px',
    marginBottom: '48px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  miniCard: {
    width: '48px',
    height: '68px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    transform: 'rotate(-3deg)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  btnStart: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '18px 40px',
    borderRadius: '50px',
    background: '#FFD700',
    color: '#000',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 40px rgba(255,215,0,0.3)',
  },
  disclaimer: {
    marginTop: '24px',
    fontFamily: "'Space Mono', monospace",
    fontSize: '10px',
    color: 'rgba(255,255,255,0.2)',
    maxWidth: '320px',
    lineHeight: 1.6,
  },
};

const miniCards = [
  { color: '#E63946', emoji: '🔴' },
  { color: '#F4A261', emoji: '🟠' },
  { color: '#2A9D8F', emoji: '🟢' },
  { color: '#457B9D', emoji: '🔵' },
  { color: '#7B2D8B', emoji: '🟣' },
  { color: '#D62828', emoji: '⚫' },
];

export default function Intro({ onStart }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={styles.container} className="noise">
      <div style={styles.bgText}>VOTA</div>

      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease', position: 'relative', zIndex: 1 }}>
        <span style={styles.flag}>🇵🇪</span>
        <div style={styles.eyebrow}>Elecciones Generales</div>
        <div style={styles.title}>PERÚ<br/>VOTA</div>
        <div style={styles.year}>2 0 2 6</div>

        <p style={styles.subtitle}>
          Colecciona, compara y descubre qué candidato<br />
          <strong style={{ color: '#FFD700' }}>piensa más como tú</strong>
        </p>

        <div style={styles.cards}>
          {miniCards.map((c, i) => (
            <div
              key={i}
              style={{
                ...styles.miniCard,
                background: `linear-gradient(145deg, ${c.color}cc, ${c.color}44)`,
                transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i * 1.5 + 2)}deg)`,
                transitionDelay: `${i * 0.1}s`,
                opacity: visible ? 1 : 0,
                transition: 'all 0.6s ease',
              }}
            >
              {c.emoji}
            </div>
          ))}
        </div>

        <button
          style={{
            ...styles.btnStart,
            transform: hover ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
            boxShadow: hover ? '0 16px 50px rgba(255,215,0,0.5)' : '0 8px 40px rgba(255,215,0,0.3)',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={onStart}
        >
          🃏 Ver Cartas
        </button>

        <p style={styles.disclaimer}>
          Contenido educativo basado en propuestas públicas de los candidatos.<br />
          No somos afiliados a ningún partido político.
        </p>
      </div>
    </div>
  );
}
