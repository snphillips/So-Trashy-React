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
    }

  //  ==================================
  //  "this" binding
  //  ==================================
    this.refuseTypeSubmit = this.refuseTypeSubmit.bind(this)
    this.handleYearDropdownSubmit = this.handleYearDropdownSubmit.bind(this)
    // this.handleBoroughDropdownSubmit = this.handleBoroughDropdownSubmit.bind(this)
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
        this.setState({data: response.data})

        // 2) massage the data to fit specific needs
        this.addBoroughCDKeyData()
        this.addBoroughCDKeyPopData()
        this.massageData()
        this.addNeighborhoodNamesPopulation()

        // 3) sort the data ascending
        this.sortAscending()

        // 4) then, drawChart!!!! ************
        this.drawChart();

      })

      .catch(function (error) {
        console.log(error);
      });
  }



   // ********************************
   // Component Did Mount
   // ********************************
   componentDidMount(){
    this.getData()
    this.massagePopData()
    // console.log("popNeighbData post-manipulation:", popNeighbData);
   }


   // ********************************
   // Component Did Update
   // What goes in here?
   // ********************************
    componentDidUpdate(){
    // have no idea what goes here.
    // this.drawChart() results in double-data on screen
    // this.drawChart()
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
    // console.log("Pop data with new key", this.popNeighbData)
   }


  addNeighborhoodNamesPopulation() {
    this.state.data.forEach( (entry) => {

    // filter() creates new array with all elements that pass a "test"
      let tempResult = this.popNeighbData.filter( (popEntry) => {

        // In this case, the "test" is, are both boroughDistrict the same?
        // Yes? cool. Then for the current entry we're on, give it a key of cd_name,
        // and assign it the value of the cd_name in our tempResult
        const result = (entry.boroughDistrict === popEntry.boroughDistrict);
        // Now put that result into entry, and move onto the next one
        return result
      })

        entry.cd_name = tempResult[0].cd_name
        entry._2010_population = tempResult[0]._2010_population
        entry._2000_population = tempResult[0]._2000_population
        entry._1990_population = tempResult[0]._1990_population
        entry._1980_population = tempResult[0]._1980_population
        entry._1970_population = tempResult[0]._1970_population
    });
    // console.log("After adding neighborhood names & population:", this.state.data)
  }



  sortAscending(){
    this.state.data.sort( (a,b) => d3.ascending(a[this.state.refuseType]/a._2010_population,b[this.state.refuseType]/b._2010_population))
    console.log("after sort ascending", this.state.data)
  }




  // The raw data needs changes:
  // 1) the month entries need spaces removed
  // 2) the refuse weights need to be changed from strings to numbers
   massageData() {
     const newData =

        _lodash.map(this.state.data, (entry) => {

          // removes spaces in month
          entry.month =  entry.month.replace(/\s+/g, '')

          // turn string weights into numbers
          entry.refusetonscollected =   _lodash.parseInt(entry.refusetonscollected)
          entry.papertonscollected =   _lodash.parseInt(entry.papertonscollected)
          entry.mgptonscollected =   _lodash.parseInt(entry.mgptonscollected)
          entry.resorganicstons =   _lodash.parseInt(entry.resorganicstons)
          entry.leavesorganictons =   _lodash.parseInt(entry.leavesorganictons)
          entry.schoolorganictons =   _lodash.parseInt(entry.schoolorganictons)
          entry.xmastreetons =   _lodash.parseInt(entry.xmastreetons)


          if (Number.isNaN(entry.resorganicstons) === true ) { entry.resorganicstons = 0}
          if (Number.isNaN(entry.leavesorganictons) === true ) { entry.leavesorganictons = 0}
          if (Number.isNaN(entry.schoolorganictons) === true ) { entry.schoolorganictons = 0}
          if (Number.isNaN(entry.xmastreetons) === true ) { entry.xmastreetons = 0}
          return entry
        })

    this.setState({data: newData})
  }


     massagePopData() {
     const fixedPopData =

        _lodash.map(popNeighbData, (entry) => {

          // turn string populations into numbers
          entry._1970_population =   _lodash.parseInt(entry._1970_population)
          entry._1980_population =   _lodash.parseInt(entry._1980_population)
          entry._1990_population =   _lodash.parseInt(entry._1990_population)
          entry._2000_population =   _lodash.parseInt(entry._2000_population)
          entry._2010_population =   _lodash.parseInt(entry._2010_population)
          return entry
        })

    this.popNeighbData = fixedPopData
  }


   //  ==================================
   //  Refuse-type buttons
   //  ==================================
   refuseTypeSubmit(event) {
      d3.selectAll("svg > *")
        .remove()
    // experiment. Start by emptying data to begin fresh
    // I don't think it's working
    this.setState({data: []}, () => {
      // console.log("after emptying data array (refuse-type):", this.state.data)
    })

    this.setState({refuseType: event.target.id}, () => {
      this.getData()
    })
      console.log("Refuse type button clicked", event.target.id)
   }

 //  ==================================
 //  Year Dropdown Menu
 //  1) choose a value
 //  2) submit that value.
 //  ==================================
  handleYearDropdownSubmit(event) {
    d3.selectAll("svg > *")
      .remove()
    // experiment. Start by emptying data to begin fresh
    // I don't think it's working
    this.setState({data: []}, () => {
      // console.log("after emptying data array (year):", this.state.data)
    })

    this.setState({year: event.target.value}, () => {
      // Here's where the chart re-renders
      // this.drawChart is inside this.getData
      this.getData()
    })
    console.log("year button clicked", event.target.value)
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
      // .range(["#C5DCA0", "#9C9BC9", "#C44A5C", "#A0DDFF", "#AF649B"]);
      .range(["#3A606E", "#1B998B", "#828E82", "#C6342F", "#D16C7D"]);


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
      // .domain([0, d3.max(this.state.data, d => d[this.state.refuseType])])
      .domain([0, d3.max(this.state.data, d => d[this.state.refuseType]/d._2010_population * 2000 )])
      .range([0, innerWidth])

    const yScale = d3.scaleBand()
      // 1) Domain. the min and max value of domain(data)
      // 2) Range. the min and max value of range(the visualization)
      // .domain(this.state.data.map(d => d.borough + " " + d.communitydistrict + " " + d.month))
      // .domain(this.state.data.map(d => d.borough + " " + d.communitydistrict))
      .domain(this.state.data.map(d => d.boroughDistrict))
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
      .attr('y', d => yScale(d.boroughDistrict))
      // .attr('y', d => yScale(d.borough + " " + d.communitydistrict))

      // .attr('width', d => xScale(d[this.state.refuseType]))
      .attr('width', d => xScale(d[this.state.refuseType]/d._2010_population * 2000))
      // bandwidth is computed width
      .attr('height', yScale.bandwidth())
      .style("fill", (d) => {
        return colorBars(d[this.state.valueForColors])
      })



    // ==================================
    // Tool Tip - on
    // ==================================
      .on("mousemove", function(d){
        tooltip.style("left", d3.event.pageX - -10 + "px")
               .style("top", d3.event.pageY - 50 + "px")
               .style("display", "inline-block")
               // displays the value of cd_name(neighborhood)
               .html(d.cd_name + '</br></br>' +
                'neighboood total: ' + d.refusetonscollected + ' tons' + '</br>' +
                'per person: ' + Math.round(d.refusetonscollected/d._2010_population * 2000) + ' pounds')
      })

    // ==================================
    // Tool Tip - off
    // ==================================
      .on("mouseout", function(d){ tooltip.style("display", "none");})


    // ==================================
    // Bar Labels
    // ==================================
     g.selectAll(".text")
      .data(this.state.data)
      .enter()
      .append("text")
      .attr("class","label")
      // .text( (d) => {return new Intl.NumberFormat().format(Math.round(d[this.state.refuseType]))+ " tons";})
      .text( (d) => {return new Intl.NumberFormat().format((d[this.state.refuseType]/d._2010_population) * 2000 )+ " lbs/person";})

      .attr('y', d => yScale(d.boroughDistrict) + 20)
      // .attr('x', d => xScale(d[this.state.refuseType]) - 75)
      .attr('x', d => xScale(d[this.state.refuseType]/d._2010_population * 2000) + 5 )

    // ==================================
    // Bar Exits
    // How to use this properly?...like, *when*
    // does it get called or activated?...
    // like, if it's just sitting here when we draw the chart,
    // why aren't all the elements removed as soon as they're attached?
    // ==================================
      g.selectAll('rect')
       .data(this.state.data)
       .exit()
       .transition().duration(500)
       .remove()
   }





  //  ==================================
  //  And finally, the render
  //  ==================================
  render() {
    return (

      <div className="App">

        <Sidebar refuseTypeSubmit={this.refuseTypeSubmit}
                 handleYearDropdownSubmit={this.handleYearDropdownSubmit}
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
                 // handleYearDropdownSubmit={this.handleYearDropdownSubmit}

