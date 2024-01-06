console.log('hello')

/* 

What events will your application need?
- <select> element (details here https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
- Do we need any event handling for map interactions? i dont think so.. but good to keep in mind

What APIs will you need and in what order?
- Geoloaction API
- Leaflet
- Foursquare API (five nearest locations on the map)

How will you obtain the user's location?
- Geoloaction API - we'll request it from the user

How will you add the user's location to the map?
- we'll pass the right values from our Geolocation request to the map function we create
    - we'll grab the coodinates and pass those in as an argument for our function

How will you get the selected location from the user?
- using event listener on the <select> element in our HTML
    - Researching input events to see
     https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event

How will you add that information to the map?
- This requires tapping in to the Foursquare API - I've got some research to do!

*/

document.addEventListener('DOMContentLoaded', function () {
    let mapElement = document.getElementById('map');

    if (mapElement) {
        // Initialize Leaflet map
        let map = L.map(mapElement);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Use the 'map' variable, not 'mapElement', when setting the initial view
        map.locate({ setView: true, maxZoom: 16 });

        // Define a variable to store the marker
        let marker;

        // Define the onLocationFound function to handle location found events
        function onLocationFound(e) {
            // let radius = e.accuracy / 2;

            // Create a marker if it doesn't exist
            if (!marker) {
                marker = L.marker(e.latlng).addTo(map);
            }

            // Update the marker position and show a popup
            marker.setLatLng(e.latlng).bindPopup("You are here!").openPopup();
        }

        // Bind the onLocationFound function to the 'locationfound' event
        map.on('locationfound', onLocationFound);

    } else {
        console.error("Error: can't grab location");
    }
    });
   
