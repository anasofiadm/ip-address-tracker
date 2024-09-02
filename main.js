// Initialize the map globally
let map;

// Function to initialize the map
function initializeMap(lat, lng) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 13); // Set initial view with provided coordinates

        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
}

// Function to update the map based on latitude and longitude
function updateMap(lat, lng) {
    if (map) {
        // Update the existing map view
        map.setView([lat, lng], 13); // Zoom level set to 13 for city view
        L.marker([lat, lng]).addTo(map)
            //.bindPopup('<b>Location:</b><br>This is the new location.')
            .openPopup();
    } else {
        // Initialize the map with the coordinates
        initializeMap(lat, lng);
    }
}

// Function to fetch and display IP info
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
            const lat = data.location.lat; // Assuming the API provides latitude
            const lng = data.location.lng; // Assuming the API provides longitude

            // Alert the latitude and longitude
            alert(`Latitude: ${lat}, Longitude: ${lng}`);

            // Update the HTML elements with the data
            document.getElementById('ipAddress').innerText = `${ip}`;
            document.getElementById('location').innerText = `${location}`;
            document.getElementById('timeZone').innerText = `${timezone}`;
            document.getElementById('isp').innerText = `${isp}`;

            // Update the map with the new location
            updateMap(lat, lng);
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            alert('Failed to retrieve data. Please check your input or try again later.');
        });
}

// Fetch and display user's IP info on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchIpInfo(); // Fetch info for client's public IP address
});

// Handle the search functionality
document.getElementById('searchIp').addEventListener('click', function() {
    const ipAddress = document.getElementById('ipInput').value.trim(); // Get IP address from input
    if (!ipAddress) {
        alert('Please enter an IP address or domain.');
        return;
    }
    fetchIpInfo(ipAddress); // Fetch and display data for the entered IP address
});
