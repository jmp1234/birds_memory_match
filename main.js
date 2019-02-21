var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var wait_for_timeout = false;



$(document).ready(startApp);

function startApp() {



  $('#game-area').on('click', '.card', card_clicked);


  function card_clicked() {
    if(!wait_for_timeout) {
      $(this).children('.back').css('display', 'none');

//ASSIGN card_clicked variables
      if(first_card_clicked === null) {
        first_card_clicked = $(this);

      } else {
        second_card_clicked = $(this);

//CHECK IF THE CARDS ARE THE SAME
          if($(first_card_clicked).children('.front').css('background-image') === $(second_card_clicked).children('.front').css('background-image')) {
            match_counter++;
            console.log('match counter:',match_counter)
            first_card_clicked = null;
            second_card_clicked = null;
          //CHECK IF YOU WON
            if(match_counter === total_possible_matches) {
              alert('you won');
            }
  //IF THE CARDS arent the same, RESET
          } else {
            wait_for_timeout = true;
            console.log('try again')
            setTimeout(function() {
              $(first_card_clicked).children('.back').css('display', 'inline-block');
              $(second_card_clicked).children('.back').css('display', 'inline-block');

              first_card_clicked = null;
              second_card_clicked = null;

              wait_for_timeout = false;
            }, 1000);
          }
        }
      }
    }


var photosObj = {
  williamsons_sapsucker: {
    link: 'images/Williamsons_Sapsucker.jpg',
    bird_description: '',
  },
  whopping_crane: {
    link: 'images/whopping_crane.jpeg',
    bird_description: '',
  },
  western_meadowlark: {
    link: 'images/Western_Meadowlark.jpg',
    bird_description: '',
  },
  kirtlands_warbler: {
    link: 'images/Kirtlands_Warbler.jpg',
    bird_description: '',
  },
  siamese_fireback: {
    link: 'images/SIAMESE_FIREBACK.jpg',
    bird_description: '',
  },
  red_flanked_bluetail: {
    link: 'images/Red-flanked_Bluetail_male.jpg',
    bird_description: '',
  },
  northern_cardinal: {
    link: 'images/Northern_Cardinal.jpg',
    bird_description: '',
  },
  ferruginous_pygmy: {
    link: 'images/Ferruginous_Pygmy-owl.jpg',
    bird_description: 't',
  },
  california_condor: {
    link: 'images/California_Condor.jpg',
    bird_description: '',
  },
}


  function createCardArray() {
    var photoPairs = [];
    for(var bird in photosObj) {
      photoPairs.push(photosObj[bird].link, photosObj[bird].link);
    }
    return photoPairs
  }




    function createCards() {
      var photoArray = createCardArray();
      for(var i = 0; i<18; i++) {
        var randomPick = Math.floor(Math.random() * photoArray.length);
        console.log(photoArray[randomPick]);
        var card_div = $('<div>').addClass('card');
        var card_back = $('<div>').addClass('back');
        var front_card = $('<div>', {
          'class': 'front',
          'css': {
            'background-image': 'url(' + photoArray[randomPick] + '),  linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
          },
        })
        photoArray.splice(randomPick, 1);
        $(card_div).append(front_card);
        $(card_div).append(card_back);
        $('#game-area').append(card_div);
      }
    }



    createCards();
}
 //the final bracket for startapp()
