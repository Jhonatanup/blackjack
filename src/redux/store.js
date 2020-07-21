// Libs
import {
	createStore,
	combineReducers,
} from 'redux';

// Reducers
import Blackjack from './blackjack-reducer';

const reducers = combineReducers({
  blackjack: Blackjack,
});

const rootReducer = (state, action) => {
	if (action.meta && action.meta.logout) {
		state = undefined; // eslint-disable-line no-param-reassign
	}

	return reducers(state, action);
};

const configureStore = (initialState) => {
	const store = createStore(
		rootReducer,
		initialState,
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	);

	return store;
};

export default configureStore({});