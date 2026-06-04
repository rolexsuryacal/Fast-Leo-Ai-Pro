/**
 * Fast LEO AI Pro - High-Speed Real-Time Generation Logic
 * Engine Core: React 18 & FLUX Neural Engine Integration Router
 */

const SAMPLE_GALLERY = [
    {
        id: 1,
        prompt: "A majestic golden lion wearing a futuristic cyber crown, neon lighting, highly detailed, 4k",
        url: "https://gen.pollinations.ai/prompt/A%20majestic%20golden%20lion%20wearing%20a%20futuristic%20cyber%20crown?model=flux&width=1024&height=1024&seed=42"
    }
];

function FastLeoAiApp() {
    const [promptText, setPromptText] = React.useState('');
    const [aspectRatio, setAspectRatio] = React.useState('1:1');
    const [generationStyle, setGenerationStyle] = React.useState('Hyper-Realistic RAW Portrait');
    const [galleryQueue, setGalleryQueue] = React.useState(SAMPLE_GALLERY);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const triggerImageGeneration = async (e) => {
        e.preventDefault();
        if (!promptText.trim()) {
            alert("Please type an image description blueprint first.");
            return;
        }

        setIsGenerating(true);

        let width = 1024;
        let height = 1024;
        if (aspectRatio === '16:9') { width = 1280; height = 720; }
        if (aspectRatio === '9:16') { width = 720; height = 1280; }
        
        const structuralRandomSeed = Math.floor(Math.random() * 9999999);
        const speedStyleModifier = `, masterpiece photo, 8k resolution, ${generationStyle}`;
        const cleanEncodedPrompt = encodeURIComponent(promptText + speedStyleModifier);
        
        // Use updated Gen endpoint
        const operationalLiveImageUrl = `https://gen.pollinations.ai/prompt/${cleanEncodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${structuralRandomSeed}&model=flux`;

        // AbortController setup to handle Android network timeouts
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s limit

        try {
            const response = await fetch(operationalLiveImageUrl, { signal: controller.signal });
            
            if (response.ok) {
                const newlySynthesizedAsset = {
                    id: Date.now(),
                    prompt: promptText,
                    url: operationalLiveImageUrl
                };
                setGalleryQueue(currentHistory => [newlySynthesizedAsset, ...currentHistory]);
            } else {
                throw new Error("Server rejected request");
            }
        } catch (error) {
            alert("AI Engine timed out or connection failed. Please try again with a simpler prompt.");
        } finally {
            clearTimeout(timeoutId);
            setIsGenerating(false);
            setPromptText('');
        }
    };

    const downloadImageHD = async (imageUrl) => {
        try {
            const responseData = await fetch(imageUrl);
            const imageBlob = await responseData.blob();
            const localBlobUrl = URL.createObjectURL(imageBlob);
            const downloadAnchor = document.createElement('a');
            downloadAnchor.href = localBlobUrl;
            downloadAnchor.download = `LEO_HD_${Date.now()}.jpg`;
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            document.body.removeChild(downloadAnchor);
            URL.revokeObjectURL(localBlobUrl);
        } catch (error) {
            window.open(imageUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen">
            <header>
                <h1>⚡ FAST LEO AI PRO</h1>
            </header>

            <main>
                <form onSubmit={triggerImageGeneration}>
                    <h2>Turbo Workspace</h2>
                    <textarea 
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        placeholder="Describe your vision..." 
                    />
                    <div className="ratio-bar">
                        {['1:1', '16:9', '9:16'].map((ratio) => (
                            <button 
                                type="button" 
                                key={ratio} 
                                onClick={() => setAspectRatio(ratio)}
                                className={`ratio-btn ${aspectRatio === ratio ? 'active' : ''}`}
                            >
                                {ratio}
                            </button>
                        ))}
                    </div>
                    <button type="submit" disabled={isGenerating}>
                        {isGenerating ? '⚡ Compiling...' : '⚡ Generate Fast Image'}
                    </button>
                </form>

                {isGenerating && <div className="loader-box">🔄 Running Neural Pipeline...</div>}

                <div className="output-panel">
                    {galleryQueue.map((item) => (
                        <div key={item.id} className="card">
                            <img src={item.url} alt={item.prompt} />
                            <div className="action-box">
                                <button onClick={() => downloadImageHD(item.url)} className="action-btn dl-btn">
                                    Download HD 📥
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const rootEngineInstance = ReactDOM.createRoot(rootElement);
    rootEngineInstance.render(<FastLeoAiApp />);
}
