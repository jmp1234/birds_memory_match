

class BirdGame {
  constructor() {
    this.cards = [];
    this.total_possible_matches = 9;
    this.wait_for_timeout = false;
    this.first_card_clicked = null;
    this.second_card_clicked = null;
    this.stats = new Stats();
    this.birdsObj = {
      'Williamson\'s Sapsucker': {
        link: 'images/Williamsons_Sapsucker.jpg',
        bird_description: 'A handsome woodpecker of the western mountains, the Williamson\'s Sapsucker specializes in drilling sap wells in trees.',
        source: '“Williamson\'s Sapsucker Overview, All About Birds, Cornell Lab of Ornithology.” , All About Birds, Cornell Lab of Ornithology, www.allaboutbirds.org/guide/Williamsons_Sapsucker.',
      },
      'Whopping Crane': {
        link: 'images/whopping_crane.jpeg',
        bird_description: 'The Whooping Crane walks with a smooth and stately gait.',
        source: '“Whooping Crane Overview, All About Birds, Cornell Lab of Ornithology.” , All About Birds, Cornell Lab of Ornithology, www.allaboutbirds.org/guide/Whooping_Crane/.',
      },
      'Western Meadowlark': {
        link: 'images/Western_Meadowlark.jpg',
        bird_description: 'The Western Meadowlark is the state bird of six states.',
        source: '“Western Meadowlark Overview, All About Birds, Cornell Lab of Ornithology.” , All About Birds, Cornell Lab of Ornithology, www.allaboutbirds.org/guide/Western_Meadowlark.'
      },
      'Kirtlands Warbler': {
        link: 'images/Kirtlands_Warbler.jpg',
        bird_description: 'The Kirtland\s Warbler requires areas with small jack pines for nesting.',
        source: '“Kirtland\'s Warbler Overview, All About Birds, Cornell Lab of Ornithology.” , All About Birds, Cornell Lab of Ornithology, www.allaboutbirds.org/guide/Kirtlands_Warbler.',
      },
      'Siamese Fireback': {
        link: 'images/SIAMESE_FIREBACK.jpg',
        bird_description: 'The Siamese Fireback is an impressive bird with bright red wattles and legs, a beautifully curved tail and crest and delicately marked grey feathered body.',
        source: '“Siamese Fireback.” Boreal Forest Animals, thewebsiteofeverything.com/animals/birds/Galliformes/Phasianidae/Lophura-diardi.',
      },
      'Red Flanked Bluetail': {
        link: 'images/Red-flanked_Bluetail_male.jpg',
        bird_description: 'The Red-flanked Bluetail was formerly classed as a member of the thrush family Turdidae.',
        source: '“Field Guide to Birds of North America.” Red-Breasted Nuthatch - Whatbird.com, identify.whatbird.com/obj/748/_/Red-flanked_Bluetail.aspx.'
      },
      'Northern Cardinal': {
        link: 'images/Northern_Cardinal.jpg',
        bird_description: 'Many people are perplexed each spring by the sight of a cardinal attacking its reflection in a window, car mirror, or shiny bumper.',
        source: '“Northern Cardinal Overview, All About Birds, Cornell Lab of Ornithology.” , All About Birds, Cornell Lab of Ornithology, www.allaboutbirds.org/guide/Northern_Cardinal.',
      },
      'Ferruginous Pygmy Owl': {
        link: 'images/Ferruginous_Pygmy-owl.jpg',
        bird_description: 'Ferruginous Pygmy-Owls sometimes are active by day, although they primarily are crepuscular. ',
        source: '“Ferruginous Pygmy-Owl Glaucidium Brasilianum.” Neotropical Birds Online, neotropical.birds.cornell.edu/Species-Account/nb/species/fepowl/overview.',
      },
      'California Condor': {
        link: 'images/California_Condor.jpg',
        bird_description: 'California Condors are the largest wild birds in North America.',
        source: '“California Condor Identification, All About Birds, Cornell Lab of Ornithology.” , All About Birds, Cornell Lab of Ornithology, www.allaboutbirds.org/guide/California_Condor/id.',
      },
    }

    this.card_clicked = this.card_clicked.bind(this);
    this.reset_button_clicked = this.reset_button_clicked.bind(this);
    this.hide_modal = this.hide_modal.bind(this);

    this.clickHandlers();

  }

  createCards() {
    var photoArray = [];
    for(var bird in this.birdsObj) {
      photoArray.push(this.birdsObj[bird], this.birdsObj[bird]);
    }

    var photosLength = photoArray.length;
    for(var i = 0; i<photosLength; i++) {
      var randomPick = Math.floor(Math.random() * photoArray.length);

      var card = new BirdCard(photoArray[randomPick].link, this.card_clicked);
      this.cards.push(card);
      photoArray.splice(randomPick, 1);
      $('#game-area').append(card.render());
      console.log(card)
    }

  }

  card_clicked(card) {
    if(!this.wait_for_timeout && $(card.domElement).children().length === 2) {
      $(card.card_back).hide();

      //ASSIGN FIRST CARD CLICKED
      if(this.first_card_clicked === null) {
        this.first_card_clicked = card;
      }

      //ASSIGN SECOND CARD CLICKED
      else if ($(this.first_card_clicked.domElement).index() !== $(card.domElement).index()) {
        this.second_card_clicked = card;
        this.stats.attempts++;

        //CHECK IF THE CARDS ARE THE SAME
        if(this.first_card_clicked.randomLink === this.second_card_clicked.randomLink) {
          this.cardsMatch();
        } else {
          this.notAMatch();
        }
      }
      this.stats.display_stats();
    }
  }

  cardsMatch() {
    this.stats.matches++;
    this.stats.accuracy = (this.stats.matches/this.stats.attempts*100).toFixed(2) + '%';
    console.log(this.stats.accuracy)

    $(this.first_card_clicked.card_back).remove();
    $(this.second_card_clicked.card_back).remove();

    this.stats.addDescription( this.birdsObj, this.second_card_clicked);

    this.first_card_clicked = null;
    this.second_card_clicked = null;

    this.checkIfWon();
  }

  checkIfWon() {
    if(this.stats.matches === this.total_possible_matches) {

      if(this.stats.accuracy > this.stats.highest_accuracy || this.stats.highest_accuracy===0) {
        localStorage.highest_accuracy =  JSON.stringify(this.stats.accuracy)
      }
      this.show_modal();
    }
  }

  notAMatch() {
    this.stats.accuracy = (this.stats.matches/this.stats.attempts*100).toFixed(2) + '%';
    console.log(this.stats.accuracy)
    this.wait_for_timeout = true;
    setTimeout(function() {
      $(this.first_card_clicked.card_back).show();
      $(this.second_card_clicked.card_back).show();

      this.first_card_clicked = null;
      this.second_card_clicked = null;

      this.wait_for_timeout = false;
    }.bind(this), 500);
  }

  reset_button_clicked() {
    this.first_card_clicked = null;
    this.stats.resetDescriptionBox();
    this.stats.games_played++;

    this.stats.reset_stats();
    for(var i=0; i<this.cards.length; i++) {
      $(this.cards[i].domElement).remove();
    }

    this.createCards();
  }

  show_modal () {
    this.stats.setNewHighScore();
    $('.attempts-after-win').text('You had ' + this.stats.attempts + ' attempts');
    $('.accuracy-after-win').text('Your accuracy was ' + this.stats.accuracy);

    if(this.stats.accuracy < this.stats.highest_accuracy) {
      $('.highest-accuracy-after-win').text('Your highest accuracy in a win is ' + this.stats.highest_accuracy);
    } else {
      $('.highest-accuracy-after-win').text('Your accuracy of ' + this.stats.accuracy + ' is a new personal best! Good job!')
    }
    $('.modal').show();
  }

  hide_modal() {
      $('.modal').hide();
  }



  clickHandlers() {
    $('.reset-button').on('click', this.reset_button_clicked);
    $('.play-again-button').on('click', this.reset_button_clicked);
    $('.play-again-button').on('click', this.hide_modal);
    $('.fa-close').on('click', this.hide_modal);
  }








}
