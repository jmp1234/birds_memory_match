$(document).ready(startApp);

function startApp() {
  var game = new BirdGame();
  game.createCards();
}
