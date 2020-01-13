# NewsOne

## Description: ##
NewsOne is a one-stop source for all the news from 14 different countries. Users have the ease of getting news from their own country (location access is required for this feature) or they can choose news from one of the 14 countries at a time. Along with news, users can also read articles from New York Times, get weather information, see currency exchange rates for USD and get information on some stocks. If location access is granted, local weather is also available to users. In the case when location access is not permitted, users still have the ability to search for weather of any location. Users can also search for news and articles that were published in the past few days.

## Features: ##
1. News Headlines: NewsOne extracts news data and displays the top headlines from multiple sources
    1a. If location access is granted, local news will be displayed, provided reliable news sources are available for that country
    2a. Location access provided or not, users can still select news for a different country
    3a. A total of 14 countries are available to be selected from
2. Articles: Along with top news headlines, NewsOne also provides an option to get most popular articles from New York Times
3. Categories: For both news and articles, users can select their favorite category. If no category is selected, all of them are shown. A total of 6 categories are available which are:
    3a. Business
    3b. Entertainment
    3c. Health
    3d. Science
    3e. Sports
    3f. Technology
4. Search: Users have ability to search for both news and articles. Most popular results are shown first
5. Widgets:
    5a. Weather: Users can search for weather of any loation in the world. Search results are displayed in a separate modal window which displays more information on weather like humidity, UV index, wind speed with a graph (using CSS) that gives information on upcoming temperatures. If location access is provided, local weather information is provided in the side widget 
    5b. Stocks: The most common tech stocks like AAPL, MSFT, AMZN, GOOGL and AMD are available in the side widget. More information on stocks can be found by following the external link provided
    5c. Currency: The exchange rates, against 1 USD, for most common currencies is available in a side widget. More information on exchange rates can be found by following the external link provided
6. Dark/Light Mode: Users can switch between light and dark modes for ease-of-use

## POSSIBLE FUTURE UPDATES ##
1. There is no option to filter the search results. Filters like time period, length, type etc. can be added in the future update
2. Just like weather, separate modal windows with graphs can be added for stocks and currency exchange rates
3. More categories can be added
4. Pagination for showing limited results only

## Other Note(s): ##

### Environments used: ###

1. ReactJS with Router: used for the development of this SPA
2. CSS: for styling the app
3. AJAX: used for APIs which are:
    3a. [News API](https://newsapi.org/): for the top news headlines
    3b. [New York Times](https://developer.nytimes.com/): for current top articles
    3c. [World Trading Data](https://www.worldtradingdata.com/): for live stocks information
    3d. [Exchange Rates API](https://exchangeratesapi.io/): for today's exchange rates against 1 USD
    3e. [Dark Sky](https://darksky.net/dev): for getting the weather data of provided location
    3f. [OpenCage](https://opencagedata.com/): for location search option
4. Adobe Illustrator: for designing the logos and favicons