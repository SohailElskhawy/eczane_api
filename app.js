const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); // Ensure cors is installed and imported

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const baseUrl = 'https://www.ilacabak.com/aralist.php?Id=';

// Define a route to fetch drugs by letter
app.get('/scrape-drugs/:letter', async (req, res) => {
    const letter = req.params.letter.toUpperCase(); // Ensure letter is uppercase
    const url = `${baseUrl}${letter}`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const drugsData = [];

        $('li').each((index, element) => {
            const drugNameTag = $(element).find('div.listeilac');
            const priceTag = $(element).find('div.listefiyat');

            if (drugNameTag.length && priceTag.length) {
                const drugNameA = drugNameTag.find('a');
                const priceFont = priceTag.find('font');

                if (drugNameA.length && priceFont.length) {
                    const drugName = drugNameA.text().trim();
                    const price = priceFont.text().trim();

                    drugsData.push({
                        drug: drugName,
                        price: price,
                    });
                }
            }
        });

        res.json(drugsData);
    } catch (error) {
        console.error(`Failed to fetch URL: ${url}`, error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
