async function fetchMarkerData() {
  const apiData = await fetch('http://localhost:3000/v1/user');
  const markerData = await apiData.json();
  // console.log(markerData.data);
  // const obj = { oldKey: 'value' };
  // console.log(markerData);
  addMarkers(markerData.data);
}
fetchMarkerData()

var map = L.map('map', {
  center: [10.0, 5.0],
  minZoom: 2,
  zoom: 2
});
var myURL = jQuery('script[src$="index2.js"]').attr('src').replace('index2.js', '');

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo(map);

var apikey = 'f4d3e21d4fc14954a1d5930d4dde3809'
var markerClusters = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true
});

markerClusters.on('clusterclick', function (a) {
  console.log('Cluster Clicked:' + a);
});
markerClusters.on('click', function (a) {
  console.log('Marker Clicked:' + a);
});


function addMarkers(markers) {
  markers.forEach(marker => {
    var m;
    var popup = marker.name +
      '<br/>' + marker.country_name +
      '<br/><b>Capacity: -</b> ' + marker.capacity +
      '<br/><b>Primary Fuel: -</b> ' + marker.primaryfuel;
      // m = bindMarker(marker, popup, 'mapbox-icon.png')
    // if (marker.primaryfuel == "Hydro") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-hydro-60.png');
    // } else if (marker.primaryfuel == "Solar") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-solar-60.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-solar-60.png')"
    // } else if (marker.primaryfuel == "Gas") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-gas-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-gas-64.png')"
    // } else if (marker.primaryfuel == "Oil") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-oil-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-oil-64.png')"
    // } else if (marker.primaryfuel == "Wind") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-wind-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-wind-64.png')"
    // } else if (marker.primaryfuel == "Nuclear") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-nuclear-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-nuclear-64.png')"
    // } else if (marker.primaryfuel == "Coal") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-coal-100.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-coal-100.png')"
    // } else if (marker.primaryfuel == "Waste") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-wastes-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-wastes-64.png')"
    // } else if (marker.primaryfuel == "Biomass") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-biomass-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-biomass-64.png')"
    // } else if (marker.primaryfuel == "Wave and Tidal") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-sea-waves-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-sea-waves-64.png')"
    // } else if (marker.primaryfuel == "Petcoke") {
    //   m = bindMarker(marker, popup, '../Icons/pngwing.com.png');
    //   // el.style.backgroundImage = "url('../Icons/pngwing.com.png')"
    // } else if (marker.primaryfuel == "Geothermal") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-geothermal-energy-64.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-geothermal-energy-64.png')"
    // } else if (marker.primaryfuel == "Storage") {
    //   m = bindMarker(marker, popup, '../Icons/icons8-storage-50.png');
    //   // el.style.backgroundImage = "url('../Icons/icons8-storage-50.png')"
    // } else if (marker.primaryfuel == "Cogeneration") {
    //   m = bindMarker(marker, popup, '../Icons/power-plant.png');
    //   // el.style.backgroundImage = "url('../Icons/power-plant.png')"
    // } else {
    //   m = bindMarker(marker, popup, 'mapbox-icon.png');
    // }

    if(marker.primaryfuel == "Other") {
      m = bindMarker(marker, popup, 'mapbox-icon.png');
    } else {
      m = bindMarker(marker, popup, `../Icons/${marker.primaryfuel}.png`);
    }

    markerClusters.addLayer(m);
  });

  map.addLayer(markerClusters);
}

function bindMarker(marker, popup, path) {
  var m = L.marker([marker.geometry[1], marker.geometry[0]], {
    icon: L.icon({
      iconUrl: myURL + path,
      shadowUrl: "",
      // iconRetinaUrl: myURL + 'images/pin48.png',
      iconSize: [35, 35],
      iconAnchor: [9, 21],
      popupAnchor: [0, -14]
    })
  })
    .bindPopup(popup);
  return m;
}
