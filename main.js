// Function to fetch and display IP info
function fetchIpInfo(ipAddress = '') {
    const apiKey = 'at_TJFsnxUNfBaLGIQ3PM51EcVM0LkBV';
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Show an alert if the response is not ok
                alert(`Error: ${response.statusText}`);
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            // Check if the data contains the necessary fields
            if (!data.ip || !data.location || !data.isp) {
                alert('Error: No data found for the provided IP address.');
                return;
            }
            
            // Extract relevant data
            const ip = data.ip || 'N/A';
            const country = data.location.country || 'N/A';
            const region = data.location.region || 'N/A';
            const timezone = data.location.timezone || 'N/A';
            const isp = data.isp || 'N/A';
            const location = `${country}, ${region}`;
            
            // Update the HTML elements with the data
            document.getElementById('ipAddress').innerText = `${ip}`;
            document.getElementById('location').innerText = `${location}`;
            document.getElementById('timeZone').innerText = `${timezone}`;
            document.getElementById('isp').innerText = `${isp}`;
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
