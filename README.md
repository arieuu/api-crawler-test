# Openfoods data api

This api will scrape the openfoods website uppon request and return the data

## Installation

Clone this repo and install all the dependencies:
```bash
npm i
```

## Usage
To start the server:
```bash
npm run dev
```

## Documentation

The complete documentation for this api (including all routes, models and response shape) can be found
here once the project is running:

http://localhost:3000/api-docs/

## Process

To better modularize the code I applied the model view controller design pattern.
Then I put all the logic that would process the requests into services for each route.
In this case I had to keep most of the logic into separate scraping scripts instead of the services. So I did that and packaged those scripts together with the services that used them.
There is a main scraper script that is called by each service. That main scraping script then imports and calls on all the sub scripts that it needs, using them as modules.
The scripts are divided by steps.

When a request is made to the API it processes it, scrapes the requested data and returns it all formatted as soon as possible.

## General comments and thoughts
- This was my first time using puppeteer so there was some adjusting. I am in fact still adjusting to writing tools around the library;
- The site was tricky to scrape because of the complexity and nesting of the elements;
- It was also tricky separating the scraping logic into various parts (modules) instead of a single place for each scraping operation.
- Another main difficulty I had was treating the data I scrape before returning and also checking for edge cases. I'm more used to scraping and returning the data as is;
- It was enjoyable for the most part and a nice challenge.

~Ariel