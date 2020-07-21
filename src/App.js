// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Cards
import cards from './Cards'

// Redux
import { saveDeck, pickCard } from './redux/blackjack-reducer';

const mapStateToProps = state => ({
	deck: state.blackjack.deck,
	userCards: state.blackjack.userCards,
	points: state.blackjack.points,
});

const mapDispatchToProps = dispatch => ({
	saveDeck: info => dispatch(saveDeck(info)),
	pickCard: info => dispatch(pickCard(info)),
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.createDeck();
	}

	createDeck = () => {
		const newDeck = cards.map(card => (
			['paus', 'copas', 'espada', 'ouro'].map(suit => ({...card, suit})))
		);

		const flatDeck = newDeck.flat(1)

		this.props.saveDeck(flatDeck);
	}

	pickRandomCard = () => {
		const { deck } = this.props;

		const randomIndex = Math.floor(Math.random(0,52)*52);
		const randomCard = deck[randomIndex];

		this.props.pickCard(randomCard);
	} 

	isRedCard = (info) => {
		return (info.suit === 'copas' || info.suit === 'ouro') && true;
	}

	handleStand = () => {

	}

	handleRestart = () => {

	}

	renderCards = () => {
			return this.props.userCards.map((info, i) => (
				<li className="card" key={i}>
					<span className={`top-card-value ${this.isRedCard(info) && 'red'}`}>{info.name}</span>
					<span className={`bottom-card-value ${this.isRedCard(info) && 'red'}`}>{info.name}</span>
					{info.suit === 'paus' && <span className="middle-suit">&clubs;</span>}
					{info.suit === 'copas' && <span className="middle-suit red">&hearts;</span>}
					{info.suit === 'espada' && <span className="middle-suit">&spades;</span>}
					{info.suit === 'ouro' && <span className="middle-suit red">&diams;</span>}
				</li>
			))
	}

	render() {
		const { points, message, finished } = this.props;

		return (
			<div className="container">
				<h1>Cards</h1>
				<ul className="card-container">
					{this.renderCards()}
				</ul>
				<h2>Points: {points}</h2>
				<div className="menu">
					<button className="menu-button" disabled={finished} onClick={() => this.pickRandomCard()}>Pick</button>
					<button className="menu-button" disabled={finished} onClick={() => this.handleStand()}>Stand</button>
					<button className="menu-button" onClick={() => this.handleRestart()}>Restart</button>
				</div>
				{message !== '' && <h3>{message}</h3>}
			</div>
			);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);