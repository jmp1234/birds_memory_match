class Stats {
  constructor() {
    this.matches = 0;
    this.attempts = 0;
    this.accuracy = 0;
    this.highest_accuracy = 0;

    this.display_stats();
    this.setNewHighScore();
  }


  resetDescriptionBox() {
    $('.description .label').text('Description of Bird:')
    $('.description .value').text(' ');
    $('.description .fun-fact').text(' ');
  }

  addDescription( birdsObj, second_card_clicked ) {
    $('.description .label').text('')
    var currentImagePath = $(second_card_clicked.card_front).css('background-image');
    var firstIndex = currentImagePath.indexOf('image');
    var lastIndex = currentImagePath.lastIndexOf('\")');
    var currentImage = currentImagePath.slice(firstIndex, lastIndex);

    for(var bird in birdsObj) {
      if(currentImage === birdsObj[bird].link) {
        $('.description .fun-fact').text(birdsObj[bird].bird_description);
        $('.description .value').text(bird);
      }
    }
  }

  display_stats() {
    $('.attempts .value').text(this.attempts);

    if(this.accuracy === 'NaN%') {
      this.accuracy = '0.00%';
    }
    $('.accuracy .value').text(this.accuracy);
  }

  reset_stats() {
    this.accuracy = 0;
    this.attempts = 0;
    this.matches = 0;
    this.display_stats();
  }

  setNewHighScore() {
    if(localStorage.highest_accuracy!==undefined || this.highest_accuracy!==0){
        this.highest_accuracy = JSON.parse(localStorage.highest_accuracy);
    }
  }
}
