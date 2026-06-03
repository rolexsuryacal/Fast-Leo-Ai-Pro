/**
 * Fast LEO AI Pro - High-Speed Real-Time Generation Logic
 * Engine Core: React 18 & FLUX Neural Engine Integration Router
 */

const SAMPLE_GALLERY = [
    {
        id: 1,
        prompt: "A majestic golden lion wearing a futuristic cyber crown, neon lighting, highly detailed, 4k",
        url: "https://image.pollinations.ai/prompt/A%20majestic%20golden%20lion%20wearing%20a%20futuristic%20cyber%20crown,%20neon%20lighting,%20highly%20detailed,%204k?width=1024&height=1024&nologo=true&seed=42&model=flux"
    }
];

function FastLeoAiApp() {
    const [promptText, setPromptText] = React.useState('');
    const [aspectRatio, setAspectRatio] = React.useState('1:1');
    const [generationStyle, setGenerationStyle] = React.useState('Hyper-Realistic RAW Portrait');
    const [galleryQueue, setGalleryQueue] = React.useState(SAMPLE_GALLERY);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const triggerImageGeneration = (e) => {
        e.preventDefault();
        if (!promptText.trim()) {
            alert("Please type an image description blueprint first.");
            return;
        }

        setIsGenerating(true);

        // Map dimensions to strict HD outputs
        let width = 1024;
        let height = 1024;
        if (aspectRatio === '16:9') { width = 1280; height = 720; }
        if (aspectRatio === '9:16') { width = 720; height = 1280; }
        
        const structuralRandomSeed = Math.floor(Math.random() * 9999999);
        const speedStyleModifier = `, masterpiece photo, 8k resolution, flawless premium details, ${generationStyle}`;
        const cleanEncodedPrompt = encodeURIComponent(promptText + speedStyleModifier);
        
        // Accelerated FLUX engine processing gateway pipeline
        const operationalLiveImageUrl = `https://image.pollinations.ai/prompt/${cleanEncodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${structuralRandomSeed}&model=flux&enhance=false`;

        const preloadingImageInstance = new Image();
        preloadingImageInstance.src = operationalLiveImageUrl;
        
        preloadingImageInstance.onload = () => {
            const newlySynthesizedAsset = {
                id: Date.now(),
                prompt: promptText,
                url: operationalLiveImageUrl
            };
            
            setGalleryQueue(currentHistory => [newlySynthesizedAsset, ...currentHistory]);
            setIsGenerating(false);
            setPromptText('');
        };

        preloadingImageInstance.onerror = () => {
            alert("AI Engine network timeout. Please try again.");
            setIsGenerating(false);
        };
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
                <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold', marginTop: '4px', letterSpacing: '0.1em' }}>
                    ⚡ TURBO FLUX HD CORE ACTIVATED
                </div>
            </header>

            <main>
                <form onSubmit={triggerImageGeneration}>
                    <h2>Turbo Workspace</h2>
                    
                    <label style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Describe Your Image
                    </label>
                    <textarea 
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        placeholder="Example: A matte black sports car racing in deep space neon rings..." 
                    />

                    <label style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Aspect Ratio
                    </label>
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

                    <label style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Neural Style Template
                    </label>
                    <select value={generationStyle} onChange={(e) => setGenerationStyle(e.target.value)}>
                        <option>Hyper-Realistic RAW Portrait</option>
                        <option>Cinematic 3D Render</option>
                        <option>Anime Cyberpunk Masterpiece</option>
                    </select>

                    <button type="submit" disabled={isGenerating}>
                        {isGenerating ? '⚡ Compiling Fast HD Pixels...' : '⚡ Generate Fast Image'}
                    </button>
                </form>

                {isGenerating && (
                    <div className="loader-box">
                        🔄 Running Fast Neural Grid Pipeline...
                    </div>
                )}

                <div className="output-panel">
                    <h2>High-Res Output Manifest</h2>
                    {galleryQueue.map((item) => (
                        <div key={item.id} className="card">
                            <img src={item.url} alt={item.prompt} />
                            <div className="action-box">
                                <a href={item.url} target="_blank" rel="noreferrer" className="action-btn">
                                    Preview Full ↗
                                </a>
                                <button onClick={() => downloadImageHD(item.url)} className="action-btn dl-btn">
                                    Download HD 📥
                                </button>
                            </div>
                            <p style={{ padding: '0 12px 12px 12px', margin: 0, fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
                                "{item.prompt}"
                            </p>
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
