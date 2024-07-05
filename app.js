const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

const scrapeDrugs = async () => {
    const baseUrl = 'https://www.ilacabak.com/aralist.php?Id=';
    const drugsData = [];
    const alphabets = "ABCDEFGHIJKLMNOPRSTUVXYZ".split('');

    for (const letter of alphabets) {
        const url = `${baseUrl}${letter}`;
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

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
        } catch (error) {
            console.error(`Failed to fetch URL: ${url}`);
        }
    }

    console.log(drugsData);
    return drugsData;
};

app.get('/scrape-drugs', async (req, res) => {
    const drugsData = await scrapeDrugs();
    res.json(drugsData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
