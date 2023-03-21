async function fetchMarkerData() {
    const apiData = await fetch('http://localhost:3000/v1/user');
    const markerData = await apiData.json();
    console.log(markerData.data);
    // const obj = { oldKey: 'value' };
    // console.log(markerData);
    addMarkers(markerData.data);
}
fetchMarkerData()

function addMarkers(markerData) {

    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zc29zYW4iLCJhIjoiY2xlY29oc2QwMDBiZDN0czd4YW1oY3gyNiJ9.Al54k67yBZx2nJkJI_2cyQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: markerData[0].geometry, // starting position [lng, lat]
        zoom: 3 // starting zoom
    });

    markerData.forEach(marker => {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        if (marker.primaryfuel == "Hydro") {
            el.style.backgroundImage = "url('../Icons/icons8-hydro-60.png')"
        } else if (marker.primaryfuel == "Solar") {
            el.style.backgroundImage = "url('../Icons/icons8-solar-60.png')"
        } else if (marker.primaryfuel == "Gas") {
            el.style.backgroundImage = "url('../Icons/icons8-gas-64.png')"
        } else if (marker.primaryfuel == "Oil") {
            el.style.backgroundImage = "url('../Icons/icons8-oil-64.png')"
        } else if (marker.primaryfuel == "Wind") {
            el.style.backgroundImage = "url('../Icons/icons8-wind-64.png')"
        } else if (marker.primaryfuel == "Nuclear") {
            el.style.backgroundImage = "url('../Icons/icons8-nuclear-64.png')"
        } else if (marker.primaryfuel == "Coal") {
            el.style.backgroundImage = "url('../Icons/icons8-coal-100.png')"
        } else if (marker.primaryfuel == "Waste") {
            el.style.backgroundImage = "url('../Icons/icons8-wastes-64.png')"
        } else if (marker.primaryfuel == "Biomass") {
            el.style.backgroundImage = "url('../Icons/icons8-biomass-64.png')"
        } else if (marker.primaryfuel == "Wave and Tidal") {
            el.style.backgroundImage = "url('../Icons/icons8-sea-waves-64.png')"
        } else if (marker.primaryfuel == "Petcoke") {
            el.style.backgroundImage = "url('../Icons/pngwing.com.png')"
        } else if (marker.primaryfuel == "Geothermal") {
            el.style.backgroundImage = "url('../Icons/icons8-geothermal-energy-64.png')"
        } else if (marker.primaryfuel == "Storage") {
            el.style.backgroundImage = "url('../Icons/icons8-storage-50.png')"
        } else if (marker.primaryfuel == "Cogeneration") {
            el.style.backgroundImage = "url('../Icons/power-plant.png')"
        }

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h2>${marker.country_name}</h2><h3>${marker.name}</h3><h4>${marker.capacity}</h4><p>${marker.primaryfuel}</p>`
                    )
            )
            .addTo(map);
    });
}

