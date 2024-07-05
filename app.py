from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup


def scrape_drugs(letter):
    base_url = 'https://www.ilacabak.com/aralist.php?Id='
    drugs_data = []

    url = f'{base_url}{letter}'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        for li in soup.find_all('li'):
            drug_name_tag = li.find('div', class_='listeilac')
            price_tag = li.find('div', class_='listefiyat')

            if drug_name_tag and price_tag:
                drug_name_a = drug_name_tag.find('a')
                price_font = price_tag.find('font')

                if drug_name_a and price_font:
                    drug_name = drug_name_a.text.strip()
                    price = price_font.text.strip()

                    drugs_data.append({
                        'drug': drug_name,
                        'price': price,
                    })
    else:
        print(f'Failed to fetch URL: {url}')

    return drugs_data





app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app, allowing all origins by default

# Define a route for the API
@app.route('/drugs/<letter>')
def drugs(letter):
    return jsonify(scrape_drugs(letter))



if __name__ == '__main__':
    app.run(debug=True)