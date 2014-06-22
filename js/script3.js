var ssId = '1w6ZWjyqVbbbs0MOUEW6qAUNhx4uG5Am_6XyvD9U016A';
var ssUrl = 'https://spreadsheets.google.com/feeds/list/' + ssId + '/od6/public/values?&alt=json';
var numEntries = 25;
console.log(numEntries);

var pkMode = 0;
var veganMode = 0;

var bgColors = ['000000', '112F41', '068587', '4FB99F', 'F2B134', 'ED553B'];
var currentColor = 3;

function queryDb(index) {
  
  $.getJSON(ssUrl, function(data){
    // index = 0 --> row 2 (array starts after header row)
    var resultObject = {
      idNum: data.feed.entry[index].gsx$id.$t,
      venue: data.feed.entry[index].gsx$venue.$t
    };

    numEntries = data.feed.entry[0].gsx$count.$t;
    console.log(numEntries);

    var newSuggestion = resultObject.venue;
    $('.suggestion').html(newSuggestion);
    $('.foursquare').html('<a href="http://foursquare.com/venue/' +resultObject.idNum + '"><div class="venueLink">4sq</div></a>');
  });
}

function changeBg(colorIndex) {
  $('body').css('background-color', '#'+bgColors[colorIndex]);
  $('.foursquare').css('color', '#'+bgColors[colorIndex]);
}

$(document).ready(function() {
  // run sample query (parameters in foursquare.js)
  // foursquare.init();

  var numEntries = 5;
  var randEntry = 1 + Math.floor(Math.random() * numEntries);
  // queryDb(randEntry);

  $('.suggestion').click(function() {
    $('.suggestion').html('still something');
    $('.foursquare').css('visibility', 'hidden');
    randEntry = 1 + Math.floor(Math.random() * numEntries);
    // queryDb(randEntry);

    if (pkMode === 0) {
      currentColor = Math.floor(1 + Math.random() * (bgColors.length));
      changeBg(currentColor);
    }
    
    $('.foursquare').css('visibility', 'visible');
  });

  $('.veg-click').click(function() {
    
    if (veganMode === 0) {
      veganMode = 1;
      $('.scroll').css('top', '0%'); // open and close alert
      $('.alert').html('VEGAN MODE!!!!!'); // change alert messaging
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
      // turn on a query select and re-search
    } else {
      veganMode = 0;
      $('.scroll').css('top', '0%'); // open and close alert
      $('.alert').html('vegan mode deactivated'); // change alert messaging
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
      // turn off a query select and re-search
    }
    
  });

  $('.pk-click').click(function() {
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
