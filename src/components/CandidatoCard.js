import React, { useState } from 'react';
import { temas } from '../data/candidatos';

export default function CandidatoCard({ candidato, seleccionado, onToggle, compact }) {
  const [flipped, setFlipped] = useState(false);

  const cardStyle = {
    width: compact ? '160px' : '280px',
    height: compact ? '220px' : '400px',
    perspective: '1000px',
    cursor: 'pointer',
    flexShrink: 0,
  };

  const innerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const faceBase = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: seleccionado
      ? `0 0 0 3px ${candidato.color}, 0 20px 60px rgba(0,0,0,0.7)`
      : '0 20px 60px rgba(0,0,0,0.5)',
    transition: 'box-shadow 0.3s ease',
  };

  return (
    <div style={cardStyle} onClick={() => !compact && setFlipped(!flipped)}>
      <div style={innerStyle}>

        {/* FRONT */}
        <div style={{
          ...faceBase,
          background: `linear-gradient(160deg, ${candidato.color}22 0%, #12121a 40%, #0a0a0f 100%)`,
          border: `1px solid ${candidato.color}33`,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header strip */}
          <div style={{
            background: `linear-gradient(90deg, ${candidato.color}, ${candidato.colorSecundario})`,
            padding: compact ? '6px 10px' : '10px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: compact ? '8px' : '10px',
              color: 'rgba(0,0,0,0.7)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 700,
            }}>
              {candidato.partido}
            </span>
            <span style={{ fontSize: compact ? '10px' : '14px' }}>🇵🇪</span>
          </div>

          {/* Avatar area */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* BIG emoji avatar */}
            <div style={{
              width: compact ? '70px' : '110px',
              height: compact ? '70px' : '110px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, ${candidato.color}44, ${candidato.color}11)`,
              border: `2px solid ${candidato.color}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: compact ? '30px' : '50px',
            }}>
              {candidato.emoji}
            </div>

            {/* Selection badge */}
            {seleccionado && (
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#FFD700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 800,
                color: '#000',
              }}>
                ✓
              </div>
            )}
          </div>

          {/* Name */}
          <div style={{ padding: compact ? '8px 10px' : '12px 16px', background: 'rgba(0,0,0,0.4)' }}>
            <div style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: compact ? '14px' : '22px',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: compact ? '2px' : '4px',
            }}>
              {candidato.nombre}
            </div>
            {!compact && (
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                color: candidato.color,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {candidato.lema}
              </div>
            )}
            {!compact && (
              <div style={{
                marginTop: '8px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                color: 'rgba(255,255,255,0.3)',
                textAlign: 'center',
              }}>
                Toca para ver propuestas →
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div style={{
          ...faceBase,
          transform: 'rotateY(180deg)',
          background: `linear-gradient(160deg, ${candidato.color}15 0%, #0a0a0f 100%)`,
          border: `1px solid ${candidato.color}33`,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
        }}>
          {/* Back header */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '18px',
              color: candidato.color,
            }}>
              {candidato.nombre}
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.5,
              marginTop: '4px',
            }}>
              {candidato.descripcion}
            </div>
          </div>

          {/* Stats */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {temas.map(tema => (
              <div key={tema.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', width: '16px' }}>{tema.label.split(' ')[0]}</span>
                <div style={{
                  flex: 1,
                  height: '5px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${candidato.stats[tema.id]}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${candidato.color}, ${candidato.colorSecundario})`,
                    borderRadius: '3px',
                  }} />
                </div>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.4)',
                  width: '24px',
                  textAlign: 'right',
                }}>
                  {candidato.stats[tema.id]}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                cursor: 'pointer',
              }}
            >
              ← Volver
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(candidato); }}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                background: seleccionado ? candidato.color : 'transparent',
                border: `1px solid ${candidato.color}`,
                color: seleccionado ? '#000' : candidato.color,
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              {seleccionado ? '✓ Elegido' : '+ Comparar'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
