function createMap(geo,address) {
  var options = {
    center: geo,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false
  };
  var canvas = document.getElementById('map_canvas');
  var map =  new google.maps.Map(canvas,options);
  map.panBy(0,-50);

  var marker = new google.maps.Marker({
    position: geo,
    map: map,
    title: "Stuff marker"
  });

  var overlay = new google.maps.InfoWindow({
    content: "<p style = \"color:black\">" +
      address[0] + "</p>"
  });
  overlay.open(map,marker);
  return map;
}
