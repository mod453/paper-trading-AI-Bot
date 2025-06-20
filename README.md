# Alpaca AI Trading Bot with GPT-3.5

This project is a real-time AI-powered stock trading bot that integrates Alpaca's news streaming API with OpenAI's GPT-3.5-turbo model. It listens to market news and makes autonomous trading decisions (buy/sell) based on sentiment analysis of headlines. If the API call to OpenAI fails, the bot falls back to a default impact score of `75`.

## Features

* Live market news stream using Alpaca WebSocket.
* Sentiment scoring using OpenAI GPT-3.5 (or fallback to dummy score).
* Auto buy/sell logic based on sentiment thresholds.
* Uses environment variables for secure API key management.

## Prerequisites

* Node.js 
* An Alpaca account with API credentials (paper trading supported)
* An OpenAI API key 

## Installation

1. Clone this repository:

```bash
git clone https://github.com/mod453/paper-trading-AI-Bot.git
cd paper-trading-AI-Bot
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
## Usage

1. Start the bot:

```bash
node server.js
```

2. The bot will:

* Authenticate with Alpaca’s WebSocket news stream.
* Subscribe to all news events.
* For each news headline, query GPT-3.5 to return a positivity score (1–100).
* If the GPT API fails or is not available, it will use a fallback dummy impact score of `75`.
* Automatically place buy orders if score >= 70, and sell/close positions if <= 30.


