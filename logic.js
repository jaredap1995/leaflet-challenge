// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 5
  });

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function markerSize(magnitude) {
    return magnitude * 5;
};

function chooseColor(depth) {
    if (depth<10) return "green";
    else if (depth <30) return "yellowgreen";
    else if (depth <50) return "gold";
    else if (depth < 70) return "orange";
    else if (depth<90) return "orangered";
    else return "red";
};


d3.json(link).then(function(data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latLng) {
            return L.circleMarker(latLng,{
                radius: markerSize(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
                } );
        },

        onEachFeature: function(feature, layer) {
            return layer.bindPopup('<h3>' + feature.properties.place + 
            '</h3><hr><p>' + new Date(feature.properties.time) + 
            '</p><p>Magnitude:' + feature.properties.mag +
             '</p>Depth: ' + feature.geometry.coordinates[2] + '</p>');
        }
    }).addTo(myMap);


    // Set up the legend.
    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (){
    let div = L.DomUtil.create('div', 'info legend');
    let grades = [-10, 10, 30, 50, 70, 90];
    let labels = ["Very Shallow", "Shallow", "Intermediate", "Moderately Deep", "Deep", "Very Deep"];

    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
      '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] :'+') +
      ' : ' + labels[i] + '<br>';
    }
    return div;
};

    legend.addTo(myMap);
});