
let _setMapCenterWivMarker = function (store, mapInstance) {
  let _locationChosen = store.state.neighborhoodChosen;
  let _latLng = {
    lat: _locationChosen.lat,
    lng: _locationChosen.lng
  };
  mapInstance = new google.maps.Map(document.getElementById('_gmap_'), {
    // center of Singapore
    center: _latLng,
    zoom: 11
  });
  _setMarker(_latLng, false, mapInstance);
};

let _setMarker = function (loc, isCab, mapInstance) {
  let _markers = [];
  if (loc) {
    if (isCab && isCab === true) {
      _markers.push(new google.maps.Marker({position: loc, map: mapInstance,
        icon: 'http://maps.google.com/mapfiles/kml/shapes/cabs.png'}));
    } else {
      _markers.push(new google.maps.Marker({position: loc, map: mapInstance}));
    }
  }
};

let _getLatLngByAddress = async function (address, aK) {
  // parse address
  let _finalAddr = address.replace(' ', '+');
  let _promise = jQuery.Deferred();
  jQuery.when(jQuery.get('https://maps.googleapis.com/maps/api/geocode/json?address='+_finalAddr+'+singapore&key='+aK, {})).
  done(function (data) {
    _promise.resolve(data);
    // if you need to "wait"
    /*setTimeout(function () {
      _promise.resolve(data);
    }, 300);*/
  });
  return _promise.promise();
};

