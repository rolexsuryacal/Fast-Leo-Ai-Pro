/**
 * Fast LEO AI - Pro Edition (Ultra-Fast FLUX Engine & HD Downloader)
 * Core: React 18 Engine & Direct High-Speed Neural Network Routing
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

        // Advanced HD Dimension Engine Map
        let width = 1024;
        let height = 1024;
        if (aspectRatio === '16:9') { width = 1280; height = 720; }
        if (aspectRatio === '9:16') { width = 720; height = 1280; }
        
        const structuralRandomSeed = Math.floor(Math.random() * 9999999);
        
        // Fast-composing style prompts to assist the AI router speed
        const speedStyleModifier = `, masterpiece photo, 8k resolution, flawless details, ${generationStyle}`;
        const cleanEncodedPrompt = encodeURIComponent(promptText + speedStyleModifier);
        
        // Premium High-Speed FLUX pipeline
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
            alert("AI Gateway temporary timeout. Tap generate again.");
            setIsGenerating(false);
        };
    };

    // Fast Mobile HD Image Downloader Routine
    const downloadImageHD = async (imageUrl, promptName) => {
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
            // Android mobile fallback browser popup option
            window.open(imageUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
            <header className="bg-slate-900/90 border-b border-amber-500/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 rounded-xl text-black font-black text-base shadow-lg shadow-amber-500/20">
                        LEO AI
                    </div>
                    <div>
                        <h1 className="text-xs font-black tracking-widest text-slate-100 uppercase">FAST LEO AI PRO</h1>
                        <p className="text-[9px] font-bold text-emerald-400 tracking-wider">⚡ TURBO FLUX HD CORE ACTIVATED</p>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-7xl w-full mx-auto p-4 grid gap-6 items-start">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-2xl">
                    <h2 className="text-xs font-black tracking-widest uppercase text-amber-500 pb-1.5 border-b border-slate-800">Turbo Workspace</h2>
                    
                    <form onSubmit={triggerImageGeneration} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400">Describe Your Image</label>
                            <textarea 
                                value={promptText}
                                onChange={(e) => setPromptText(e.target.value)}
                                placeholder="Example: A matte black sports car racing in deep space neon rings..." 
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-medium text-slate-200 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>

                        <div className="space-y-3.5 pt-2 border-t border-slate-800/60">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Aspect Ratio</span>
                                <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                                    {['1:1', '16:9', '9:16'].map((ratio) => (
                                        <button 
                                            type="button" 
                                            key={ratio} 
                                            onClick={() => setAspectRatio(ratio)}
                                            className={`px-2 py-0.5 text-[9px] font-black rounded-md ${aspectRatio === ratio ? 'bg-amber-500 text-black' : 'text-slate-400'}`}
                                        >
                                            {ratio}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400">Neural Style Template</label>
                                <select 
                                    value={generationStyle}
                                    onChange={(e) => setGenerationStyle(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
                                >
                                    <option>Hyper-Realistic RAW Portrait</option>
                                    <option>Cinematic 3D Render</option>
                                    <option>Anime Cyberpunk Masterpiece</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isGenerating}
                            className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-black shadow-md transition-all ${isGenerating ? 'bg-amber-800/40 text-amber-500 animate-pulse' : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 active:scale-95'}`}
                        >
                            {isGenerating ? '⚡ Compiling Fast HD Pixels...' : '⚡ Generate Fast Image'}
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    {isGenerating && (
                        <div className="bg-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center py-12 space-y-3">
                            <div className="h-6 w-6 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            <h3 className="font-black text-xs text-amber-500 tracking-widest uppercase animate-pulse">Running Fast Neural Grid Pipeline...</h3>
                        </div>
                    )}

                    <div className="space-y-3">
                        <h3 className="text-xs font-black tracking-widest uppercase text-slate-400">🖼️ High-Res Output Manifest</h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {galleryQueue.map((item) => (
                                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                                    <div className="relative bg-slate-950 flex flex-col">
                                        <img src={item.url} alt={item.prompt} className="w-full h-auto object-cover" />
                                        <div className="p-3 flex gap-2 justify-end bg-slate-900 border-t border-slate-800">
                                            <a href={item.url} target="_blank" rel="noreferrer" className="border border-slate-700 text-[10px] font-black text-slate-300 px-3 py-1.5 rounded-md text-decoration-none">
                                                Preview Full ↗
                                            </a>
                                            <button 
                                                onClick={() => downloadImageHD(item.url, item.prompt)} 
                                                className="bg-gradient-to-r from-amber-400 to-orange-500 text-[10px] font-black text-black px-3 py-1.5 rounded-md border-none shadow-md"
                                            >
                                                Download HD 📥
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-900">
                                        <p className="text-[11px] text-slate-400 font-medium italic m-0">"{item.prompt}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
