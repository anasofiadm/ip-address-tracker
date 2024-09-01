// Function to fetch and display IP info
function fetchIpInfo(ipAddress = '') {
    const apiKey = 'at_TJFsnxUNfBaLGIQ3PM51EcVM0LkBV';
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check the full response in the console
            
            // Extract relevant data
            const ip = data.ip || 'N/A';
            const country = data.location.country || 'N/A';
            const region = data.location.region || 'N/A';
            const timezone = data.location.timezone || 'N/A';
            const isp = data.isp || 'N/A';
            const location = `${country}, ${region}`;
            
            // Update the HTML elements with the data
            document.getElementById('ipAddress').innerText = `IP Address: ${ip}`;
            document.getElementById('location').innerText = `Location: ${location}`;
            document.getElementById('timeZone').innerText = `Time Zone: ${timezone}`;
            document.getElementById('isp').innerText = `ISP: ${isp}`;
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            alert('Failed to retrieve data.');
        });
}

// Fetch and display user's IP info on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchIpInfo(); // Fetch info for client's public IP address
});

// Handle the search functionality
document.getElementById('fetchIpInfo').addEventListener('click', function() {
    const ipAddress = document.getElementById('ipInput').value.trim(); // Get IP address from input
    fetchIpInfo(ipAddress); // Fetch and display data for the entered IP address
});
