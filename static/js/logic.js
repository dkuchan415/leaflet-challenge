
//Create variable for map

function createMap(earthquakes) {

var myMap = L.map("mapid", {
    center: [39.82, -98.58],
    zoom: 4
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

//Add layer control to the map

// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

}


//Create variable for json url (Earthquakes over 1.0 past day)

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"

//Grab the data with d3

function createMarkers(response) {
    console.log(response);
    var earthquakes = L.geoJSON(response.features);
    console.log(earthquakes);

    var markers = [];

    for (var i = 0; i < response.features.length; i++) {
        //Set the earthquake location property to a variable
        var earthquake = L.geoJSON(earthquakes[i]);
        console.log(earthquake);
        if (earthquake) {
            var marker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[1]])
            .bindPopup("<h3>Location:" + earthquake.properties.place);
            markers.push(marker);
            console.log(markers);
            //Add magnitude as Size: earthquake.properties.mag
            //Add depth of earthquake as color: earthquake.geometry.coordinates[2]
        }
    }

    createMap(L.layerGroup(markers));
}

//Office hours: why do we sometimes add a layer and other times not

d3.json(url, createMarkers);
