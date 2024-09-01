document.getElementById('searchIp').addEventListener('click', function() {
    const apiKey = 'at_TJFsnxUNfBaLGIQ3PM51EcVM0LkBV';
    const ipAddress = document.getElementById('ipInput').value || ''; // Get the IP address from input or default to client's IP
    
    // API endpoint with query parameters
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    
    // Fetch the data from the API
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
            const domains = data.domains ? data.domains.join(', ') : 'No domains found';
            
            // Display the information in an alert
            alert(`IP Address: ${ip}\nCountry: ${country}\nRegion: ${region}\nTimezone: ${timezone}\nISP: ${isp}\nDomains: ${domains}`);
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            alert('Failed to retrieve data.');
        });
});
