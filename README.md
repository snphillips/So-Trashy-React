# So-Trashy

## Project Description

So Trashy is a data visualization that compares New York City's Department of Sanitation's (DSNY) monthly collection of refuse and recycling across New York City community districts/neighborhoods. So Trashy displays the latest information provided by DSNY via open data APIs.

View site here: https://so-trashy-react.surge.sh/

<img src="https://i.imgur.com/Zf8LOkR.png" width="500" alt="screen capture of app">
<img src="https://i.imgur.com/Ak3bbne.png" width="500" alt="screen capture of app">

## Site Features

- horizontal bar chart, representing all refuse picked up by DSNY, displayed by community district/neighborhood
- buttons allow users to display refuse type: trash, paper, metal/plastic/glass/carton, organics, leaves & Christmas trees
- dropdown menu to allow user to view refuse generation by year
- radio buttons that offer the option to view the data ascending, descending or alphabetically

## Made With

- DSNY Monthly Tonnage Data (nyc.gov Open Data API) (https://data.cityofnewyork.us/City-Government/DSNY-Monthly-Tonnage-Data/ebb7-mvp5)
- New York City Population By Community Districts (nyc.gov Open Data API) (https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2)
- D3.js version 5
- Vite
- React

## How to Run Locally

- clone this repo
- run npm to install all the dependencies
- to start the server:
  `$ npm start`
- open your browser to the ip address that Vite provites. Something like: http://127.0.0.1:5173/

## How to Update NPM Packages:

This app has many dependecies, so this will guide come in handy when they need updating:
https://bytearcher.com/articles/using-npm-update-and-npm-outdated-to-update-dependencies/

- Ask npm to list which packages have newer versions available using npm outdated:

`$ npm outdated`

- Then ask npm to install the latest version of a package. Ask for the latest version with the @latest tag. Use the --save flag to update package.json. For instance, if you want to update lodash, do:

`$ npm install lodash@latest --save`

- I check the app betweewn every update by stopping then restart the server. If the app is still working, I move onto the next dependency.
