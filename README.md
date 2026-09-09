# eczane_api

A simple Node.js API that scrapes drug names and prices from an external pharmacy listing website and returns them as JSON.

## Features

- Scrapes drug data from a third-party site
- Returns a JSON list of drugs and prices
- CORS enabled
- Includes a basic health check endpoint

## Tech Stack

- Node.js
- Express
- Axios
- Cheerio
- CORS

## Requirements

- Node.js 14 or later
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/SohailElskhawy/eczane_api.git
cd eczane_api
```

Install dependencies:

```bash
npm install
```

## Running the App

Start the server:

```bash
npm start
```

By default, the server runs on port `3000` unless the `PORT` environment variable is set.

## API Endpoints

### `GET /scrape-drugs/:letter`

Fetches drugs for the given letter from the source site.

#### Parameters

- `letter` — A letter or identifier passed to the external scraping URL

#### Example

```bash
GET /scrape-drugs/A
```

#### Response

```json
[
  {
    "drug": "Example Drug Name",
    "price": "Example Price"
  }
]
```

### `GET /health`

Health check endpoint.

#### Response

```text
OK
```

## Notes

- This API depends on the structure and availability of the external website it scrapes.
- If the source website changes its HTML structure, the scraper may stop working.
- Be mindful of the website's terms of use and scraping policies.

## Project Structure

```text
.
├── app.js
├── package.json
└── README.md
```

## License

ISC
