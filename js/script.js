var ssId = '1w6ZWjyqVbbbs0MOUEW6qAUNhx4uG5Am_6XyvD9U016A';
var ssUrl = 'https://spreadsheets.google.com/feeds/list/' + ssId + '/od6/public/values?&alt=json';

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

    var newSuggestion = resultObject.venue;
    $('#suggestion').html(newSuggestion);
    $('#suggestion').append('<a href="http://foursquare.com/venue/' +resultObject.idNum + '"><div class="venueLink">View on Foursquare</div></a>');
  });
}

$(document).ready(function() {
  // run sample query (parameters in foursquare.js)
  // foursquare.init();
  var numEntries = 5;
  var randEntry = Math.floor(Math.random() * numEntries);
  queryDb(randEntry);

  $('html').click(function() {
    randEntry = Math.floor(Math.random() * numEntries);
    queryDb(randEntry);
  });

  $('.veg').click(function() {
    console.log("VEGAN MODE!!!!!");
  });
});
