
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
  return {
    marker: _setMarker(_latLng, false, mapInstance, true, null),
    mapInstance: mapInstance
  };
};

let _setMarker = function (loc, isCab, mapInstance, isCenter, label) {
  let _markers = [];
  let cabIconSize = new google.maps.Size(24, 24);
  if (loc) {
    if (isCab && isCab === true) {
      let _i = {
        url: 'http://maps.google.com/mapfiles/kml/shapes/cabs.png',
        scaledSize: cabIconSize,
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      };
      let _m = new google.maps.Marker({position: loc, map: mapInstance,
        scaledSize: cabIconSize,
        icon: _i });
      if (label && label !== '') {
        _m.setTitle(label);
      }
      _markers.push(_m);
    } else {
      let _m = new google.maps.Marker({position: loc, map: mapInstance});
      if (label && label !== '') {
        _m.setTitle(label);
      }
      _markers.push(_m);
    }
    // centering?
    if (isCenter && isCenter === true) {
      //mapInstance.panTo(loc);
    }
  }
  return _markers;
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

let _setMap2FitAllMarkers = function (markers, mapInstance) {
  let latlngbounds = new google.maps.LatLngBounds();
  markers.forEach(function (_m) {
    latlngbounds.extend(_m.position);
  });
  mapInstance.setCenter(latlngbounds.getCenter());
  mapInstance.fitBounds(latlngbounds);
};
