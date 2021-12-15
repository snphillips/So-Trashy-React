import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import _lodash from 'lodash';
import popNeighbData from './popNeighbData';
import Sidebar from './components/Sidebar';
import ChartHeader from './components/ChartHeader';
import BarChart from './components/BarChart';
import Footer from './components/Footer';

let tempResult;
let data = [];
let tempData = [];
// let sortType = "sort ascending"

export default function App(props) {
  
    /* ==================================
    State Hooks
    ================================== */
    // const [data, setData] = useState();
    const [year, setYear] = useState("2021");
    const [refuseType, setRefuseType] = useState("allcollected");
    const [sortType, setSortType] = useState("sort ascending");


  /*  ==================================
   Get the data
   ================================== */
  function getData(){

    let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?$where=month like '%25${year}%25'`

    axios.get(openDataSourceLink)
      .then( (response) =>  {

        // 1) Empty data array
        data = [];
        // 2) The response data needs manipulation before
        // we can draw the chart. While we're manipulating
        // the data, we'll store the data in tempData.
        tempData = response.data

        // 2) massage the data to fit specific needs
        addBoroughCDKeyData()
        // console.log("3) addBoroughCDKeyData done", "tempData:", tempData)
        fixWeightToString()
        // console.log("4) fixWeightToString done", "tempData:", tempData)
        fixMonthValue()
        // console.log("5) fixMonthValue done", "tempData:", tempData)
        addNeighborhoodNamesPopulation()
        // console.log("6) addNeighborhoodNamesPopulation done", "tempData:", tempData)
        add12Months()
        // console.log("7) add12Months done", "tempData:", tempData)
        addAllRefuseCollectedKey()
        // console.log("8) addAllRefuseCollectedKey done", "tempData:", tempData)

        data = tempData

        // 3) sort the data according to user choice (asc, desc, alphabetical)
        dataSort(data)

        // 4) clear the current chart
        d3.selectAll("svg > *").remove()
        
        // 5) then, drawChart Yay!
        drawChart();

      }).catch(function (error) {
        console.log("getData() error: ", error);
      });
  };

   /* ################################
   Invoke the getData function
   ################################## */
   getData()



   /* ==================================
   Add key:value that contains both bourough & district together
   ================================== */
   function addBoroughCDKeyData() {
    const newData =

    _lodash.map(tempData, (entry) => {
      let o = Object.assign({}, entry);
      o.boroughDistrict = entry.borough + ' ' + entry.communitydistrict
      return o;
    })
    tempData = newData
   }

   /* ==================================
   Add key:value that contains total weight all refuse
   (add trash + recycling + compost for a grand total)
   ================================== */
   function addAllRefuseCollectedKey() {
    const newData =

    _lodash.map(tempData, (entry) => {
      let newKey = Object.assign({}, entry);
      newKey.allcollected = (entry.refusetonscollected + entry.papertonscollected + entry.mgptonscollected + entry.resorganicstons + entry.xmastreetons + entry.leavesorganictons)
      return newKey;
    })
    // setData(newData)
    tempData = newData
   }

   /* ==================================
   Getting the neighborhood & population data from one dataset,
   and adding it to the main dataset
   ================================== */
   function addNeighborhoodNamesPopulation() {
    //  console.log("hihi tempData:", tempData)
     tempData.forEach( (entry) => {
    // data.forEach( (entry) => {
      // console.log("6a) a ddNeighborhoodNamesPopulation() entry", entry)

      /* 
      Weird edge case: in 2020 the DSNY Monthly Tonnage by District 
      dataset introduced a Community District in Queens called 7A 
      (I don't know what that is). There is no corresponding 7A in
      the New York City Population By Community Districts dataset,
      so the presense of 7A breaks the algorithm. Below, when we
      encouter it, it simple "returns" and moves onto the next entry.
      */

      // TODO: create a more robust solution where you kick out any any that doesn't
      // appear the neighborhood dataset.
      if (entry.communitydistrict === "7A") {
        // console.log("Encountered Queens CD 7A - returning.", entry.communitydistrict)
        return
      }


    // filter() creates new array with all elements that pass a "test"
      tempResult = popNeighbData.filter( (popEntry) => { 

        // working on better solution to 7A problem
        _lodash.includes(tempResult, popEntry)

        // In this case, the "test" is, are both boroughDistrict the
        // same?
        let result = (entry.boroughDistrict === popEntry.boroughDistrict);
        return result
      })


        /* 
        Yes? cool. Then for the current entry we're on, give it a key
        of cd_name, and assign it the value of the cd_name in our tempResult.
        Now put that result into entry, and move onto the next one
        When the app was created we didn't use any population data prior to 2010,
        however I keep it in case there's a future use for it 
        */
   
       entry.cd_name = tempResult[0].cd_name
       entry._2020_population = tempResult[0]._2020_population
       entry._2010_population = tempResult[0]._2010_population
       entry._2000_population = tempResult[0]._2000_population
       entry._1990_population = tempResult[0]._1990_population
       entry._1980_population = tempResult[0]._1980_population
       entry._1970_population = tempResult[0]._1970_population
      });
  }

  /*
   ==================================
  Sorts the data ascending, descending or alphabetically,
  depending on user choice
  ==================================
  */
  function dataSort() {
    if (sortType === 'sort ascending') {
      data.sort( (a,b) => d3.ascending(a[refuseType]/a._2010_population,b[refuseType]/b._2010_population))
      // console.log("sort ascending", data)
    }
      else if (sortType === 'sort descending') {
        data.sort( (a,b) => d3.descending(a[refuseType]/a._2010_population,b[refuseType]/b._2010_population))
        // console.log("sort descending", data)
    }
      else if (sortType === 'sort alphabetical') {
        data.sort( (a,b) => d3.descending(b.boroughDistrict,a.boroughDistrict))
        // console.log("sort alphabetical", data)
    } else {
      data.sort( (a,b) => d3.ascending(a[refuseType]/a._2010_population,b[refuseType]/b._2010_population))
      // console.log("Sorting error. Sort ascending as default", data)
    }
  };



  /* ==================================
  The raw data needs changes:
  1) the refuse weights need to be changed from strings to numbers
  2) the NaN weights need to be changed to 0
  ================================== */
  function fixWeightToString() {
     const newData =

       _lodash.map(tempData, (entry) => {

        // 1) turn string weights into numbers
        entry.refusetonscollected =   _lodash.parseInt(entry.refusetonscollected)
        entry.papertonscollected =   _lodash.parseInt(entry.papertonscollected)
        entry.mgptonscollected =   _lodash.parseInt(entry.mgptonscollected)
        entry.resorganicstons =   _lodash.parseInt(entry.resorganicstons)
        entry.leavesorganictons =   _lodash.parseInt(entry.leavesorganictons)
        entry.schoolorganictons =   _lodash.parseInt(entry.schoolorganictons)
        entry.xmastreetons =   _lodash.parseInt(entry.xmastreetons)
        entry.allcollected =   _lodash.parseInt(entry.allcollected)

        // 2) if an entry doesn't exist, the above .parseInt function inserts an entry with
        // a value of NaN. 
        // We can't have NaN (it looks ugly), so we must turn those NaNs into 0
        if (Number.isNaN(entry.refusetonscollected) === true ) { entry.refusetonscollected = 0}
        if (Number.isNaN(entry.papertonscollected) === true ) { entry.papertonscollected = 0}
        if (Number.isNaN(entry.mgptonscollected) === true ) { entry.mgptonscollected = 0}
        if (Number.isNaN(entry.resorganicstons) === true ) { entry.resorganicstons = 0}
        if (Number.isNaN(entry.leavesorganictons) === true ) { entry.leavesorganictons = 0}
        if (Number.isNaN(entry.schoolorganictons) === true ) { entry.schoolorganictons = 0}
        if (Number.isNaN(entry.xmastreetons) === true ) { entry.xmastreetons = 0}
        if (Number.isNaN(entry.allcollected) === true ) { entry.allcollected = 0}
        return entry
       })

    // setData(newData)
    tempData = newData
  }

  /* ==================================
  The raw data needs changes:
  The month entries need spaces removed
  ================================== */
  function fixMonthValue() {
     const newData =

       _lodash.map(tempData, (entry) => {

        // Removes spaces in month
        entry.month =  entry.month.replace(/\s+/g, '')
        return entry
       })

    // setData(newData)
    tempData = newData
  }



  /* ==================================
  The source data is monthly, but we're
  only interested in yearly totals. So, the
  data needs to be collapsed.
  ================================== */
  function add12Months() {
    let borough;
    let cd_name;

    // 1) let's find all the unique districts (so we can later add their monthly totals)
    let allBoroughDistrict = _lodash.uniqBy(tempData, (item)=>{
      return item.boroughDistrict
    })
    // console.log("7a) let's find unique districts called allBoroughDistrict:", allBoroughDistrict)

     allBoroughDistrict = _lodash.map(allBoroughDistrict, (item)=>{
      return item.boroughDistrict
    })
    //  console.log("7b) Then map over that list return the name of the district", allBoroughDistrict)

    // 2) map over the allBoroughDistrict to return some information
    // we'll need, and the sum of all 12 months tonnage per year
    const newData = _lodash.map(allBoroughDistrict, (boroughDistrict)=>{

        const allBoroughDistrict = _lodash.filter(tempData, (item)=>{
          // console.log("3) item.boroughDistrict", item.boroughDistrict)
          return item.boroughDistrict === boroughDistrict
        })

          borough = _lodash.filter(data, (item)=>{
            // console.log("4) item.borough", borough)
            return item.borough === borough
          })

          cd_name = _lodash.filter(data, (item)=>{
            // console.log("5) item.cd_name", item.cd_name)
            return item.cd_name === cd_name
          })

          let refusetonscollected = _lodash.sumBy(allBoroughDistrict, (item)=>{
            // console.log("6) item.refusetonscollected", item.refusetonscollected)
            return item.refusetonscollected
          })

          let papertonscollected = _lodash.sumBy(allBoroughDistrict, (item)=>{
            return item.papertonscollected
          })

          let mgptonscollected = _lodash.sumBy(allBoroughDistrict, (item)=>{
            return item.mgptonscollected
          })

          let resorganicstons = _lodash.sumBy(allBoroughDistrict, (item)=>{
            return item.resorganicstons
          })

          let leavesorganictons = _lodash.sumBy(allBoroughDistrict, (item)=>{
            return item.leavesorganictons
          })

          let schoolorganictons = _lodash.sumBy(allBoroughDistrict, (item)=>{
            return item.schoolorganictons
          })

          let xmastreetons = _lodash.sumBy(allBoroughDistrict, (item)=>{
            return item.xmastreetons
          })

      return {

        boroughDistrict: boroughDistrict,
        borough: allBoroughDistrict[0].borough,
        cd_name: allBoroughDistrict[0].cd_name,
        _2010_population: allBoroughDistrict[0]._2010_population,
        refusetonscollected: refusetonscollected,
        papertonscollected: papertonscollected,
        mgptonscollected: mgptonscollected,
        resorganicstons: resorganicstons,
        leavesorganictons: leavesorganictons,
        schoolorganictons: schoolorganictons,
        xmastreetons: xmastreetons,
        }
    })
    // console.log("data after adding the 12 months of data:", newData)
    // setData(newData)
    tempData = newData
  }

    /* ==================================
    Refuse-type buttons
    ================================== */
    function refuseTypeSubmit(event) {
     // Set the refuseType state with whatever button user pressed,
     // then, get the data (as a callback function to avoid async behavior)
     setRefuseType( event.target.id, () => {
       getData()
     })
      // console.log("Refuse type button clicked", event.target.id)
    }

 


  /* ==================================
  Year Dropdown Menu
  ================================== */
  function yearDropdownSubmit(event) {
    setYear(event.target.value, () => {
      // reminder: drawChart is inside getData
      // note: getData() is a callback function to
      // avoid async behavior
      getData()
    })
    // console.log("year button clicked", event.target.value)
    event.preventDefault();
  }

  /* ==================================
  Sort Order Radio Buttons
  ================================== */
  function sortOrderRadioSubmit(event) {
    setSortType(event.target.value)
      getData()
  
    // console.log("sort button clicked: ", event.target.value)
  }

  /* **********************************
  Drawing the Chart function
  ********************************** */

  function drawChart() {
    const svg = d3.select("svg")

    const margin = {top: 60, right: 140, bottom: 190, left: 150};
    const width = svg.attr('width')
    const height = svg.attr('height')

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    /* ==================================
    Colors
    ================================== */
    let colorBars = d3.scaleOrdinal()
                      .domain(["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"])
                      .range(["#21E0D6", "#EF767A", "#820933", "#6457A6", "#2C579E"]);

    /* ==================================
    ToolTip
    ================================== */
    let tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tool-tip");

    /* ==================================
    Establishing the Domain(data) & Range(viz)
    ================================== */
    const xScale = d3.scaleLinear()
      /* 
      1) Domain. the min and max value of domain(data)
      2) Range. the min and max value of range(the visualization)
      .domain([0, d3.max(data, d => d[refuseType])])
      */
      .domain([0, d3.max(data, d => d[refuseType]/d._2010_population * 2000 )])
      .range([0, innerWidth])

    const yScale = d3.scaleBand()
      // 1) Domain. the min and max value of domain(data)
      // 2) Range. the min and max value of range(the visualization)
      .domain(data.map(d => d.boroughDistrict))
      .range([0, innerHeight])
      .padding(0.1)

    // const yAxis = d3.axisLeft(yScale)
    const g = svg.append('g')
                 .attr('transform', `translate(${margin.left}, ${margin.top})`)


    /* ==================================
    Drawing the Axes (left, top, bottom)
    ================================== */
    g.append('g')
     .call(d3.axisLeft(yScale))

    g.append('g')
     .call(d3.axisTop(xScale))

    // a scale on the bottom too, b/c the chart is so long
    g.append('g')
     .call(d3.axisBottom(xScale))
     .attr('transform', `translate(0, ${innerHeight})`)


    /* ==================================
    Drawing the Bars
    ================================== */
     g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      // .transition() // a slight delay, see duration()
      .style("fill", (d) => {return colorBars(d["borough"])})
      .attr('y', d => yScale(d.boroughDistrict))
      // .attr('width', d => xScale(d[refuseType]))
      .attr('width', d => xScale(d[refuseType]/d._2010_population * 2000))
      // bandwidth is computed width
      .attr('height', yScale.bandwidth())
      // .duration(400)


    /* ==================================
    Mouseover: bars turn yellow
    note: don't use an arrow function here
    ================================== */
      .on("mouseover", function(d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("fill", "#ffcd44")
      })

    /* ==================================
    Mouseover: remove yellow fill by applying
    original colors again
    note: don't use an arrow function for first function
    ================================== */
      .on("mouseout", function(d) {
           d3.select(this)
           .transition()
           .duration(200)
           .style("fill", (d) => {return colorBars(d.borough)})
      })

    /* ==================================
    Tool Tip - on
    ================================== */
    // TODO: display 2020 population if user has selected the year 2020 onward
      .on("mousemove", (event, d) => {
        tooltip.style("left", event.pageX + 15 + "px")
               .style("top", event.pageY - 120 + "px")
               .style("display", "inline-block")

               .html(`<h4>  ${d.cd_name}  </h4>
                  2010 population:  ${new Intl.NumberFormat().format(d._2010_population)} </br></br>
                  neighboood total: ${new Intl.NumberFormat().format(d[refuseType])} tons/year</br>
                  per person: ${Math.round(d[refuseType]/d._2010_population * 2000)} pounds/year</br></br>

                  <p>Breakdown of refuse by percent:</p>

                  <ul>

                  <li>trash: ${(d.refusetonscollected * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1)} % </li></br>

                  <li>paper & cardboard: ${(d.papertonscollected * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1)} % </li></br>

                  <li>metal/glass/plastic: ${(d.mgptonscollected * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1)} % </li></br>

                  <li>brown bin organics: ${(d.resorganicstons * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1)} % </li></br>

                  <li>leaves: ${(d.leavesorganictons * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1)} % </li></br>

                  <li>christmas trees:  ${(d.xmastreetons * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1)} % </li>

                  </ul>`
               )

      })
  
    /* ==================================
    Tool Tip - off
    ================================== */
      g.on("mouseout", (d) => { tooltip.style("display", "none");})


    /* ==================================
    Bar Labels
    ================================== */
      g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .style("opacity", 0) // starting with 0 opacity, ending at 1 to help with jarring effect
      // .transition()
        .attr("class","label")
        .text( (d) => {return new Intl.NumberFormat().format((d[refuseType]/d._2010_population) * 2000 )+ " lbs/person";})

        .attr('y', d => yScale(d.boroughDistrict) + 20)
        // .attr('x', d => xScale(d[refuseType]) - 75)
        .attr('x', d => xScale(d[refuseType]/d._2010_population * 2000) + 5 )
      .style("opacity", 1)
      // .duration(500)


    /* ==================================
    Bar Exits
    ================================== */
      g.selectAll('rect')
       .data(data)
       .exit()
       .transition().duration(500)
       .remove()
   }


   /* ==================================
   And finally, the render
   ================================== */
    return (

      <div className="App row">

        <div className="sidebar-container col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
          <Sidebar refuseTypeSubmit={refuseTypeSubmit}
                   yearDropdownSubmit={yearDropdownSubmit}
                   sortOrderRadioSubmit={sortOrderRadioSubmit}
                   />
        </div>

        <div className="chart-container col-xs-12 col-sm-8 col-md-9 col-lg-9 col-xl-9">
          <ChartHeader year={year} refuseType={refuseType} />
          <BarChart />
          <Footer />
        </div>

      </div>
    );
}


