let apikey = 'f4d3e21d4fc14954a1d5930d4dde3809'

let markerClusters = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true
});

let baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
});

let map = L.map('map', {
  center: [10.0, 5.0],
  minZoom: 2,
  zoom: 2,
  layers: [baseLayer, markerClusters]
});

let myURL = jQuery('script[src$="index2.js"]').attr('src').replace('index2.js', '');

async function fetchCountries() {
  const apiData = await fetch('http://localhost:3000/v1/powerplants/countries');
  const countries = await apiData.json();
  addOptions(countries.data, 'countries');
}

async function fetchFueltypes() {
  const apiData = await fetch('http://localhost:3000/v1/powerplants/fueltypes');
  const fueltypes = await apiData.json();
  addOptions(fueltypes.data, 'plantsType');
}

async function fetchMarkerData() {
  let country = document.getElementById('countries').value;
  let fueltype = document.getElementById('plantsType').value;
  let apiData;

  if (country != 'All' && fueltype == 'All') {
    apiData = await fetch(`http://localhost:3000/v1/powerplants/country/${country}`);
  } else if (country == 'All' && fueltype != 'All') {
    apiData = await fetch(`http://localhost:3000/v1/powerplants/fueltype/${fueltype}`);
  } else if (country != 'All' && fueltype != 'All') {
    apiData = await fetch(`http://localhost:3000/v1/powerplants/both/${country}/${fueltype}`);
  } else {
    apiData = await fetch(`http://localhost:3000/v1/powerplants`);
  }
  const markerData = await apiData.json();
  addMarkers(markerData.data);
}

function addOptions(data, id) {
  let select = document.getElementById(id);
  if (id == 'countries') {
    data.forEach(element => {
      let option = document.createElement("option");
      option.text = element.countryname;
      option.value = element.countrycode;
      select.appendChild(option);
    });
  } else {
    data.forEach(element => {
      let option = document.createElement("option");
      option.text = element.fueltypes;
      option.value = element.fueltypes;
      select.appendChild(option);
    });
  }
}

function addMarkers(markers) {
  let layerGroup = [];
  markerClusters.clearLayers();
  markers.forEach(marker => {
    var popup = marker.name +
      '<br/>' + marker.countryname +
      '<br/><b>Capacity: -</b> ' + marker.capacity + ' MW' +
      '<br/><b>Primary Fuel: -</b> ' + marker.primaryfuel;
    layerGroup.push(bindMarker(marker, popup, `../Icons/${marker.primaryfuel}.png`));
  });
  markerClusters.addLayer(L.layerGroup(layerGroup));
}

function bindMarker(marker, popup, path) {
  var m = L.marker([marker.geometry[1], marker.geometry[0]], {
    icon: L.icon({
      iconUrl: myURL + path,
      shadowUrl: "",
      iconSize: [35, 35],
      iconAnchor: [9, 21],
      popupAnchor: [0, -14]
    })
  })
    .bindPopup(popup);
  return m;
}

fetchCountries();
fetchFueltypes();
fetchMarkerData();