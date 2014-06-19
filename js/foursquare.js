var query = 'prosperity dumpling';

var foursquare = {
  clientId: 'BC0GH4ZVOGO23OQAFJDB1BGGRBTZMIWK1LGHQCJQZPRLSC32',
  clientSecret: 'CPHAC0KIOU3R3HSBOK3SMNRSW1URCWTCCVENIZ52DJ5ZR0G5',
  // search params
  momentLat: 40.720040,
  momentLong: -74.000189,
  searchRadius: 800,
  searchLimit: 20,
  foursquareVersion: 20140612,

  // category: food
  // https://developer.foursquare.com/categorytree
  category: '4d4b7105d754a06374d81259',
  search: function(query){
    // url reference:
    // https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD
    // https://api.foursquare.com/v2/venues/search?ll=40.720040,-74.000189&radius=800&query=dumplings&categoryId=4d4b7105d754a06374d81259&limit=20&intent=browse&client_id=BC0GH4ZVOGO23OQAFJDB1BGGRBTZMIWK1LGHQCJQZPRLSC32&client_secret=CPHAC0KIOU3R3HSBOK3SMNRSW1URCWTCCVENIZ52DJ5ZR0G5&v=20140612

    var url = 'https://api.foursquare.com/v2/venues/search';
        url += '?query=' + query;
        url += '&categoryId=' + this.category;
        url += '&ll=' + this.momentLat + ',' + this.momentLong;
        url += '&radius=' + this.searchRadius;
        url += '&limit=' + this.searchLimit;
        url += '&intent=' + "browse";
        url += '&client_id=' + this.clientId;
        url += '&client_secret=' + this.clientSecret;
        url += '&v=' + this.foursquareVersion;
        console.log('url: ' + url);

    $.getJSON(url, function(data){
      console.log("getting data...");
      var searchResults = data.response.venues;
      var resultTemplate = '<ul id="searchResults"></ul>';
      $('body').append(resultTemplate);
      $.each(searchResults, function(index, value) {
        // console.log(value);
        var resultItem = '<li><a class="searchItem" data-venueid="' + value.id + '" href="http://foursquare.com/venue/' +value.id + '">' + value.name + ' / ' + value.id + '</a></i>';
        $('#searchResults').append(resultItem);
      });
    });
  },

  init: function() {
    this.search(query);
  }
};
