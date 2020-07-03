import React, { useState, useEffect } from 'react';
import Cards from './Cards'


const App = () => {
	const [deck, setDeck] = useState('');
	const [picked, setPicked] = useState([]);
	const [points, setPoints] = useState(0);
	const [finished, setFinished] = useState(false);
	const [message, setMessage] = useState('');
	const suits = ['paus', 'copas', 'espada', 'ouro'];
	const cards = Cards;

	const createDeck = (suits, cards) => {
		let newDeck;
		newDeck = cards.map(card => (
			suits.map(suit => ({...card, suit})))
		)
		newDeck = newDeck.flat(1)
		setDeck(newDeck)
	}

	const pickRandomCard = () => {
		let pick
		const alreadyPicked = (el) => el === pick
		do{
			pick = Math.floor(Math.random(0,52)*52);
			if(picked.findIndex(alreadyPicked) === -1){
				setPicked([...picked, pick]);
				setPoints(points + deck[pick].value);
			}
		}while(picked.findIndex(alreadyPicked) !== -1 && picked.length < 52)
	}

	const handleRestart = () => {
		setPicked([]);
		setPoints(0);
		setFinished(false);
		setMessage('')
	}

	const handleStand = () => {
		setMessage(`You have finished with ${points} points`);
		setFinished(true);
	}

	const isRedCard = (info) => {
		return (deck[info].suit === 'copas' || deck[info].suit === 'ouro') && true;
	}

	useEffect(() => {
		createDeck(suits, cards);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		if(points >= 21){
			setFinished(true);
			points === 21 ? setMessage('Congrats! You are lucky!') : setMessage('Better luck next time, homie!')
		}
	}, [points])


  return (
	  <div className="container">
		<h1>Cards</h1>
		<ul className="card-container">
			{picked.map((info, i) => (
				<li className="card" key={i}>
					<span className={`top-card-value ${isRedCard(info) && 'red'}`}>{deck[info].name}</span>
					<span className={`bottom-card-value ${isRedCard(info) && 'red'}`}>{deck[info].name}</span>
					{deck[info].suit === 'paus' && <span className="middle-suit">&clubs;</span>}
					{deck[info].suit === 'copas' && <span className="middle-suit red">&hearts;</span>}
					{deck[info].suit === 'espada' && <span className="middle-suit">&spades;</span>}
					{deck[info].suit === 'ouro' && <span className="middle-suit red">&diams;</span>}
				</li>
			))}
		</ul>
		<h2>Points: {points}</h2>
		<div className="menu">
			<button className="menu-button" disabled={finished} onClick={() => pickRandomCard()}>Pick</button>
			<button className="menu-button" disabled={finished} onClick={() => handleStand()}>Stand</button>
			<button className="menu-button" onClick={() => handleRestart()}>Restart</button>
		</div>
		{message !== '' && <h3>{message}</h3>}
	</div>
  );
}

export default App;
