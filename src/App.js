import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
// import popNeighbData from './popNeighbData';

import Sidebar from './Sidebar';
import Footer from './Footer';
import ChartHeader from './ChartHeader';
import BarChart from './BarChart';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      populationData: [],
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
  //  not using yet
  //  ==================================
  getData(){
    // let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?month=${this.state.year}%20/%20${this.state.month}`
    let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?month=${this.state.year}%20/%2010`

    axios.get(openDataSourceLink)
      .then( (response) =>  {

        this.setState({data: response.data}, this.drawChart)
        console.log("response.data from getData():", response.data);
        console.log("this.state.data from getData():", this.state.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //  ==================================
  //  Get population data
  //  not using yet
  //  ==================================
  getPopulationData(){
    let openDataPopSourceLink = `https://data.cityofnewyork.us/resource/5hae-yeks.json`

    axios.get(openDataPopSourceLink)
      .then( (response) =>  {

        console.log("population data:", response.data);
        this.setState({populationData: response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }



   componentDidMount(){
    this.getData()
    this.getPopulationData()

    console.log("this.state.data", this.state.data)


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
    // returns empty JSON
      this.getData()
    })
    console.log("year button clicked", event.target.value)
  }

  handleYearDropdownSubmit(event) {
    // returns empty JSON
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


  // ==================================
  // Drawing the Chart function
  // ==================================
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
      .range(["#675375", "#8d4944", "#613563", "#696d9c", "#94aacc"]);
      // .range(["#5F5449", "#9B6A6C", "#C4A4AA", "#B3D1C6", "#76AED3"]);
      // .range(["#C5DCA0", "#9C9BC9", "#C44A5C", "#A0DDFF", "#AF649B"]);


    // ==================================
    // ToolTip!
    // ==================================
    let tooltip = d3.select("body")
      .append("div")
      .attr("class", "toolTip");




    // d3.json(this.state.openDataSourceLink).then( (data) => {
    //   console.log("data from inside d3.json():", data)

    //       Not working
    //     data.sort(function(a, b) {
    //       return a[this.state.refuseType] - b[this.state.refuseType];
    //     });


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
          .html("insert neighborhood name")
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

      // });
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

