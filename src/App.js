import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import _lodash from 'lodash';
import popNeighbData from './popNeighbData';
import Sidebar from './Sidebar';
import ChartHeader from './ChartHeader';
import BarChart from './BarChart';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      valueForColors: "borough",
      refuseType: "refusetonscollected",
      refuseType: "allcollected",
      // boroughOrCityWide valies: city, borough, neighborhood
      // boroughOrCityWide: "neighborhood",
      year: "2018",
      // dataSort values: ascending, descending or alphabetical
      dataSort: 'ascending',
      totalOrPerPerson: 'per person'
    }

  //  ==================================
  //  "this" binding
  //  ==================================
    this.refuseTypeSubmit = this.refuseTypeSubmit.bind(this)
    this.yearDropdownSubmit = this.yearDropdownSubmit.bind(this)
    this.sortOrderRadioSubmit = this.sortOrderRadioSubmit.bind(this)
    this.totalOrPPRadioSubmit = this.totalOrPPRadioSubmit.bind(this)
  }

  //  ==================================
  //  Get the data
  //  ==================================
  getData(){

    let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?$where=month like '%25${this.state.year}%25'`
    // let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?month=${this.state.year}%20/%2010`

    axios.get(openDataSourceLink)
      .then( (response) =>  {


        // 1) setState with original data source
        this.setState({data: response.data})

        // 2) massage the data to fit specific needs
        this.addBoroughCDKeyData()
        this.addBoroughCDKeyPopData()
        this.fixMonthWeightToString()
        this.addNeighborhoodNamesPopulation()
        this.add12Months()

        // TODO
        // this.boroughWideTotals()

        // 3) sort the data according to user choice (asc, desc, alpha)
        this.dataSort()

        // 4) then, drawChart!!!! ************
        this.drawChart();

      }).catch(function (error) {
        console.log(error);
      });
  }


   // ********************************
   // Component Did Mount
   // ********************************
   componentDidMount(){
    this.getData()
   }


   // Add key:value that contains both bourough & district together
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


   // Add key:value that contains both bourough & district together
   addBoroughCDKeyPopData() {
    const newData =

    _lodash.map(popNeighbData, (entry) => {
      let newKey = Object.assign({}, entry);
      newKey.boroughDistrict = entry.borough + ' ' + entry.communitydistrict
      return newKey;
    })
    this.popNeighbData = newData
   }


  addNeighborhoodNamesPopulation() {
    this.state.data.forEach( (entry) => {

    // filter() creates new array with all elements that pass a "test"
      let tempResult = this.popNeighbData.filter( (popEntry) => {

        // In this case, the "test" is, are both boroughDistrict the same?
        const result = (entry.boroughDistrict === popEntry.boroughDistrict);
        return result
      })
        // Yes? cool. Then for the current entry we're on, give it a key of cd_name,
        // and assign it the value of the cd_name in our tempResult.
        // Now put that result into entry, and move onto the next one
        entry.cd_name = tempResult[0].cd_name
        entry._2010_population = tempResult[0]._2010_population
        entry._2000_population = tempResult[0]._2000_population
        entry._1990_population = tempResult[0]._1990_population
        entry._1980_population = tempResult[0]._1980_population
        entry._1970_population = tempResult[0]._1970_population
    });
  }

  // ==================================
  // Sorts the data ascending, descending or alphabetically,
  // depending on user choice (see this.state.dataSort)
  // ==================================
  dataSort() {
    if (this.state.dataSort === 'ascending') {
      this.state.data.sort( (a,b) => d3.ascending(a[this.state.refuseType]/a._2010_population,b[this.state.refuseType]/b._2010_population))
      console.log("Sort ascending", this.state.data)
    }
      else if (this.state.dataSort === 'descending') {
        this.state.data.sort( (a,b) => d3.descending(a[this.state.refuseType]/a._2010_population,b[this.state.refuseType]/b._2010_population))
        console.log("Sort descending", this.state.data)
    }
      else {
        this.state.data.sort( (a,b) => d3.descending(b.boroughDistrict,a.boroughDistrict))
        console.log("Sort alphabetical", this.state.data)
    }
  };



  // ==================================
  // The raw data needs changes:
  // 1) the month entries need spaces removed
  // 2) the refuse weights need to be changed from strings to numbers
  // 3) the NaN weights need to be changed to 0
  // ==================================
   fixMonthWeightToString() {
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
        entry.allcollected =   _lodash.parseInt(entry.allcollected)



        // if an entry doesn't exist, the above .parseInt function inserts an entry with
        // a value of NaN. We can't have that, so we must turn those NaNs into 0
        if (Number.isNaN(entry.resorganicstons) === true ) { entry.resorganicstons = 0}
        if (Number.isNaN(entry.leavesorganictons) === true ) { entry.leavesorganictons = 0}
        if (Number.isNaN(entry.schoolorganictons) === true ) { entry.schoolorganictons = 0}
        if (Number.isNaN(entry.xmastreetons) === true ) { entry.xmastreetons = 0}
        return entry
       })

    this.setState({data: newData})
  }

  // ==================================
  // Calculating Borough-wide totals
  // NOT USING
  // ==================================
  boroughWideTotals() {
    // 1) find all unique boroughs (so we can later add their totals)
    let uniqueBoroughs = _lodash.uniqBy(this.state.data, (item)=>{
      return item.borough
    })

    //  2) now map over the list, and pluck out the borough name only
    let allBoroughs = _lodash.map(uniqueBoroughs, (item)=>{
      return item.borough
    })

   //  3) now map over the tiny allBoroughs array
    const newData = _lodash.map(allBoroughs, (borough)=>{

      allBoroughs = _lodash.filter(this.state.data, (item)=>{
        return item.borough === borough
      })

      //------
      const leavesorganictons = _lodash.sumBy(allBoroughs, (item)=>{
        return item.leavesorganictons
      })
      // -----
      const papertonscollected = _lodash.sumBy(allBoroughs, (item)=>{
        return item.papertonscollected
      })
      //------
      const refusetonscollected = _lodash.sumBy(allBoroughs, (item)=>{
        return item.refusetonscollected
      })
      //------
      const mgptonscollected = _lodash.sumBy(allBoroughs, (item)=>{
        return item.mgptonscollected
      })

    return {
      borough: borough,
      _2010_population:allBoroughs[0]._2010_population,
      leavesorganictons: leavesorganictons,
      papertonscollected: papertonscollected,
      refusetonscollected: refusetonscollected,
      mgptonscollected: mgptonscollected,
      }
  })
  console.log("Borough-wide data:", newData)
}

  // ==================================
  // The source data is monthly, but we're
  // only interested in yearly totals. So, the
  // data needs to be collapsed.
  // ==================================
  add12Months() {
    // 1) let's find all the unique districts (so we can later add their monthly totals)
    let allBoroughDistrict = _lodash.uniqBy(this.state.data, (item)=>{
      return item.boroughDistrict
    })

    // 2) map over the allBoroughDistrict to return some information we'll need, and
    // the sum of all 12 months tonnage per year
     allBoroughDistrict = _lodash.map(allBoroughDistrict, (item)=>{
      return item.boroughDistrict
    })

    const newData = _lodash.map(allBoroughDistrict, (boroughDistrict)=>{

        const allBoroughDistrict = _lodash.filter(this.state.data, (item)=>{
          return item.boroughDistrict === boroughDistrict
        })

        const borough = _lodash.filter(this.state.data, (item)=>{
          return item.borough === borough
        })

        const cd_name = _lodash.filter(this.state.data, (item)=>{
          return item.cd_name === cd_name
        })

        const refusetonscollected = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.refusetonscollected
        })

        const papertonscollected = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.papertonscollected
        })

        const mgptonscollected = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.mgptonscollected
        })

        const resorganicstons = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.resorganicstons
        })

        const leavesorganictons = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.leavesorganictons
        })

        const schoolorganictons = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.schoolorganictons
        })

        const xmastreetons = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.xmastreetons
        })

        const allcollected = _lodash.sumBy(allBoroughDistrict, (item)=>{
          return item.allcollected = (item.refusetonscollected + item.papertonscollected + item.mgptonscollected + item.resorganicstons + item.schoolorganictons + item.xmastreetons)
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
        allcollected: allcollected,
        }
    })
    console.log("data after collapsing 12 months:", newData)
    this.setState({data: newData})
  }

   //  ==================================
   //  Borough or City-wide buttons
   //  ==================================
   // boroughSubmit(event) {
   //   // 1) remove the current chart
   //   d3.selectAll("svg > *").remove()
   //   // 2) set the state with empty data (get rid of old data)
   //   this.setState({data: []})
   //   // 3) set the refuseType state with whatever button user pressed,
   //   // then, get the data (as a callback function to avoid async behavior)
   //   this.setState({boroughOrCityWide: event.target.id}, () => {
   //     this.getData()
   //   })
   //    console.log("Borough button clicked", event.target.id)
   // }


   //  ==================================
   //  Refuse-type buttons
   //  ==================================
   refuseTypeSubmit(event) {
     // 1) remove the current chart
     d3.selectAll("svg > *").remove()
     // 2) set the state with empty data (get rid of old data)
     this.setState({data: []})
     // 3) set the refuseType state with whatever button user pressed,
     // then, get the data (as a callback function to avoid async behavior)
     this.setState({refuseType: event.target.id}, () => {
       this.getData()
     })
      console.log("Refuse type button clicked", event.target.id)
   }

 //  ==================================
 //  Year Dropdown Menu
 //  ==================================
   yearDropdownSubmit(event) {
    // 1) remove the current chart
    d3.selectAll("svg > *").remove()
    // 2) set the state with the selected year
    this.setState({year: event.target.value}, () => {
      // 3) get the new data, draw the chart.
      // reminder: this.drawChart is inside this.getData
      // note: this.getData() is a callback function to
      // avoid nasty async behavior
      this.getData()
    })
    console.log("year button clicked", event.target.value)
    event.preventDefault();
  }

 //  ==================================
 //  Sort Order Radio Buttons
 //  ==================================
   sortOrderRadioSubmit(event) {
    // 1) remove the current chart
    d3.selectAll("svg > *").remove()

    this.setState({dataSort: event.target.value}, () => {
      this.dataSort()
      this.getData()
    })
    console.log("sort button clicked: ", event.target.value)
  }

 //  ==================================
 //  Total or Per Person Radio Buttons
 //  NOT USING
 //  ==================================
   totalOrPPRadioSubmit(event) {
    // 1) remove the current chart
    d3.selectAll("svg > *").remove()

    this.setState({totalOrPerPerson: event.target.value}, () => {
      this.getData()
    })
    console.log("sort button clicked: ", event.target.value)
  }



  // **********************************
  // Drawing the Chart function
  // **********************************

   drawChart() {
    const svg = d3.select("svg")
    const margin = {top: 60, right: 127, bottom: 190, left: 150};
    const width = svg.attr('width')
    const height = svg.attr('height')

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // ==================================
    // Colors!
    // ==================================
    let colorBars = d3.scaleOrdinal()
      .domain(["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"])
      .range(["#21E0D6", "#EF767A", "#820933", "#6457A6", "#FFE347"]);


    // ==================================
    // ToolTip!
    // ==================================
    let tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tool-tip");

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

    // const yAxis = d3.axisLeft(yScale)
    const g = svg.append('g')
                 .attr('transform', `translate(${margin.left}, ${margin.top})`)





    // ==================================
    // Drawing the Axes (left, top, bottom)
    // ==================================
    g.append('g')
     .transition() //a slight delay, see duration(500)
     .call(d3.axisLeft(yScale))
     .duration(500) //a slight delay, see transition()

    g.append('g')
     .transition() //a slight delay, see duration(500)
     .call(d3.axisTop(xScale))
     .duration(500) //a slight delay, see transition()


    // a scale on the bottom too, b/c the chart is so long
    g.append('g')
     .call(d3.axisBottom(xScale))
     .attr('transform', `translate(0, ${innerHeight})`)


    // ==================================
    // Drawing the Bars
    // ==================================
     g.selectAll('rect')
      .data(this.state.data)
      .enter()
      .append('rect')
      // .transition() //a slight delay, see duration(500)
      .style("fill", (d) => {return colorBars(d[this.state.valueForColors])})
      .attr('y', d => yScale(d.boroughDistrict))
      // .attr('width', d => xScale(d[this.state.refuseType]))
      .attr('width', d => xScale(d[this.state.refuseType]/d._2010_population * 2000))
      // bandwidth is computed width
      .attr('height', yScale.bandwidth())
      // .duration(500)

      // const bars = g.selectAll('rect')
      //               .data(this.state.data)
      //               .enter()
      //               .append('rect')
      //               .style("fill", (d) => {return colorBars(d[this.state.valueForColors])})


      // bars
      //     // .transition()
      //     .attr('y', d => yScale(d.boroughDistrict))
      //     // .attr('width', d => xScale(d[this.state.refuseType]))
      //     .attr('width', d => xScale(d[this.state.refuseType]/d._2010_population * 2000))
      //     // bandwidth is computed width
      //     .attr('height', yScale.bandwidth())
      //     // .duration(500)

    // ==================================
    // Tool Tip - on
    // ==================================
      .on("mousemove", (d) => {
        tooltip.style("left", d3.event.pageX + 10 + "px")
               .style("top", d3.event.pageY - 120 + "px")
               .style("display", "inline-block")
               // displays the value of cd_name(neighborhood)
               .html('<h4>' + d.cd_name + '</h4>' +
                '2010 population: ' + new Intl.NumberFormat().format(d._2010_population) + '</br></br>' +
                'neighboood total: ' + new Intl.NumberFormat().format(d[this.state.refuseType]) + ' tons/year</br>' +
                'per person: ' + Math.round(d[this.state.refuseType]/d._2010_population * 2000) + ' pounds/year</br></br>' +

                // Math.round(
                  '<p>Breakdown of refuse by percent:</p>' +

                  'trash: ' + (d.refusetonscollected * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1) + '% </br>' +

                  'paper & cardboard: ' + (d.papertonscollected * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1) + '% </br>' +

                  'metal/glass/plastic: ' + (d.mgptonscollected * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1) + '% </br>' +

                  'brown bin organics: ' + (d.resorganicstons * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1) + '% </br>' +

                  'leaves: ' + (d.leavesorganictons * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1) + '% </br>' +

                  'christmas trees: ' + (d.xmastreetons * 100/(d.mgptonscollected + d.resorganicstons +
                  d.papertonscollected + d.refusetonscollected + d.xmastreetons + d.leavesorganictons)).toFixed(1) + '% </br>'
                  // )

               )

      })

    // ==================================
    // Tool Tip - off
    // ==================================
      g.on("mouseout", (d) => { tooltip.style("display", "none");})


    // ==================================
    // Bar Labels
    // ==================================
      g.selectAll(".text")
      .data(this.state.data)
      .enter()
      .append("text")
      .style("opacity", 0) // starting with 0 opacity, ending at 1 to help with jarring effect
      // .transition()
        .attr("class","label")
        // .text( (d) => {return new Intl.NumberFormat().format(Math.round(d[this.state.refuseType]))+ " tons";})
        .text( (d) => {return new Intl.NumberFormat().format((d[this.state.refuseType]/d._2010_population) * 2000 )+ " lbs/person";})

        .attr('y', d => yScale(d.boroughDistrict) + 20)
        // .attr('x', d => xScale(d[this.state.refuseType]) - 75)
        .attr('x', d => xScale(d[this.state.refuseType]/d._2010_population * 2000) + 5 )
      .style("opacity", 1)
      // .duration(500)


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
 //  Make responsive
 //  ==================================



  //  ==================================
  //  And finally, the render
  //  ==================================
  render() {
    return (

      <div className="App">

        <Sidebar refuseTypeSubmit={this.refuseTypeSubmit}
                 boroughSubmit={this.boroughSubmit}
                 yearDropdownSubmit={this.yearDropdownSubmit}
                 sortOrderRadioSubmit={this.sortOrderRadioSubmit}
                 totalOrPPRadioSubmit={this.totalOrPPRadioSubmit}
                 />

        <div className="chart-container">
          <ChartHeader year={this.state.year} refuseType={this.state.refuseType} />
          <BarChart />
        </div>

      </div>
    );
  }
}


