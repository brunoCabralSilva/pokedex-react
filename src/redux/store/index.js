import { legacy_createStore as createStore  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import pokeReducer from '../reducer';

const store = createStore(pokeReducer, composeWithDevTools());

export default store;