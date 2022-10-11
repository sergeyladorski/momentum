import { settingsState } from "../data/settingsState";
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
export const changeQuoteButton = document.querySelector('.change-quote');
let randomNum;
let quotesList = [];

function getRandomNumRange() {
    randomNum = Math.floor(Math.random() * (quotesList.length));
};

export async function getQuotes() {
    let quotes = '';

    if (settingsState.language === 'en') {
        quotes = './data/quotesEn.json';
    } else {
        quotes = "./data/quotesRu.json";
    }
    const res = await fetch(quotes, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    
    const data = await res.json();
    
    quotesList = data;
    getRandomQuote();
};

export function getRandomQuote() {
    getRandomNumRange();
    const randomQuote = quotesList[randomNum]

    quote.textContent = `«${randomQuote.text}»`;
    author.textContent = randomQuote.author === null ? 'Unknown author' : randomQuote.author;
};
