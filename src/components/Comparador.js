import React, { useState } from 'react';
import { temas } from '../data/candidatos';

async function preguntarIA(candidatos, tema) {
  const prompt = `Eres un analista político peruano experto. Compara las propuestas de estos candidatos en el tema de ${tema}. 
  Sé directo, usa emojis, lenguaje claro para jóvenes de 18-30 años. Máximo 3 oraciones por candidato. 
  
  Candidatos y propuestas:
  ${candidatos.map(c => `${c.nombre} (${c.partido}): ${c.propuestas[tema]}`).join('\n')}
  
  Formato de respuesta: Para cada candidato, una línea con su nombre en negrita y su posición en palabras simples. Al final una línea diciendo cuál es más radical, cuál más moderado en este tema. Sin markdown complejo.`;

  const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  }),
});

  const data = await response.json();
  return data.content?.[0]?.text || 'No se pudo obtener el análisis.';
}

export default function Comparador({ seleccionados, temaActivo, setTemaActivo, onVolver, onResultado }) {
  const [analisisIA, setAnalisisIA] = useState('');
  const [cargandoIA, setCargandoIA] = useState(false);
  const [analisisTema, setAnalisisTema] = useState('');

  const handleAnalizar = async () => {
    setCargandoIA(true);
    setAnalisisIA('');
    try {
      const texto = await preguntarIA(seleccionados, temaActivo);
      setAnalisisIA(texto);
      setAnalisisTema(temaActivo);
    } catch (e) {
      setAnalisisIA('Error al conectar con IA. Verifica tu API key en las variables de entorno.');
    }
    setCargandoIA(false);
  };

  const temaInfo = temas.find(t => t.id === temaActivo);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      padding: '24px 16px 80px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <button
          onClick={onVolver}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
          }}
        >
          ← Volver
        </button>
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(28px, 8vw, 48px)',
            lineHeight: 1,
            color: '#fff',
          }}>
            Comparando
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '2px',
          }}>
            {seleccionados.map(c => c.nombre.split(' ')[0]).join(' · ')}
          </div>
        </div>
      </div>

      {/* Tema selector */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '28px',
        scrollbarWidth: 'none',
      }}>
        {temas.map(t => (
          <button
            key={t.id}
            onClick={() => { setTemaActivo(t.id); setAnalisisIA(''); }}
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: '50px',
              border: temaActivo === t.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
              background: temaActivo === t.id ? '#FFD700' : 'rgba(255,255,255,0.03)',
              color: temaActivo === t.id ? '#000' : 'rgba(255,255,255,0.6)',
              fontFamily: "'Syne', sans-serif",
              fontWeight: temaActivo === t.id ? 700 : 400,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Stats comparison */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: '13px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '3px',
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          Puntaje en {temaInfo?.label}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {seleccionados.map(c => (
            <div key={c.id} style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${c.color}22`,
              borderRadius: '14px',
              padding: '16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '22px' }}>{c.emoji}</span>
                  <div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#fff',
                    }}>{c.nombre}</div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '9px',
                      color: c.color,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}>{c.partido}</div>
                  </div>
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: '36px',
                  color: c.color,
                  lineHeight: 1,
                }}>
                  {c.stats[temaActivo]}
                </div>
              </div>

              {/* Stat bar */}
              <div style={{
                height: '8px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '12px',
              }}>
                <div style={{
                  width: `${c.stats[temaActivo]}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${c.color}, ${c.colorSecundario})`,
                  borderRadius: '4px',
                  transition: 'width 1s ease',
                }} />
              </div>

              {/* Propuesta */}
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {c.propuestas[temaActivo]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.05), rgba(255,77,77,0.05))',
        border: '1px solid rgba(255,215,0,0.15)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '28px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '20px',
              color: '#FFD700',
            }}>
              🤖 Análisis IA
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.3)',
            }}>
              Powered by Claude
            </div>
          </div>
          <button
            onClick={handleAnalizar}
            disabled={cargandoIA}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              background: cargandoIA ? 'rgba(255,215,0,0.3)' : '#FFD700',
              color: '#000',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '12px',
              cursor: cargandoIA ? 'not-allowed' : 'pointer',
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {cargandoIA ? '⏳ Analizando...' : '⚡ Analizar'}
          </button>
        </div>

        {cargandoIA && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              color: 'rgba(255,215,0,0.6)',
              animation: 'pulse 1.5s infinite',
            }}>
              Consultando a la IA...
            </div>
          </div>
        )}

        {analisisIA && (
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
          }}>
            {analisisIA}
          </div>
        )}

        {!analisisIA && !cargandoIA && (
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.2)',
            textAlign: 'center',
            padding: '12px 0',
          }}>
            Presiona ⚡ Analizar para una comparación inteligente del tema seleccionado
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onResultado}
          style={{
            padding: '16px 36px',
            borderRadius: '50px',
            background: 'linear-gradient(90deg, #FFD700, #FF4D4D)',
            color: '#000',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '15px',
            cursor: 'pointer',
            border: 'none',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            boxShadow: '0 8px 40px rgba(255,215,0,0.3)',
          }}
        >
          🏆 Ver Mi Resultado Final
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
