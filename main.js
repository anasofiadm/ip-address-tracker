document.getElementById('ipInput').addEventListener('input', function(e) {
    const value = this.value;
    // Remove any invalid characters (allow only digits and dots)
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    // Update the input field with the sanitized value
    this.value = sanitizedValue;
    // Check if the input is valid
    const segments = sanitizedValue.split('.');
    let isValid = true;
    for (let i = 0; i < segments.length; i++) {
        if (segments[i] === '') continue; // Allow empty segments for incomplete input (e.g., "192.")
        const segmentValue = parseFloat(segments[i]);

        if (isNaN(segmentValue) || segmentValue <= 0) {
            isValid = false;
            break;
        }
    }
    if (!isValid || segments[0] <= 0) {
        alert("Invalid input. Make sure to enter numbers with dots, starting with a number greater than 0.");
    }
    
});


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
            const timezone = data.location.timezone || 'N/A';
            const isp = data.isp || 'N/A';
            const location = `${country}, ${region}`;
            const lat = data.location.lat;
            const lng = data.location.lng;
            
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

// Function to update the map
function updateMap(lat, lng) {
    const map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    L.marker([lat, lng]).addTo(map)
        .bindPopup('IP Location')
        .openPopup();
}

// Fetch and display user's IP info on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchIpInfo(); // Fetch info for client's public IP address when the page loads
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



// main.js

// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13); // Coordinates for London, zoom level 13

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('<b>Hello world!</b><br>I am a popup.')
    .openPopup();

// Add a circle
L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

// Add a polygon
L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map)
    .bindPopup('I am a polygon.');

