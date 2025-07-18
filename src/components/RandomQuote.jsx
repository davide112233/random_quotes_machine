import { useState } from "react";
import RandomQuotesService from "../utils/RandomQuotesService";
import DOMPurify from "isomorphic-dompurify";

const getRandomHexColor = () => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    return `#${hex}`;
};

const RandomQuote = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            const randomQuote = await RandomQuotesService.getRandomQuote();
            setQuote(randomQuote);
            const backgroundElement = document.getElementById("app-background");
            const getRandomQuoteBtn = document.getElementById("get-random-quote-btn");
            const quoteText = document.getElementById("quote-text");
            const quoteAuthor = document.getElementById("quote-author");
            if (backgroundElement) {
                const randomColor = getRandomHexColor();
                backgroundElement.style.backgroundColor = randomColor;
                getRandomQuoteBtn.style.backgroundColor = randomColor;
                quoteText.style.color = randomColor;
                quoteAuthor.style.color = randomColor;
            }
        } catch (error) {
            console.error('Failed to fetch random quote', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div id="app-background" className="container-fluid p-3 d-flex flex-column justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "rgb(103, 98, 247)" }}>
                {quote && (
                    <div className="card random-quote-card" style={{ width: "28rem", height: "fit-content", position: "absolute", border: "none" }}>
                        <div className="card-body" style={{ backgroundColor: "whitesmoke" }}>
                            <p id="quote-text" className="lead text-center fw-bold">{DOMPurify.sanitize(quote.quote)}</p>
                        </div>
                        <div className="card-footer p-0 d-flex justify-content-end border-0" style={{ backgroundColor: "whitesmoke" }}>
                            <p id="quote-author" className="lead fw-bold" style={{ fontSize: "medium", marginTop: "0.5rem", marginRight: "1rem" }}>- {DOMPurify.sanitize(quote.author)}</p>
                        </div>
                    </div>
                )}
                <div className="container p-3 d-flex justify-content-end align-items-end rounded-3 card-quote-container" style={{ width: "50rem", height: "40rem", backgroundColor: "whitesmoke" }}>
                    <button type="button" id="get-random-quote-btn" className="btn" style={{ height: "fit-content", backgroundColor: "rgb(103, 98, 247)", color: "white", textAlign: "center" }} onClick={handleClick} disabled={loading}>
                        {loading ? DOMPurify.sanitize("Loading") : DOMPurify.sanitize("Generate a new random quote")}
                    </button>
                </div>
            </div>
        </>
    );
}

export default RandomQuote;
