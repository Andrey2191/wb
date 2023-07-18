import axios from 'axios';
import cheerio from 'cheerio';

(async () => {
  const articles = [138593051, 94340317, 94340606, 138590435, 138607462, 94339119, 94339244];
  const stockInfo = [];

  try {
    const getStockInfo = async (article) => {
      try {
        const url = `https://www.wildberries.ru/catalog/${article}/detail.aspx`;
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const stockData = $('body').text();
      } catch (error) {
        stockInfo.push({ article, error: error.message });
      }
    };

    await axios.all(articles.map(getStockInfo));

    console.log(JSON.stringify(stockInfo));
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
})();
