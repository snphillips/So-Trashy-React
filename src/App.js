import React, { Component } from 'react';
import * as d3 from 'd3';
// import { json, csv } from 'd3-fetch';

import Sidebar from './Sidebar';
import Footer from './Footer';
import ChartHeader from './ChartHeader';
import BarChart from './BarChart';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForColors: "borough",
      refuseType: "refusetonscollected",
      year: "2018",
      borough: "All Boroughs",
      openDataSourceLink: `https://data.cityofnewyork.us/resource/8bkb-pvci.json?month=2017%20/%2010`,

    }
  //  ==================================
  //  "this" binding
  //  ==================================
    this.refuseTypeButton = this.refuseTypeButton.bind(this)
    this.yearButton = this.yearButton.bind(this)
    this.boroughButton = this.boroughButton.bind(this)

  }



   componentDidMount(){
     this.draw()
   }


   refuseTypeButton(event) {
    console.log("Refuse type button clicked", event.target.id)
    this.setState({refuseType: "id"})
    this.draw()
   }

   yearButton(event) {
    console.log("year button clicked", event.target.id)
    this.setState({year: "id"})
    this.draw()
   }


   boroughButton(event) {
    console.log("borough button clicked", event.target.id)
    this.setState({borough: "id"})
    this.draw()
   }






  // ==================================
  // Drawing the Chart function
  // ==================================
   draw() {


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
      .range(["#5F5449", "#9B6A6C", "#C4A4AA", "#B3D1C6", "#76AED3"]);


    // ==================================
    // ToolTip!
    // ==================================
    let tooltip = d3.select("body")
      .append("div")
      .attr("class", "toolTip");



       d3.json(this.state.openDataSourceLink).then( (data) => {
         console.log("data from inside d3.json():", data)


         // ==================================
    // Establishing the Domain(data) & Range(viz)
    // ==================================
    const xScale = d3.scaleLinear()
      // 1) Domain. the min and max value of domain(data)
      // 2) Range. the min and max value of range(the visualization)
      .domain([0, d3.max(data, d => d[this.state.refuseType])])
      .range([0, innerWidth])

    const yScale = d3.scaleBand()
      // 1) Domain. the min and max value of domain(data)
      // 2) Range. the min and max value of range(the visualization)
      .domain(data.map(d => d.borough + " " + d.communitydistrict))
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
      .data(data)
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
      .html(
        "insert neighborhood name"+"<br>"+
        (d.month)+"<br>"+
        new Intl.NumberFormat().format(Math.round(d[this.state.refuseType]))+ " tons"
        );})

    // ==================================
    // Tool Tip - off
    // ==================================
      .on("mouseout", function(d){ tooltip.style("display", "none");})


    // ==================================
    // Bar Labels - half working
    // ==================================
     g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("class","label")
      .text( (d) => {return new Intl.NumberFormat().format(Math.round(d[this.state.refuseType]))+ " tons";})

      .attr('y', d => yScale(d.borough + " " + d.communitydistrict) + 20)
      .attr('x', d => xScale(d[this.state.refuseType]) - 65)
























      });
   }










  //  ==================================
  //  And finally, the render
  //  ==================================
  render() {
    return (

      <div className="App">

        <Sidebar refuseTypeButton={this.refuseTypeButton}
                 yearButton={this.yearButton}
                 boroughButton={this.boroughButton}
                 />
        <BarChart />
        <Footer />
        <ChartHeader year={this.state.year} refuseType={this.state.refuseType} />
        <BarChart />

      </div>
    );
  }
}

