async function generateImage(prompt, isRegenerate = false) {
    const root = document.getElementById('root');
    const startTime = Date.now();
    
    // UI: Status message using your design classes
    root.innerHTML = `<p id="timer" class="status-message">Generating... 0 seconds</p>`;
    
    const timerInterval = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.innerText = `Generating... ${seconds} seconds elapsed`;
        }
    }, 1000);

    try {
        const response = await fetch('YOUR_URL_HERE', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                prompt: prompt, 
                model: 'flux-schnell', 
                num_inference_steps: 15 
            })
        });

        clearInterval(timerInterval);
        
        if (response.ok) {
            const data = await response.json();
            const totalTime = Math.floor((Date.now() - startTime) / 1000);
            
            root.innerHTML = `
                <div class="output-card">
                    <img src="${data.url}" class="generated-image" alt="Generated Image" />
                    <p class="time-meta">Generated in ${totalTime} seconds</p>
                    <button class="regen-btn" onclick="generateImage('${prompt}', true)">Regenerate</button>
                </div>
            `;
        } else {
            root.innerHTML = `<p class="error-msg">Server error. <button onclick="location.reload()">Try Again</button></p>`;
        }
    } catch (error) {
        clearInterval(timerInterval);
        root.innerHTML = `<p class="error-msg">Error: Connection failed. <button onclick="location.reload()">Retry</button></p>`;
    }
}
