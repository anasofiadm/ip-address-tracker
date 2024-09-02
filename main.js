// Function to fetch and display IP info and initialize the map
function fetchIpInfo(ipAddress = '') {
    const apiKey = 'at_TJFsnxUNfBaLGIQ3PM51EcVM0LkBV';
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert(`Error: ${response.statusText}`);
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            if (!data.ip || !data.location || !data.isp) {
                alert('Error: No data found for the provided IP address.');
                return;
            }

            const ip = data.ip || 'N/A';
            const country = data.location.country || 'N/A';
            const region = data.location.region || 'N/A';
            const city = data.location.city || 'N/A';
            const timezone = data.location.timezone || 'N/A';
            const isp = data.isp || 'N/A';
            const location = `${city}, ${region}, ${country}`;

            // Fill the columns with the information
            document.getElementById('ipAddress').innerText = `${ip}`;
            document.getElementById('location').innerText = `${location}`;
            document.getElementById('timeZone').innerText = `${timezone}`;
            document.getElementById('isp').innerText = `${isp}`;

            // Use the city, region, and country to geocode and get lat/lng
            geocodeLocation(location);
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            alert('Failed to retrieve data. Please check your input or try again later.');
        });
}

// Function to geocode location using OpenStreetMap's Nominatim API
function geocodeLocation(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                updateMap(lat, lon); // Update the map with the geocoded coordinates
            } else {
                alert('Location not found on the map.');
                console.error('No geocoding results for the location:', location);
            }
        })
        .catch(error => {
            console.error('Error geocoding location:', error);
            alert('Failed to geocode location.');
        });
}

// Function to initialize or update the map
function updateMap(lat, lon) {
    if (window.map) {
        map.setView([lat, lon], 13); // If the map already exists, just update its view
        L.marker([lat, lon]).addTo(map)
            .bindPopup('<b>Your Location!</b><br>This is where you are.')
            .openPopup();
    } else {
        // Initialize the map for the first time
        window.map = L.map('map').setView([lat, lon], 13);

        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker at the geocoded location
        L.marker([lat, lon]).addTo(map)
            .bindPopup('<b>Your Location!</b><br>This is where you are.')
            .openPopup();
    }
}

// Fetch and display user's IP info and map on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchIpInfo(); // Fetch info for client's public IP address when the page loads
});

// Handle the IP search button click
document.getElementById('searchIp').addEventListener('click', () => {
    const ipInput = document.getElementById('ipInput').value;
    fetchIpInfo(ipInput); // Fetch info and update the map for the entered IP address
});
