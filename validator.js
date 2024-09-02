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
