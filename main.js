// Function to fetch and display IP info
function fetchIpInfo(ipAddress = '') {
    const apiKey = 'at_TJFsnxUNfBaLGIQ3PM51EcVM0LkBV';
    // Default URL uses client's public IP address if no IP is provided
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check the full response in the console
            
            // Extract relevant data
            const ip = data.ip;
            const country = data.location.country;
            const region = data.location.region;
            const timezone = data.location.timezone;
            const isp = data.isp;
            const location = `${country}, ${region}`;
            
            // Update the HTML elements with the data
            document.getElementById('ipAddress').innerText = `${ip}`;
            document.getElementById('location').innerText = `${location}`;
            document.getElementById('timeZone').innerText = `${timezone}`;
            document.getElementById('isp').innerText = `${isp}`;
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            alert('Failed to retrieve data.');
        });
}

// Fetch and display user's IP info on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchIpInfo(); // No IP address provided, so it will use the client's public IP
});

// Handle the search functionality
document.getElementById('fetchIpInfo').addEventListener('click', function() {
    const ipAddress = document.getElementById('ipInput').value.trim(); // Get IP address from input
    fetchIpInfo(ipAddress); // Fetch and display data for the entered IP address
});
