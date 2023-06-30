import { useEffect, useState } from 'react';
import words from './wordList.json'

const HEAD = (<div className='head'/>)
const BODY = (<div className='body'/>)
const RIGHT_ARM = (<div className='rightarm'/>)
const LEFT_ARM = (<div className='leftarm'/>)
const RIGHT_LEG = (<div className='rightleg'/>)
const LEFT_LEG = (<div className='leftleg'/>)

const ALPAHBET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M","N", "O", "P","Q","R","S","T","U","V","W","X","Y","Z"]
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

function getword(){
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [gameEnd, setGameEnd] = useState(false)
  const [isWon, setIsWon] = useState(false)
  const [failCounter, setFailCounter] = useState(0)
  const [word,setWord] = useState(getword())
  const [guessedLetters, setGuessedLetters] = useState([])

  console.log(word)

  const guessLetter=(letter)=>{
    if(!guessedLetters.includes(letter)){
      setGuessedLetters(prevLetter => [...prevLetter, letter])
      if(!word.includes(letter)){
        setFailCounter(failCounter + 1)
        if(failCounter===5){
          setGameEnd(true)
          setIsWon(false)
        }
      }
    }
  }

  useEffect(()=>{
    if(word.split("").every(char => guessedLetters.includes(char))){
      setIsWon(true)
      setGameEnd(true)
    }
  },[guessedLetters])

  return (
    <div className='game-container'>
      <div className='game-message'>
        {gameEnd? isWon? "Congrats! You won, you can refresh the page to play again": "Unlucky! You lost, refresh the page to play again" : "Guess a letter"}
      </div>
        <div className='hangman'>
        {BODY_PARTS.slice(0, failCounter)}
          <div className='noose'/>
          <div className='top'/>
          <div className='bar'/>
          <div className='bottom'/>
        </div>
        <div className='guess-container'>
          <div className='word-guess-container'>
              {word.split("").map((char, index)=> {return <span className='word-guess' key={index}><span className='words-letters' style={{visibility : guessedLetters.includes(char)|| failCounter===6? "visible": "hidden",}}>{char}</span></span>})}
          </div>
            <div className='letters'>
                {ALPAHBET.map((letter,index)=> {
                return (<button className={`btn ${gameEnd? "inactive":""}`} key={index} disabled={gameEnd} onClick={()=>guessLetter(letter.toLowerCase())}>{letter}</button>)})}
            </div>
        </div>
    </div>
  );
}

export default App;
