const INITIAL_STATE = {
  showMenu: false,
};

const pokeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_MENU':
      return  {
        ...state,
        showMenu: !state.showMenu,
      }
    default:
      return state;
  }
}

export default pokeReducer;