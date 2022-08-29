function actionMenu(text) {
  return {
    type: 'SHOW_MENU',
    payload: text,
  }
}

export default actionMenu;