import React, { useState } from 'react';
import { temas, candidatos as todosCandidatos } from '../data/candidatos';

function calcularAfinidad(seleccionados) {
  // Find top candidate by average stats
  return seleccionados.map(c => ({
    ...c,
    promedio: Math.round(Object.values(c.stats).reduce((a, b) => a + b, 0) / Object.values(c.stats).length),
  })).sort((a, b) => b.promedio - a.promedio);
}

export default function Resultado({ seleccionados, onReiniciar }) {
  const [copiado, setCopiado] = useState(false);
  const ranking = calcularAfinidad(seleccionados);
  const ganador = ranking[0];

  const compartir = () => {
    const texto = `🗳️ En PerúVota 2026 comparé a ${seleccionados.map(c => c.nombre).join(', ')}. ¿Y tú? peru-vota-2026.vercel.app`;
    if (navigator.share) {
      navigator.share({ text: texto, url: window.location.href });
    } else {
      navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at 30% 20%, ${ganador.color}15 0%, #0a0a0f 50%)`,
      padding: '40px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          color: '#FFD700',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          🏆 Tu comparación
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(40px, 12vw, 72px)',
          background: 'linear-gradient(135deg, #fff, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '8px',
        }}>
          Resultado Final
        </h1>
      </div>

      {/* Ranking cards */}
      <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
        {ranking.map((c, i) => (
          <div
            key={c.id}
            style={{
              background: i === 0
                ? `linear-gradient(135deg, ${c.color}33, ${c.color}11)`
                : 'rgba(255,255,255,0.02)',
              border: i === 0
                ? `1px solid ${c.color}66`
                : '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              animation: `fadeUp 0.5s ease ${i * 0.15}s both`,
            }}
          >
            {/* Position badge */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : '#CD7F32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '18px',
              color: '#000',
              flexShrink: 0,
            }}>
              {i + 1}
            </div>

            <span style={{ fontSize: '28px' }}>{c.emoji}</span>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {c.nombre}
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                color: c.color,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {c.partido}
              </div>
            </div>

            {/* Stats mini overview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '80px' }}>
              {temas.slice(0, 3).map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '9px' }}>{t.label.split(' ')[0]}</span>
                  <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${c.stats[t.id]}%`,
                      height: '100%',
                      background: c.color,
                      borderRadius: '2px',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '28px',
              color: c.color,
              flexShrink: 0,
            }}>
              {c.promedio}
            </div>
          </div>
        ))}
      </div>

      {/* Share card */}
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,77,77,0.08))',
        border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '20px',
        padding: '24px',
        textAlign: 'center',
        marginBottom: '28px',
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: '22px',
          color: '#FFD700',
          marginBottom: '8px',
        }}>
          📤 Comparte tu comparación
        </div>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.6,
          marginBottom: '16px',
        }}>
          ¿Tus amigos saben lo que propone cada candidato?<br />
          Mándales esto por WhatsApp 👇
        </p>
        <button
          onClick={compartir}
          style={{
            padding: '14px 32px',
            borderRadius: '50px',
            background: copiado ? '#2A9D8F' : '#25D366',
            color: '#fff',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '14px',
            cursor: 'pointer',
            border: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            width: '100%',
          }}
        >
          {copiado ? '✅ ¡Copiado!' : '📲 Compartir en WhatsApp'}
        </button>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={onReiniciar}
          style={{
            padding: '12px 24px',
            borderRadius: '50px',
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          🔄 Volver a empezar
        </button>
      </div>

      <div style={{
        marginTop: '36px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '10px',
        color: 'rgba(255,255,255,0.15)',
        textAlign: 'center',
        lineHeight: 1.8,
      }}>
        🇵🇪 PerúVota 2026 · Elecciones 12 de Abril<br />
        Contenido educativo · No afiliado a ningún partido
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
