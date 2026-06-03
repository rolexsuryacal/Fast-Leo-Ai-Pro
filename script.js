async function generateImage(prompt, isRegenerate = false) {
    const root = document.getElementById('root');
    const startTime = Date.now();
    
    // UI: Status message that fits your current design
    root.innerHTML = `<p id="timer" class="status-message">Generating... 0 seconds</p>`;
    
    // Timer: Updates every second
    const timerInterval = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.innerText = `Generating... ${seconds} seconds elapsed`;
        }
    }, 1000);

    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 90000);

            // Fetch request with optimized speed settings
            const response = await fetch('YOUR_FLUX_SCHNELL_API_ENDPOINT', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: prompt,
                    model: 'flux-schnell',
                    num_inference_steps: 15 // Speed optimization
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            clearInterval(timerInterval);

            if (response.ok) {
                const data = await response.json();
                const totalTime = Math.floor((Date.now() - startTime) / 1000);
                
                // Display the image with your original design classes
                root.innerHTML = `
                    <img src="${data.url}" class="generated-image" alt="Generated Image" />
                    <p class="time-meta">Image generated in ${totalTime} seconds</p>
                    <button class="regen-btn" onclick="generateImage('${prompt}', true)">Regenerate</button>
                `;
                return;
            } else {
                throw new Error("Server error");
            }
        } catch (error) {
            console.log(`Attempt ${attempt} failed.`);
            if (attempt === maxRetries) {
                clearInterval(timerInterval);
                root.innerHTML = `<p class="error-msg">Error: Server busy. <button onclick="generateImage('${prompt}')">Try Again</button></p>`;
            }
        }
    }
}
