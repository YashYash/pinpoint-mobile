pinpoint.service('geoService', function($state, $http) {
	console.log('geoService loaded');

	this.getcurrAddress = function(text){
		console.log(text);	 

	  var setAddress = function(lat, lng) {
	    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=false';
	    $http.get(url).success(function(address) {
	      console.log(address);
	      console.log('picking the first address in the list');
	      console.log(address.results[0].formatted_address);
	      return address.results[0].formatted_address;
	    });
	  };

	  var showPosition = function(position) {
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    console.log('lat' + lat);
	    console.log('lon' + lng);
	    setAddress(lat, lng);
	  };

	  var showError = function(error) {
	    switch (error.code) {
	      case error.PERMISSION_DENIED:
	        var error = 'User denied the request for Geolocation.';
	        break;
	      case error.POSITION_UNAVAILABLE:
	        var error = 'Location information is unavailable.';
	        break;
	      case error.TIMEOUT:
	        var error = 'The request to get user location timed out.';
	        break;
	      case error.UNKNOWN_ERROR:
	        var error = 'An unknown error occurred.';
	        break;
	    }
	  };

	  var getLocation = function() {
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(showPosition, showError);
	    } else {
	      var error = 'Geolocation is not supported by this browser.';
	    }
	  };

	  getLocation();		   		
	};
});