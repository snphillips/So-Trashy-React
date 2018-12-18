# So-Trashy

## Project Description
So Trashy is a data visualization that compares New York City's Department of Sanitation's (DSNY) monthly collection of refuse and recycling across New York City neighborhoods.

This project is a refactor of a bubble chart I made using the same data. I realized that a bubble chart is not the best way to visualize the data and decided to use a bar chart instead. Bar charts are less sexy, but do a  better job of portraying the differences between neighborhoods, when the differences aren't extreme.

View site here: https://so-trashy-react.surge.sh/

<img src="https://i.imgur.com/Zf8LOkR.png" width="500" alt="screen capture of app">
<img src="https://i.imgur.com/Ak3bbne.png" width="500" alt="screen capture of app">

## Site Features
-  horizontal bar chart, representing all refuse picked up by DSNY, displayed by community district/neighborhood
-  buttons allow users to display refuse type: trash, paper, metal/plastic/glass/carton, organics, leaves & Christmas trees
-  dropdown menu to allow user to view refuse generation by year (2010 through 2018)
-  radio buttons that offer the option to view the data ascending, descending or alphabetically

## Made With
- DSNY Monthly Tonnage Data (nyc.gov Open Data API) (https://data.cityofnewyork.us/City-Government/DSNY-Monthly-Tonnage-Data/ebb7-mvp5)
- New York City Population By Community Districts (nyc.gov Open Data API) (https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2)
- D3.js version 5
- React
