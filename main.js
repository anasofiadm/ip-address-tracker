document.getElementById('searchIp').addEventListener('click', function() {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            alert(data.slip);
            
        })
        .catch(error => {
            console.error('Error fetching the advice:', error);
        });
});
