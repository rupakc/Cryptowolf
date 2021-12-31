# Cryptowolf

Electron JS Application for Monitoring Crypto News and Markets

## Vision

Cryptocurrency is the latest avenue for the proverbial gold-rush in the industry, hence, it becomes imperative to track the latest trends and prices of bitcoin and the thousand other altcoins. Through Cryptowolf we are aggregating data from various sources like News, Social channels and Prices accross all the exchanges.

## System Architecture

![architecture image][logo]

[logo]: https://github.com/rupakc/Cryptowolf/blob/main/architecture.PNG "System Data Flow"

We have used the <b> Electron JS </b> framework (which combines Node JS and Chromium Browser in a single runtime inorder to make a platform independent application). For the UI we are using <b> Bulma </b> which is built on top of Bootstrap and uses CSS Flexbox. 
<b> JQuery </b> has been used for handling the UI events because, Bulma is pure CSS.

We are collecting data from the following sources - 

- News - CryptoControl, CryptoPanic, NewsAPI 
- Social - Twitter, Reddit
- Market Price - BitcoinAverage
