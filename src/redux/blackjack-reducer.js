// Action Type
const SAVE_DECK = 'BLACKJACK/cards/SAVE_DECK';
const PICK_CARD = 'BLACKJACK/cards/PICK_CARD';

// Initial State
export const initialState = {
	userCards: [],
	deck: [],
	points: 0,
};

// Reducer
export default function (state = initialState, action) {
	switch (action.type) {
	case SAVE_DECK:
		return {
			...state,
			deck: action.info,
		}
	case PICK_CARD:
		return {
			...state,
			userCards: state.userCards.concat(action.info),
			points: state.points += action.info.value,
			term: ''
		}
	default:
		return state;
	}
}

// Action Creator
export const saveDeck = info => ({
	type: SAVE_DECK,
	info,
});

export const pickCard = info => ({
	type: PICK_CARD,
	info,
});
