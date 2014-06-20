var ssId = '1w6ZWjyqVbbbs0MOUEW6qAUNhx4uG5Am_6XyvD9U016A';
var ssUrl = 'https://spreadsheets.google.com/feeds/list/' + ssId + '/od6/public/values?&alt=json';
var numEntries = 25;
console.log(numEntries);

var pkMode = 0;
var veganMode = 0;

function queryDb(index) {
  
  $.getJSON(ssUrl, function(data){
    // index = 0 --> row 2 (array starts after header row)
    // console.log(data.feed.entry[index].gsx$id.$t);
    // console.log(data.feed.entry[index].gsx$venue.$t);
    // console.log(data.feed.entry[index].gsx$vegan.$t);
    
    var resultObject = {
      idNum: data.feed.entry[index].gsx$id.$t,
      venue: data.feed.entry[index].gsx$venue.$t
    };

    numEntries = data.feed.entry[0].gsx$count.$t;
    console.log(numEntries);

    var newSuggestion = resultObject.venue;
    $('.suggestion').html(newSuggestion);
    $('.suggestion').append('<a href="http://foursquare.com/venue/' +resultObject.idNum + '"><div class="venueLink">View on Foursquare</div></a>');
  });
}

$(document).ready(function() {

  // run sample query (parameters in foursquare.js)
  // foursquare.init();
  // var numEntries = 5;
  var randEntry = 1 + Math.floor(Math.random() * numEntries);
  queryDb(randEntry);

  $('.suggestion').click(function() {
    $('.suggestion').html('');
    randEntry = 1 + Math.floor(Math.random() * numEntries);
    queryDb(randEntry);
  });

  $('.veg-click').click(function() {
    
    if (veganMode === 0) {
      veganMode = 1;
      console.log('VEGAN MODE!!!!!');
      // open and close alert
      $('.scroll').css('top', '0%');
      // change alert messaging
      $('#panel-1>h2').html('ACTIVATED');
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
      // turn on a query select and re-search
    } else {
      veganMode = 0;
      console.log('vegan mode deactivated');
      // open and close alert
      $('.scroll').css('top', '0%');
      // change alert messaging
      $('#panel-1>h2').html('DEACTIVATED');
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
      // turn off a query select and re-search
    }
    

  });

  $('.pk-click').click(function() {
    if (pkMode === 0) {
      pkMode = 1;
      console.log('PK mode');
      // open and close alert
      $('.scroll').css('top', '-200%');
      // change alert messaging
      $('#panel-3>h2').html('ACTIVATED');
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
    } else {
      pkMode = 0;
      console.log('PK mode deactivated');
      // open and close alert
      $('.scroll').css('top', '-200%');
      // change alert messaging
      $('#panel-3>h2').html('DEACTIVATED');
      setTimeout(function() {
        $('.scroll').css('top', '-100%');
      }, 1000);
    }
  });

});
