async function handleGenerate() {
    const prompt = document.getElementById('promptInput').value;
    const outputArea = document.getElementById('outputArea');
    const generateBtn = document.getElementById('generateBtn');

    if (!prompt) {
        alert("Please enter a prompt!");
        return;
    }

    generateBtn.innerText = "GENERATING...";

    try {
        // REPLACE 'YOUR_API_URL_HERE' with your actual endpoint
        const response = await fetch('YOUR_API_URL_HERE', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();

        // Assuming your API returns { url: "image_link_here" }
        outputArea.innerHTML = `
            <div class="output-card">
                <img src="${data.url}" alt="Generated Image" />
            </div>
        `;
    } catch (error) {
        console.error(error);
        outputArea.innerHTML = `<p style="color:red; text-align:center;">Error connecting to server. Please check your API URL.</p>`;
    } finally {
        generateBtn.innerText = "COMPILING FAST HD PIXELS...";
    }
}
