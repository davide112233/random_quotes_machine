import axios from 'axios';

class RandomQuotesService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://dummyjson.com/quotes',
      timeout: 5000,
    });
    this.quotesCache = null;
  }

  async fetchAllQuotes() {
    if (this.quotesCache) return this.quotesCache;

    try {
      const response = await this.apiClient.get('/');
      this.quotesCache = response.data.quotes;
      return this.quotesCache;
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw error;
    }
  }

  async getRandomQuote() {
    const quotes = await this.fetchAllQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
}

export default new RandomQuotesService();
