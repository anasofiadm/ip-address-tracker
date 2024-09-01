document.getElementById('searchIp').addEventListener('click', function() {
    fetch('https://geo.ipify.org/api/v2/country?apiKey=at_TJFsnxUNfBaLGIQ3PM51EcVM0LkBV&ipAddress=8.8.8.8')
        .then(response => response.json())
        .then(data => {
            alert(data.slip);
            
        })
        .catch(error => {
            console.error('Error fetching the advice:', error);
        });
});
