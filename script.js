function FastLeoAiApp() {
    const [promptText, setPromptText] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const generateImage = async (e) => {
        e.preventDefault();
        if (!promptText.trim()) return alert("Enter a description first!");
        
        setIsGenerating(true);
        // Using AbortController to prevent "Network Timeout" crashes on mobile
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

        const url = `https://gen.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 99999)}`;

        try {
            await fetch(url, { signal: controller.signal });
            setImages([{ id: Date.now(), url }, ...images]);
        } catch (err) {
            alert("Connection error: The server is busy. Please try a simpler prompt.");
        } finally {
            clearTimeout(timeout);
            setIsGenerating(false);
            setPromptText('');
        }
    };

    return (
        <div className="min-h-screen">
            <header><h1>⚡ FAST LEO AI PRO</h1></header>
            <form onSubmit={generateImage}>
                <textarea value={promptText} onChange={(e) => setPromptText(e.target.value)} placeholder="Describe your vision..." />
                <button type="submit" disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate Image"}</button>
            </form>
            {images.map(img => <div key={img.id} className="card"><img src={img.url} alt="AI Output" /></div>)}
        </div>
    );
}
ReactDOM.createRoot(document.getElementById('root')).render(<FastLeoAiApp />);
