import React, { useState } from 'react';
import Intro from './components/Intro';
import CardDeck from './components/CardDeck';
import Comparador from './components/Comparador';
import Resultado from './components/Resultado';
import './App.css';

export default function App() {
  const [pantalla, setPantalla] = useState('intro'); // intro | deck | comparar | resultado
  const [seleccionados, setSeleccionados] = useState([]);
  const [temaActivo, setTemaActivo] = useState('economia');

  return (
    <div className="app">
      {pantalla === 'intro' && (
        <Intro onStart={() => setPantalla('deck')} />
      )}
      {pantalla === 'deck' && (
        <CardDeck
          seleccionados={seleccionados}
          setSeleccionados={setSeleccionados}
          onComparar={() => setPantalla('comparar')}
          onResultado={() => setPantalla('resultado')}
        />
      )}
      {pantalla === 'comparar' && (
        <Comparador
          seleccionados={seleccionados}
          temaActivo={temaActivo}
          setTemaActivo={setTemaActivo}
          onVolver={() => setPantalla('deck')}
          onResultado={() => setPantalla('resultado')}
        />
      )}
      {pantalla === 'resultado' && (
        <Resultado
          seleccionados={seleccionados}
          onReiniciar={() => { setSeleccionados([]); setPantalla('intro'); }}
        />
      )}
    </div>
  );
}
