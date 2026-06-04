/**
 * Fast LEO AI Pro - Finalized Production Logic
 */

function FastLeoAiApp() {
    const [promptText, setPromptText] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const generateImage = async (e) => {
        e.preventDefault();
        if (!promptText.trim()) return alert("Please enter a description first!");
        
        setIsGenerating(true);
        
        // 1. Create the Pollinations API URL
        const seed = Math.floor(Math.random() * 999999);
        const imageUrl = `https://gen.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=1024&height=1024&seed=${seed}&nologo=true`;

        // 2. Pre-load the image to ensure it works before showing it
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            setImages([{ id: Date.now(), url: imageUrl }, ...images]);
            setIsGenerating(false);
            setPromptText('');
        };

        img.onerror = () => {
            alert("The AI server is currently busy. Please try again in a few seconds.");
            setIsGenerating(false);
        };
    };

    return (
        <div className="min-h-screen">
            <header><h1>⚡ FAST LEO AI PRO</h1></header>
            
            <form onSubmit={generateImage}>
                <textarea 
                    value={promptText} 
                    onChange={(e) => setPromptText(e.target.value)} 
                    placeholder="Describe your vision..." 
                />
                <button type="submit" disabled={isGenerating}>
                    {isGenerating ? "⚡ Generating..." : "⚡ Generate Image"}
                </button>
            </form>

            {isGenerating && <div className="loader-box">🔄 Pipeline processing...</div>}

            <div className="output-panel">
                {images.map(img => (
                    <div key={img.id} className="card">
                        <img src={img.url} alt="Generated AI Art" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// Ensure the app renders correctly
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<FastLeoAiApp />);
}
