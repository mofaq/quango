function createMap(geo,address) {
  var options = {
    center: geo,
    zoom: 14,
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
      address[0] + "<br/>" +
      address[1] + "<br/>" +
      address[2] + "<br/>" +
      address[3] + "<br/>"
  });
  overlay.open(map,marker);
  return map;
}
