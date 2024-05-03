async function shortenUrl() {
    const urlInput = document.getElementById('url-input');
    const resultContainer = document.getElementById('result');
    
    const longUrl = urlInput.value.trim();

    if (!longUrl) {
        resultContainer.innerText = 'Please enter a valid URL.';
        return;
    }

    // API endpoint for URL shortening
    const apiEndpoint = 'https://api-ssl.bitly.com/v4/shorten';

    // API headers with the provided API key
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer c99570487e4ffe99ae77b63de8627bb6c67d62c2` // Replace with your actual API key
    };

    // Request body
    const requestBody = {
        long_url: longUrl
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const data = await response.json();
            const shortUrl = data.link; // The shortened URL

            resultContainer.innerText = `Shortened URL: ${shortUrl}`;
        } else {
            // Handle errors
            if (response.status === 403) {
                resultContainer.innerText = 'Error: Forbidden (Invalid API key or insufficient permissions).';
            } else {
                const errorData = await response.json();
                resultContainer.innerText = `Error: ${errorData.message}`;
            }
        }
    } catch (error) {
        resultContainer.innerText = `Error: ${error.message}`;
    }
}
