import React from 'react';
import { candidatos } from '../data/candidatos';
import CandidatoCard from './CandidatoCard';

export default function CardDeck({ seleccionados, setSeleccionados, onComparar }) {
  const toggleSeleccion = (candidato) => {
    setSeleccionados(prev => {
      const exists = prev.find(c => c.id === candidato.id);
      if (exists) return prev.filter(c => c.id !== candidato.id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, candidato];
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, rgba(255,215,0,0.04) 0%, #0a0a0f 60%)',
      padding: '24px 16px 120px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          color: '#FFD700',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          🃏 Colección 2026
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(36px, 10vw, 64px)',
          background: 'linear-gradient(135deg, #fff, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}>
          Candidatos
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '13px',
          fontFamily: "'Syne', sans-serif",
          marginTop: '8px',
        }}>
          Toca una carta para ver sus propuestas.<br />
          Selecciona hasta <strong style={{ color: '#FFD700' }}>3 candidatos</strong> para comparar.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px',
        maxWidth: '900px',
        margin: '0 auto',
        justifyItems: 'center',
      }}>
        {candidatos.map((c, i) => (
          <div
            key={c.id}
            style={{
              opacity: 0,
              animation: `fadeUp 0.5s ease ${i * 0.1}s forwards`,
            }}
          >
            <CandidatoCard
              candidato={c}
              seleccionado={!!seleccionados.find(s => s.id === c.id)}
              onToggle={toggleSeleccion}
            />
          </div>
        ))}
      </div>

      {/* Floating bottom bar */}
      {seleccionados.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(18,18,26,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: '20px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 40px rgba(255,215,0,0.1)',
          zIndex: 100,
          maxWidth: 'calc(100vw - 48px)',
        }}>
          {/* Mini cards preview */}
          <div style={{ display: 'flex', gap: '-4px' }}>
            {seleccionados.map(c => (
              <div key={c.id} style={{
                width: '32px',
                height: '44px',
                borderRadius: '6px',
                background: `linear-gradient(145deg, ${c.color}88, ${c.color}22)`,
                border: `1px solid ${c.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                marginLeft: '-6px',
              }}>
                {c.emoji}
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {seleccionados.length}/3 seleccionados
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '13px',
              color: '#fff',
              fontWeight: 600,
            }}>
              {seleccionados.map(c => c.nombre.split(' ')[0]).join(' vs ')}
            </div>
          </div>

          <button
            onClick={onComparar}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              background: '#FFD700',
              color: '#000',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
            }}
          >
            Comparar ⚡
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
