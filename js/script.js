// modes and colors
var pkMode = 0;
var veganMode = 0;
var bgColors = ['000000', '112F41', '068587', '4FB99F', 'F2B134', 'ED553B'];
var currentColor = 3;

// sheetrock parameters and suggestion setup
var ssUrl = 'https://docs.google.com/spreadsheet/ccc?key=0At3U5DRrcuOfdEpOTEh2dENXblo5Yi16SnNFelNtTkE#gid=0;';
var jsonArray = [];
var jsonVeganArray = [];
var numEntries = 0;
var numVeganEntries = 0;
var randEntry = 0;
var newSuggestion = '';
var newFoursquare = '';

function changeBg(colorIndex) {
  $('body').css('background-color', '#'+bgColors[colorIndex]);
  $('.foursquare').css('color', '#'+bgColors[colorIndex]);
}

function initSuggestion() {
  // remove headers from json arrays and set number of rows in each table
  jsonArray.shift();
  jsonArray.shift();
  jsonVeganArray.shift();
  jsonVeganArray.shift();
  numEntries = jsonArray.length;
  numVeganEntries = jsonVeganArray.length;  

  getNewSuggestion();
}

function getNewSuggestion() {
  // get new random suggestion from json arrays
  if (veganMode === 1) {
    randEntry = Math.floor(Math.random() * numVeganEntries);
    newSuggestion = jsonVeganArray[randEntry].venue;
    newFoursquare = jsonVeganArray[randEntry].id;
  } else {
    randEntry = Math.floor(Math.random() * numEntries);
    newSuggestion = jsonArray[randEntry].venue;
    newFoursquare = jsonArray[randEntry].id;
  }
  $('.suggestion').html(newSuggestion);
  $('.foursquare').html('<a href="http://foursquare.com/venue/' + newFoursquare + '" target="_blank">info</a>');
}

$(document).ready(function() {
  // run sample query (parameters in foursquare.js)
  // foursquare.init();
  
  // query google sheet using sheetrock and initialize suggestions
  $('#sheetrock').sheetrock({
    url: ssUrl,
    userCallback: initSuggestion
  });

  $('.suggestion').click(function() {
    $('.foursquare').css('visibility', 'hidden');
    getNewSuggestion();

    if (pkMode === 0) {
      currentColor = Math.floor(1 + Math.random() * (bgColors.length));
      changeBg(currentColor);
    }
    
    $('.foursquare').css('visibility', 'visible');
  });

  $('.veg-click').click(function() {
    $('.doge').removeClass('invisible');
    if (veganMode === 0) {
      veganMode = 1;
      setTimeout(function() {
        $('.veg-click').addClass('veg-click2');
        $('.veg-click2').removeClass('veg-click');
      }, 300);
      $('.scroll').css('top', '0%'); // open and close alert
      $('.alert').html('VEGAN MODE!!!!!'); // change alert messaging
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
    } else {
      veganMode = 0;
      setTimeout(function() {
        $('.veg-click2').addClass('veg-click');
        $('.veg-click').removeClass('veg-click2');
      }, 300);
      $('.scroll').css('top', '0%'); // open and close alert
      $('.alert').html('vegan mode deactivated'); // change alert messaging
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
    }
    
  });

  $('.pk-click').click(function() {
    $('.doge').addClass('invisible');
    if (pkMode === 0) {
      pkMode = 1;
      setTimeout(function() {
        // currentColor = 0;
        changeBg(0);
        $('body').addClass('pk-font');
      }, 300);
      $('.scroll').css('top', '0%');  // open and close alert
      $('.alert').html('PK mode!!!!'); // change alert messaging
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
    } else {
      pkMode = 0;
      setTimeout(function() {
        currentColor = 4;
        changeBg(currentColor);
        $('body').removeClass('pk-font');
      }, 300);
      $('.scroll').css('top', '-0%'); // open and close alert
      $('.alert').html('PK mode deactivated'); // change alert messaging
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
    }
  });

});
