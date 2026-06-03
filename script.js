async function handleGenerate() {
    const prompt = document.getElementById('promptInput').value;
    const outputArea = document.getElementById('outputArea');
    const generateBtn = document.getElementById('generateBtn');

    generateBtn.innerText = "RUNNING FAST NEURAL GRID PIPELINE...";
    
    // Replace YOUR_API_URL with your actual backend link
    try {
        const response = await fetch('YOUR_API_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        
        outputArea.innerHTML = `
            <div class="output-card">
                <h3>HIGH-RES OUTPUT MANIFEST</h3>
                <img src="${data.url}" alt="Generated Image" />
            </div>
        `;
        generateBtn.innerText = "COMPILING FAST HD PIXELS...";
    } catch (error) {
        outputArea.innerHTML = `<p>Error connecting to server.</p>`;
        generateBtn.innerText = "COMPILING FAST HD PIXELS...";
    }
}
