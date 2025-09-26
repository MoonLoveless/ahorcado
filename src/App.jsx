import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import './App.css';

// Lista de palabras para el juego
const words = ['aplicacion', 'programacion', 'react', 'javascript', 'desarrollo', 'ordenador'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Manejador para las letras presionadas en el teclado
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    // Limpieza del event listener
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  // Función para jugar de nuevo
  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  // Función para mostrar la notificación de "letra ya usada"
  function show(setter) {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 2000);
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup 
        correctLetters={correctLetters} 
        wrongLetters={wrongLetters} 
        selectedWord={selectedWord} 
        setPlayable={setPlayable} 
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

// Componente para el mensaje emergente de victoria o derrota
const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  const wordLetters = new Set(selectedWord.split(''));
  const correctGuessedLetters = new Set(correctLetters);

  if (wordLetters.size === correctGuessedLetters.size) {
    finalMessage = '¡Felicidades! ¡Ganaste! 😃';
    playable = false;
  }

  if (wrongLetters.length === 6) {
    finalMessage = '¡Perdiste! 😕';
    finalMessageRevealWord = `...la palabra era: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));

  return (
    <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Jugar de Nuevo</button>
      </div>
    </div>
  );
}

export default App;