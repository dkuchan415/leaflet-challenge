
//Create variable for map

function createMap(myMarkerLayer) {

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

var legend = L.control({position: 'bottomright'});

//Add legend- from Leaflet documentation

function getColor(d) {
    return d > 90  ? '#d73027' :
           d > 70  ? '#fc8d59' :
           d > 50   ? '#fee08b' :
           d > 30   ? '#d9ef8b' :
           d > 10   ? '#91cf60' :
                      '#1a9850';
}

//Create legend- from leaflet documentation

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        depths = [-10, 10, 30, 50, 70, 90],
        labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

// var legend = L.control({position: 'bottomright'});

myMarkerLayer.addTo(myMap);
// legend.addTo(myMap)
console.log(myMarkerLayer);

//Add layer control to the map

// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

}


//Create variable for json url (Earthquakes over 1.0 past day)

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"


//Grab the data with d3

function createMarkers(response) {
    function getColor(d) {
        return d > 90  ? '#d73027' :
               d > 70  ? '#fc8d59' :
               d > 50   ? '#fee08b' :
               d > 30   ? '#d9ef8b' :
               d > 10   ? '#91cf60' :
                          '#1a9850';
    }
    console.log(response);
    var earthquakes = response.features;

    var markers = [];

    for (var i = 0; i < response.features.length; i++) {
        //Set the earthquake location property to a variable
        var earthquake = earthquakes[i];
        console.log(earthquake);
        if (earthquake) {
            var marker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
                fillColor: getColor(earthquake.geometry.coordinates[2]),
                color: getColor(earthquake.geometry.coordinates[2]),
                fillOpacity: 0.75,
                radius: (earthquake.properties.mag*50000)
            })
            //Add magnitude as Size: earthquake.properties.mag
            .bindPopup("<h3>Location:" + earthquake.properties.place +"<h4>Magnitude: " + earthquake.properties.mag + "<h4>Depth: " + earthquake.geometry.coordinates[2]);
            markers.push(marker);
            //Add depth of earthquake as color: earthquake.geometry.coordinates[2]
        }
    }

    createMap(L.layerGroup(markers));
}

//Office hours: why do we sometimes add a layer and other times not

d3.json(url, createMarkers);
