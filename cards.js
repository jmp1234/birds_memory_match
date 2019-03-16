
class BirdCard {
  constructor(randomLink, card_clicked_callback) {
    this.randomLink = randomLink;
    this.domElement = null;
    this.card_back = null;
    this.card_front = null;
    this.card_clicked_callback = card_clicked_callback;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.card_clicked_callback(this);
  }


  render() {
    var card_div = $('<div>').addClass('card');
    this.card_back = $('<div>').addClass('back');
    this.card_front = $('<div>', {
      'class': 'front',
      'css': {
          'background-image': 'url(' + this.randomLink + '),  linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
      },
    })

    $(card_div).append(this.card_front);
    $(card_div).append(this.card_back);

    this.domElement = card_div;
    return this.domElement.on('click', this.handleClick);
  }
}
