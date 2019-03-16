$(document).ready(startApp);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var wait_for_timeout = false;

var matches = 0; //Every time the application finds a match this variable should be incremented by 1
var attempts = 0; //Every time a user attempts a match (clicks the 2nd card) the attempts should be incremented by 1
var accuracy =  0////matches divided by attempts
var games_played = 0;
var highest_accuracy = 0;

var birdsObj = {
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



function startApp() {
  setNewHighScore();
  display_stats();
  createCards();
  addEventHandlers();
}

function addEventHandlers() {
    $('#game-area').on('click', '.card', card_clicked);
    $('.reset-button').on('click', reset_button_clicked);
    $('.play-again-button').on('click', reset_button_clicked);
    $('.play-again-button').on('click', hide_modal);
    $('.fa-close').on('click', hide_modal);
}


function card_clicked() {
  if(!wait_for_timeout && $(this).children().length === 2) {
    $(this).children('.back').hide();

    //ASSIGN FIRST CARD CLICKED
    if(first_card_clicked === null) {
      first_card_clicked = $(this);
    }
    //ASSIGN SECOND CARD CLICKED
    else if ($(first_card_clicked).index() !== $(this).index()) {
      second_card_clicked = this;
      attempts++;

      //CHECK IF THE CARDS ARE THE SAME
      if($(first_card_clicked).children('.front').css('background-image') === $(second_card_clicked).children('.front').css('background-image')) {
        cardsMatch();

        //IF THE CARDS arent the same, flip back the cards
        } else {
          notAMatch();
        }
      }
      display_stats();
    }
  }




function createCards() {
  var photoArray = [];
  for(var bird in birdsObj) {
    photoArray.push(birdsObj[bird], birdsObj[bird]);
  }

  var photosLength = photoArray.length;
  for(var i = 0; i<photosLength; i++) {
    var randomPick = Math.floor(Math.random() * photoArray.length);
    var card_div = $('<div>').addClass('card');
    var card_back = $('<div>').addClass('back');
    var front_card = $('<div>', {
      'class': 'front',
      'css': {
          'background-image': 'url(' + photoArray[randomPick].link + '),  linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
      },
    })

    photoArray.splice(randomPick, 1);
    $(card_div).append(front_card);
    $(card_div).append(card_back);
    $('#game-area').append(card_div);
  }
}



function checkIfWon() {
  if(matches === total_possible_matches) {

    if(accuracy > highest_accuracy || highest_accuracy===0) {
      localStorage.highest_accuracy =  JSON.stringify(accuracy)
    }
    show_modal();
  }
}

function cardsMatch() {
  matches++;
  accuracy = (matches/attempts*100).toFixed(2) + '%';

  $(first_card_clicked).children('.back').remove();
  $(second_card_clicked).children('.back').remove();
  $('.description .label').text('');

  addDescription();

  first_card_clicked = null;
  second_card_clicked = null;

  checkIfWon();
}

function notAMatch() {
  accuracy = (matches/attempts*100).toFixed(2) + '%';
  wait_for_timeout = true;
  setTimeout(function() {
    $(first_card_clicked).children('.back').show();
    $(second_card_clicked).children('.back').show();

    first_card_clicked = null;
    second_card_clicked = null;

    wait_for_timeout = false;
  }, 500);
}

// STATS

function addDescription() {
  var currentImagePath = $(second_card_clicked).children('.front').css('background-image');
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

function display_stats() {
  $('.games-played .value').text(games_played);
  $('.attempts .value').text(attempts);

  if(accuracy === 'NaN%') {
    accuracy = '0.00%';
  }
  $('.accuracy .value').text(accuracy);
}

//GAME RESET

function reset_stats() {
  accuracy = 0;
  attempts = 0;
  matches = 0;
  display_stats();
}


function reset_button_clicked() {
  first_card_clicked = null;
  $('.description .label').text('Description:')
  $('.description .value').text(' ');
  $('.description .fun-fact').text(' ');
  games_played++;

  reset_stats();
  $('.card').remove();
  createCards();
}

function setNewHighScore() {
  if(localStorage.highest_accuracy!==undefined || highest_accuracy!==0){
      highest_accuracy = JSON.parse(localStorage.highest_accuracy);
  }
}

function show_modal() {
  setNewHighScore();
  $('.attempts-after-win').text('You had ' + attempts + ' attempts');
  $('.accuracy-after-win').text('Your accuracy was ' + accuracy);

  if(accuracy < highest_accuracy) {
    $('.highest-accuracy-after-win').text('Your highest accuracy in a win is ' + highest_accuracy);
  } else {
    $('.highest-accuracy-after-win').text('Your accuracy of ' + accuracy + ' is a new personal best! Good job!')
  }
  $('.modal').show();
}

function hide_modal() {
    $('.modal').hide();
}
