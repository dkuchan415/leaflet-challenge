
//Create variable for map

var myMap = L.map("mapid", {
    center: [39.82, -98.58],
    zoom: 5
});


// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

//Create variable for json url (Earthquakes over 1.0 past day)

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"

//Grab the data with d3

d3.json(url, function(response) {
    var markers = L.markerClusterGroup();

    for (var i = 0; i < response.length; i++) {
        //Set the data location property to a variable
        var location = response[i].features.geometry;

        if (location) {
            markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
            .bindPopup(response[i].features.title));
        }
    }

    myMap.addLayer(markers);
})
