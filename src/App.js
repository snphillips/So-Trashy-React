import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import _lodash from 'lodash';
import popNeighbData from './popNeighbData';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ChartHeader from './ChartHeader';
import BarChart from './BarChart';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      valueForColors: "borough",
      refuseType: "refusetonscollected",
      year: "2018",
      borough: "All Boroughs",
      openDataSourceLink: `https://data.cityofnewyork.us/resource/8bkb-pvci.json?month=2017%20/%2010`,
    }

  //  ==================================
  //  "this" binding
  //  ==================================
    this.refuseTypeSubmit = this.refuseTypeSubmit.bind(this)
    this.handleYearDropdownChange = this.handleYearDropdownChange.bind(this)
    this.handleYearDropdownSubmit = this.handleYearDropdownSubmit.bind(this)
    this.handleBoroughDropdownChange = this.handleBoroughDropdownChange.bind(this)
    this.handleBoroughDropdownSubmit = this.handleBoroughDropdownSubmit.bind(this)
  }


  //  ==================================
  //  Get the data
  //  ==================================
  getData(){

    // let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?$where=month like '%25${this.state.year}%25'`
    let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?month=${this.state.year}%20/%2010`

    axios.get(openDataSourceLink)
      .then( (response) =>  {

        // 1) setState with original data source
        this.setState({data: response.data});

        // 2) massage the data to fit specific needs
        this.addBoroughCDKeyData()
        this.addBoroughCDKeyPopData()
        this.addNeighborhoodKey()
        this.addPopulationKey()
        this.massageData()

        this.getNeighborhoodNames()

        // 3) setState again, with new updated data,
        // 4) then, drawChart, using the updated data ************
        // this.setState({data: response.data}, this.drawChart);
        this.drawChart();
      })

      .catch(function (error) {
        console.log(error);
      });
  }


   componentDidMount(){
    this.getData()
    console.log("popNeighbData", popNeighbData);
   }

  // For testing purposes to play with _lodash
  // I don't actually want to remove Brooklyn entries
   removeBrooklynEntries() {
     _lodash.remove(this.state.data, (object) => {
        return object.borough === "Brooklyn"
     })
   }

   // Add a key that contains both bourough & district together
   addBoroughCDKeyData() {
    const newData =

    _lodash.map(this.state.data, (entry) => {
      let o = Object.assign({}, entry);
      o.boroughDistrict = entry.borough + ' ' + entry.communitydistrict
      return o;
    })
    this.setState({data: newData})
    console.log("Data with new key", this.state.data)
   }

   // Add a key that contains both bourough & district together
   addBoroughCDKeyPopData() {
    const newData =

    _lodash.map(popNeighbData, (entry) => {
      let newKey = Object.assign({}, entry);
      newKey.boroughDistrict = entry.borough + ' ' + entry.communitydistrict
      return newKey;
    })
    this.popNeighbData = newData
    console.log("Pop data with new key", this.popNeighbData)
   }


   // Add a neighborhood key to data
   addNeighborhoodKey() {
     const newData =

     _lodash.map(this.state.data, (entry) => {
       let newKey = Object.assign({}, entry);
       newKey.neighborhood = ''
       return newKey;
     })
     this.setState({data: newData})
     console.log("Data w/ new neighb key", this.state.data)
   }


   // Add a population key to data
   addPopulationKey() {
     const newData =

     _lodash.map(this.state.data, (entry) => {
       let newKey = Object.assign({}, entry);
       newKey.population = 0
       return newKey;
     })
     this.setState({data: newData})
     console.log("Data w/ new pop key", this.state.data)
   }



  // Does not work properly
   getNeighborhoodNames() {

    let getNeighborhoodName = (key) =>  {
      return _lodash.pick(key, 'cd_name');
    }

    let newData = _lodash.merge(this.state.data, _lodash.map(popNeighbData,  getNeighborhoodName))

    this.setState({data: newData})
    console.log("peaches:", this.state.data)
   }





   // mergePopNeighbData(){


   //  _lodash.map(popNeighbData, (entry) => {



   //  })

   // // 1) make a helper lookup function(borough, cd) that looks up
   // // proper entry, then finds and extracts the correct data (neighborhood & cd)

   // }


   massageData() {
     const newData =

        _lodash.map(this.state.data, (entry) => {

          // removes spaces in month
          entry.month =  entry.month.replace(/\s+/g, '')

          // don't need this but keep for as quick reference
          entry.borough =   _lodash.toLower(entry.borough)

          // turn string weights into numbers
          entry.refusetonscollected =   _lodash.parseInt(entry.refusetonscollected)
          entry.papertonscollected =   _lodash.parseInt(entry.papertonscollected)
          entry.mgptonscollected =   _lodash.parseInt(entry.mgptonscollected)
          entry.resorganicstons =   _lodash.parseInt(entry.resorganicstons)
          entry.leavesorganictons =   _lodash.parseInt(entry.leavesorganictons)
          entry.schoolorganictons =   _lodash.parseInt(entry.schoolorganictons)
          entry.xmastreetons =   _lodash.parseInt(entry.xmastreetons)

          return entry
        })

    this.setState({data: newData})
  }




   //  ==================================
   //  Refuse-type buttons
   //  ==================================
   refuseTypeSubmit(event) {
    console.log("Refuse type button clicked", event.target.id)
    this.setState({refuseType: event.target.id})
    this.drawChart()
   }

 //  ==================================
 //  Year Dropdown Menu
 //  1) choose a value
 //  2) submit that value.
 //  ==================================
  handleYearDropdownChange(event) {
    this.setState({year: event.target.value}, () => {
      this.getData()
    })
    console.log("year button clicked", event.target.value)
  }

  handleYearDropdownSubmit(event) {
    this.getData()
    event.preventDefault();
  }

 //  ==================================
 //  Borough Dropdown Menu
 //  1) choose a value
 //  2) submit that value.
 //  ==================================
  handleBoroughDropdownChange(event) {
    this.setState({borough: event.target.value})
    console.log("borough button clicked", event.target.value)
  }

  handleBoroughDropdownSubmit(event) {
    console.log("borough button submitted", event.target.value)
    // do I need to do anything here?
    event.preventDefault();
  }






  // **********************************
  // Drawing the Chart function
  // **********************************

   drawChart() {
    const svg = d3.select("svg")
    const margin = {top: 55, right: 15, bottom: 45, left: 110};
    const width = svg.attr('width')
    const height = svg.attr('height')
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // ==================================
    // Colors!
    // ==================================
    let colorBars = d3.scaleOrdinal()
      // .range(["#675375", "#8d4944", "#613563", "#696d9c", "#94aacc"]);
      // .range(["#5F5449", "#9B6A6C", "#C4A4AA", "#B3D1C6", "#76AED3"]);
      .range(["#C5DCA0", "#9C9BC9", "#C44A5C", "#A0DDFF", "#AF649B"]);


    // ==================================
    // ToolTip!
    // ==================================
    let tooltip = d3.select("body")
      .append("div")
      .attr("class", "toolTip");

    // ==================================
    // Establishing the Domain(data) & Range(viz)
    // ==================================
    const xScale = d3.scaleLinear()
      // 1) Domain. the min and max value of domain(data)
      // 2) Range. the min and max value of range(the visualization)
      .domain([0, d3.max(this.state.data, d => d[this.state.refuseType])])
      .range([0, innerWidth])

    const yScale = d3.scaleBand()
      // 1) Domain. the min and max value of domain(data)
      // 2) Range. the min and max value of range(the visualization)
      // .domain(this.state.data.map(d => d.borough + " " + d.communitydistrict + " " + d.month))
      .domain(this.state.data.map(d => d.borough + " " + d.communitydistrict))
      .range([0, innerHeight])
      .padding(0.1)



    const yAxis = d3.axisLeft(yScale)
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


    // ==================================
    // Drawing the Axes (left, top, bottom)
    // ==================================
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisTop(xScale));
    // a scale on the bottom too, b/c the chart is so long
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${innerHeight})`);


    // ==================================
    // Drawing the Bars
    // ==================================
    g.selectAll('rect')
      .data(this.state.data)
      .enter()
      .append('rect')
      .attr('y', d => yScale(d.borough + " " + d.communitydistrict))
      // .attr('y', d => yScale(d.borough + " " + d.communitydistrict + " " + d.month))
      .attr('width', d => xScale(d[this.state.refuseType]))
      // bandwidth is computed width
      .attr('height', yScale.bandwidth())
      .style("fill", (d) => {
        return colorBars(d[this.state.valueForColors])
      })


    // ==================================
    // Tool Tip - on
    // ==================================
      .on("mousemove", function(d){
        tooltip
      .style("left", d3.event.pageX - -20 + "px")
      .style("top", d3.event.pageY - 70 + "px")
      .style("display", "inline-block")
      // .html("insert neighborhood name")
      .html(d.cd_name)
      })

    // ==================================
    // Tool Tip - off
    // ==================================
      .on("mouseout", function(d){ tooltip.style("display", "none");})

    // ==================================
    // Bar Labels - half working
    // ==================================
     g.selectAll(".text")
      .data(this.state.data)
      .enter()
      .append("text")
      .attr("class","label")
      .text( (d) => {return new Intl.NumberFormat().format(Math.round(d[this.state.refuseType]))+ " tons";})

      .attr('y', d => yScale(d.borough + " " + d.communitydistrict) + 30)
      .attr('x', d => xScale(d[this.state.refuseType]) - 75)
   }



  //  ==================================
  //  And finally, the render
  //  ==================================
  render() {
    return (

      <div className="App">

        <Sidebar refuseTypeSubmit={this.refuseTypeSubmit}
                 handleYearDropdownChange={this.handleYearDropdownChange}
                 handleYearDropdownSubmit={this.handleYearDropdownSubmit}
                 handleBoroughDropdownChange={this.handleBoroughDropdownChange}
                 handleBoroughDropdownSubmit={this.handleBoroughDropdownSubmit}
                 boroughButton={this.boroughButton}
                 />

        <Footer />
        <ChartHeader year={this.state.year} refuseType={this.state.refuseType} />
        <BarChart />

      </div>
    );
  }
}

