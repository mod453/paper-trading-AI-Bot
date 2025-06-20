# Alpaca AI Trading Bot with GPT-3.5

This project is a real-time AI-powered stock trading bot that integrates Alpaca's news streaming API with OpenAI's GPT-3.5-turbo model. It listens to market news and makes autonomous trading decisions (buy/sell) based on sentiment analysis of headlines.

## Features

* Live market news stream using Alpaca WebSocket.
* Sentiment scoring using OpenAI GPT-3.5.
* Auto buy/sell logic based on sentiment thresholds.
* Uses environment variables for secure API key management.

## Prerequisites

* Node.js (v18+ recommended)
* An Alpaca account with API credentials (paper trading supported)
* An OpenAI API key

## Installation

1. Clone this repository:

```bash
https://github.com/yourusername/yourrepo.git
cd yourrepo
```

2. Install dependencies:

```bash
npm install
```

3. Set up your `.env` file:

```env
APCA_API_KEY_ID=your_alpaca_api_key
APCA_API_SECRET_KEY=your_alpaca_secret_key
OPENAI_API_KEY=your_openai_api_key
```

> Do **NOT** upload the real `.env` file to GitHub. Instead, include a `.env.example` file in the repository that shows the required keys without actual values.

## Usage

1. Start the bot:

```bash
node server.js
```

2. The bot will:

* Authenticate with Alpaca’s WebSocket news stream.
* Subscribe to all news events.
* For each news headline, query GPT-3.5 to return a positivity score (1–100).
* Automatically place buy orders if score >= 70, and sell/close positions if <= 30.

## Files to Upload to GitHub

* `server.js` — Main trading bot logic.
* `package.json` — Project dependencies and metadata.
* `package-lock.json` — Locked versions of dependencies.
* `.env.example` — Sample environment variables file (no real keys).
* `README.md` — Project documentation and usage instructions (this file).

Do **not** upload your real `.env` file or the `node_modules` folder.

## Notes

* Make sure your API keys are valid and that your OpenAI plan has sufficient quota.
* You can test on Alpaca’s paper trading account to avoid real trades.

---

⚠️ **Disclaimer:** This bot is for educational/demo purposes only. Use at your own risk in financial environments.
