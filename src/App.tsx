import React, { useState, ChangeEvent, useEffect, FormEventHandler } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import _lodash from 'lodash';
import popNeighbData from './popNeighbData';
import Sidebar from './components/Sidebar';
import ChartHeader from './components/ChartHeader';
import BarChart from './components/BarChart';
import Footer from './components/Footer';
import { BoroughType, RefuseType, DataType, CommunityDistrictNameType, PopNeighbDataType, CityResponseDataType, BoroughDistrictType } from './types';

// TODO: replace any types
let tempNeighbDataResult: any[];
let cityResponseData: CityResponseDataType[] = [];
let tempData: any[] = [];
let data : DataType[] = [];

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [refuseType, setRefuseType] = useState<RefuseType>('allcollected');
  const [sortType, setSortType] = useState('sort ascending');

  function getData() {
    let openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?$where=month like '%25${year}%25'`;

    axios
      .get(openDataSourceLink)
      .then((response) => {
        // 1) Empty data array
        data = [];
        // 2) The response data needs manipulation before
        // we can draw the chart. While we're manipulating
        // the data, we'll store the data in tempData.
        cityResponseData = response.data;
        // console.log(`City's response.data:`, response.data)

        // 2) massage the data to fit specific needs
        addBoroughDistrictToData(cityResponseData);
        weightFromStringToNumber(tempData);
        removeExtraSpacesInMonthValue(tempData);
        addNeighborhoodNamesAndPopulation(tempData);
        add12Months(tempData);
        addAllRefuseTypes(tempData);
      
        data = tempData;

        // 3) sort the data according to user choice (asc, desc, alphabetical)
        dataSortAscDescOrAlphabetically(data);

        // 4) clear the current chart
        d3.selectAll('svg > *').remove();

        // 5) then, drawChart Yay!
        drawChart();
      })
      .catch(function (error) {
        console.log('getData() error: ', error);
        // TODO: Add a UI element to show user an error
        // TODO: Add a spinner but also stop the spinner in a finally
      });
  }

  /* ################################
   Invoke the getData function
   ################################## */
  getData();

  /* ==================================
   Add key:value that contains both borough & district together
   ================================== */
  function addBoroughDistrictToData(dataArray: any[]) {
    const newData = _lodash.map(dataArray, (entry) => {
      let object = Object.assign({}, entry);
      object.boroughDistrict = entry.borough + ' ' + entry.communitydistrict;
      return object;
    });
    tempData = newData;
    console.log('addBoroughDistrictToData tempData[0]:', tempData[0])
  }

  /* ==================================
   Add key:value that contains total weight all refuse
   (add trash + recycling + compost for a grand total)
   ================================== */
  function addAllRefuseTypes(dataArray: any[]) {
    const newData = _lodash.map(dataArray, (entry) => {
      let newKey = Object.assign({}, entry);
      newKey.allcollected =
        entry.refusetonscollected +
        entry.papertonscollected +
        entry.mgptonscollected +
        entry.resorganicstons +
        entry.xmastreetons +
        entry.leavesorganictons;
      return newKey;
    });
    tempData = newData;
  }

  /* ==================================
   Getting the neighborhood & population data from one dataset,
   and adding it to the main dataset
   ================================== */
  function addNeighborhoodNamesAndPopulation(dataArray: any[]) {
    dataArray.forEach((entry) => {
      /* 
      Weird edge case: in 2020 the DSNY Monthly Tonnage by District 
      dataset introduced a Community District in Queens called 7A 
      (I don't know what that is). There is no corresponding 7A in
      the New York City Population By Community Districts dataset,
      so the presence of 7A breaks the algorithm. Below, when we
      encounter it, it simply "returns" and moves onto the next entry.
      */

      // TODO: create a more robust solution where you kick out any data that doesn't
      // appear the neighborhood dataset.
      if (entry.communitydistrict === '7A') return;
      // filter() creates new array with all elements that pass a "test"
      tempNeighbDataResult = popNeighbData.filter((popEntry) => {
        _lodash.includes(tempNeighbDataResult, popEntry);

        // In this case, the "test" is, are both boroughDistrict the same?
        let result = entry.boroughDistrict === popEntry.boroughDistrict;
        return result;
      });

      /* 
        Yes? cool. Then for the current entry we're on, give it a key
        of communityDistrictName, and assign it the value of the communityDistrictName
        in our tempNeighbDataResult.
        Now put that result into entry, and move onto the next one
        */

      entry.communityDistrictName = tempNeighbDataResult[0].communityDistrictName;
      entry._2020_population = tempNeighbDataResult[0]._2020_population;
      entry._2010_population = tempNeighbDataResult[0]._2010_population;
    });
  }

  /*
   ==================================
  Sorts the data ascending, descending or alphabetically,
  depending on user choice
  ==================================
  */
 // TODO: use 2020 population for 2020 onwards
  function dataSortAscDescOrAlphabetically(data: DataType[]) {
    if (sortType === 'sort ascending') {
      data.sort((a: DataType, b: DataType) =>
        d3.ascending(a[refuseType] / a._2010_population, b[refuseType] / b._2010_population)
      );
    } else if (sortType === 'sort descending') {
      data.sort((a: DataType, b: DataType) =>
        d3.descending(a[refuseType] / a._2010_population, b[refuseType] / b._2010_population)
      );
    } else if (sortType === 'sort alphabetical') {
      data.sort((a: DataType, b: DataType) => d3.descending(b.boroughDistrict, a.boroughDistrict));
    } else {
      // default is ascending
      data.sort((a: DataType, b: DataType) =>
        d3.ascending(a[refuseType] / a._2010_population, b[refuseType] / b._2010_population)
      );
    }
  }

  /* ==================================
  The raw data needs changes:
  1) the refuse weights need to be changed from strings to numbers
  2) the NaN weights need to be changed to 0
  ================================== */
  function weightFromStringToNumber(dataArray: any[]) {
    const newData = _lodash.map(dataArray, (entry) => {
      // .parseInt turns weights from strings to numbers
      // If an entry doesn't exist (which happens frequently), insert 0
      // If we don't check for non-existent entries, NaN is inserted,
      // NaNs don't break the app, but they are ugly and confusing to the user. 
      entry.refusetonscollected = _lodash.parseInt(entry.refusetonscollected || 0);
      entry.papertonscollected = _lodash.parseInt(entry.papertonscollected || 0);
      entry.mgptonscollected = _lodash.parseInt(entry.mgptonscollected || 0);
      entry.resorganicstons = _lodash.parseInt(entry.resorganicstons || 0);
      entry.leavesorganictons = _lodash.parseInt(entry.leavesorganictons || 0);
      entry.schoolorganictons = _lodash.parseInt(entry.schoolorganictons || 0);
      entry.xmastreetons = _lodash.parseInt(entry.xmastreetons || 0);
      entry.allcollected = _lodash.parseInt(entry.allcollected || 0);
      return entry;
    });

    tempData = newData;
    console.log('weightFromStringToNumber tempData[17]:', tempData[17])
  }


  /* ==================================
  The raw data from the city has extra spaces in the month
  like this: '2023 / 04'. Here we remove those spaces
  ================================== */
  function removeExtraSpacesInMonthValue(dataArray: any[]) {
    const newData = _lodash.map(dataArray, (entry) => {
      entry.month = entry.month.replace(/\s+/g, '');
      return entry;
    });
    tempData = newData;
    console.log('removeExtraSpacesInMonthValue tempData[12]:', tempData[12])
  }
  /* ==================================
  The source data is monthly, but we're only interested in yearly totals
  So, the 12 months of data needs to be added all together.
  ================================== */
  function add12Months(dataArray: DataType[]) {
    // let borough: BoroughType;
    // let communityDistrictName: CommunityDistrictNameType;

    // 1) Find all the unique districts (so we can later add their monthly totals)
    // This creates an array of 59 objects with ALL the data
    // We're only interested in the boroughDistrict strings
    let dataArrayWithUniqueDistricts = _lodash.uniqBy(dataArray, (item) => {
      return item.boroughDistrict;
    });
    // This creates an array of 59 unique boroughDistrict strings
    // I.e. - 'Brooklyn 06'
    const allBoroughDistrictsArray: BoroughDistrictType[] = _lodash.map(dataArrayWithUniqueDistricts, (item) => {
      return item.boroughDistrict;
    });

    // 2) Map over allBoroughDistrictsArray. For every boroughDistrict,
    // filter some information we'll need from dataArray,
    // and the sum of all 12 months tonnage per year
    const newData = _lodash.map(allBoroughDistrictsArray, (boroughDistrict) => {
      const allBoroughDistricts = _lodash.filter(dataArray, (item) => {
        return item.boroughDistrict === boroughDistrict;
      });

      // TODO: the below two code blocks don't appear to do anything
      // or do they? Figure out if you can remove them.
      // let borough: any  = _lodash.filter(data, (item) => {
      //   return item.borough === borough;
      // });
      
      // let communityDistrictName: any = _lodash.filter(data, (item) => {
      //   return item.communityDistrictName === communityDistrictName;
      // });

      // TODO: refactor below code to be more DRY
      // the sum of all 12 months tonnage per year
      const refusetonscollected = _lodash.sumBy(allBoroughDistricts, (item) => {
        return item.refusetonscollected;
      });

      const papertonscollected = _lodash.sumBy(allBoroughDistricts, (item) => {
        return item.papertonscollected;
      });

      const mgptonscollected = _lodash.sumBy(allBoroughDistricts, (item) => {
        return item.mgptonscollected;
      });

      const resorganicstons = _lodash.sumBy(allBoroughDistricts, (item) => {
        return item.resorganicstons;
      });

      const leavesorganictons = _lodash.sumBy(allBoroughDistricts, (item) => {
        return item.leavesorganictons;
      });

      const schoolorganictons = _lodash.sumBy(allBoroughDistricts, (item) => {
        return item.schoolorganictons;
      });

      const xmastreetons = _lodash.sumBy(allBoroughDistricts, (item) => {
        return item.xmastreetons;
      });

      return {
        boroughDistrict: boroughDistrict,
        borough: allBoroughDistricts[0].borough,
        communityDistrictName: allBoroughDistricts[0].communityDistrictName,
        _2010_population: allBoroughDistricts[0]._2010_population,
        refusetonscollected: refusetonscollected,
        papertonscollected: papertonscollected,
        mgptonscollected: mgptonscollected,
        resorganicstons: resorganicstons,
        leavesorganictons: leavesorganictons,
        schoolorganictons: schoolorganictons,
        xmastreetons: xmastreetons,
      };
    });
    tempData = newData;
  }

  function refuseTypeSubmit(event: ChangeEvent<HTMLFormElement>): void {
    // Set the refuseType state with whatever button user pressed,
    // useState is then triggered to get the data
    setRefuseType(event.target.id as RefuseType);
  }
  
  function yearDropdownSubmit(event: ChangeEvent<HTMLFormElement>): void {
    let selectedYear = Number(event.target.value)
    // TODO: would a promise work here? Instead of triggering a useEffect?
    setYear(selectedYear);
    event.preventDefault();
  }

  function sortOrderRadioSubmit(event: ChangeEvent<HTMLFormElement>): void {
    setSortType(event.target.value);
  }

  useEffect( () => {
    // TODO: getting the data doesn't make sense for sortType.
    // could rearrange the data array instead?
    getData();
  }, [refuseType, sortType, year])



  /* **********************************
  Drawing the Chart function
  ********************************** */

  function drawChart() {
    const svg = d3.select('svg');

    const margin = { top: 60, right: 140, bottom: 190, left: 150 };
    const width = Number(svg.attr('width'));
    const height = Number(svg.attr('height'));

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /* ==================================
    Colors
    ================================== */
    let colorBars = d3
      .scaleOrdinal()
      .domain(['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'])
      .range(['#21E0D6', '#EF767A', '#820933', '#6457A6', '#2C579E']);

    /* ==================================
    ToolTip
    ================================== */
    let tooltip = d3.select('body').append('div').attr('class', 'tool-tip');

    /* ==================================
    Establishing the Domain(data) & Range(viz)
    ================================== */
    const xScale = d3
      .scaleLinear()
      // domain the min and max value of domain(data)

      .domain([0, d3.max(data, (d) => (d[refuseType] / d._2010_population) * 2000)!])
      // range the min and max value of range(the visualization)
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      // 1) Domain. the min and max value of domain(data)
      // 2) Range. the min and max value of range(the visualization)
      .domain(data.map((d) => d.boroughDistrict))
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    /* ==================================
    Drawing the Axes (left, top, bottom)
    ================================== */
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisTop(xScale));
    // a scale on the bottom too, b/c the chart is so long
    g.append('g').call(d3.axisBottom(xScale)).attr('transform', `translate(0, ${innerHeight})`);

    /* ==================================
    Drawing the Bars
    ================================== */
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .style('fill', (d: DataType): any => {
        return colorBars(d['borough']);
      })
      .attr('y', (d: DataType) => yScale(d.boroughDistrict) as number)
      .attr('width', (d: DataType) => xScale((d[refuseType] / d._2010_population) * 2000))
      // bandwidth is computed width
      .attr('height', yScale.bandwidth())

    /* ==================================
    Mouseover: bars turn yellow
    note: don't use an arrow function here
    ================================== */
    .on('mouseover', function () {
      d3.select(this).transition().duration(200).style('fill', '#ffcd44');
    })
    
    /* ==================================
    Mouseover: when user moves mouse off bar,
    remove yellow fill by applying
    original colors again
    note: don't use an arrow function for first function
    ================================== */
    .on('mouseout', function (d: any) {
      d3.select(this)
      .transition()
      .duration(200)
      .style('fill', function(this: SVGRectElement, d: any): string {
        return colorBars(d.borough) as string;
      });
    })

      /* ==================================
    Tool Tip - on
    ================================== */
      // TODO: display 2020 population if user has selected the year 2020 onward
      // TODO: refactor <li> to be more DRY
      .on('mousemove', (event, d) => {
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 120 + 'px')
          .style('display', 'inline-block').html(`<h4>  ${d.communityDistrictName}  </h4>
                  2010 population:  ${new Intl.NumberFormat().format(d._2010_population)} </br></br>
                  neighborhood total: ${new Intl.NumberFormat().format(
                    d[refuseType]
                  )} tons/year</br>
                  per person: ${Math.round(
                    (d[refuseType] / d._2010_population) * 2000
                  )} pounds/year</br></br>

                  <p>Breakdown of refuse by percent:</p>

                  <ul>

                  <li>trash: ${(
                    (d.refusetonscollected * 100) /
                    (d.mgptonscollected +
                      d.resorganicstons +
                      d.papertonscollected +
                      d.refusetonscollected +
                      d.xmastreetons +
                      d.leavesorganictons)
                  ).toFixed(1)} % </li></br>

                  <li>paper & cardboard: ${(
                    (d.papertonscollected * 100) /
                    (d.mgptonscollected +
                      d.resorganicstons +
                      d.papertonscollected +
                      d.refusetonscollected +
                      d.xmastreetons +
                      d.leavesorganictons)
                  ).toFixed(1)} % </li></br>

                  <li>metal/glass/plastic: ${(
                    (d.mgptonscollected * 100) /
                    (d.mgptonscollected +
                      d.resorganicstons +
                      d.papertonscollected +
                      d.refusetonscollected +
                      d.xmastreetons +
                      d.leavesorganictons)
                  ).toFixed(1)} % </li></br>

                  <li>brown bin organics: ${(
                    (d.resorganicstons * 100) /
                    (d.mgptonscollected +
                      d.resorganicstons +
                      d.papertonscollected +
                      d.refusetonscollected +
                      d.xmastreetons +
                      d.leavesorganictons)
                  ).toFixed(1)} % </li></br>

                  <li>leaves: ${(
                    (d.leavesorganictons * 100) /
                    (d.mgptonscollected +
                      d.resorganicstons +
                      d.papertonscollected +
                      d.refusetonscollected +
                      d.xmastreetons +
                      d.leavesorganictons)
                  ).toFixed(1)} % </li></br>

                  <li>christmas trees:  ${(
                    (d.xmastreetons * 100) /
                    (d.mgptonscollected +
                      d.resorganicstons +
                      d.papertonscollected +
                      d.refusetonscollected +
                      d.xmastreetons +
                      d.leavesorganictons)
                  ).toFixed(1)} % </li>

                  </ul>`);
      });

    /* ==================================
    Tool Tip - off
    ================================== */
    g.on('mouseout', () => {
      tooltip.style('display', 'none');
    });

    /* ==================================
    Bar Labels
    ================================== */
    g.selectAll('.text')
      .data(data)
      .enter()
      .append('text')
      // starting with 0 opacity, ending at 1 to help with jarring effect
      .style('opacity', 0)
      .attr('class', 'label')
      .text((d) => {
        return (
          new Intl.NumberFormat().format((d[refuseType] / d._2010_population) * 2000) +
          ' lbs/person'
        );
      })
      // ! asserts that the expression is not undefined
      .attr('y', (d) => yScale(d.boroughDistrict)! + 20)
      .attr('x', (d) => xScale((d[refuseType] / d._2010_population) * 2000) + 5)
      .style('opacity', 1);

    /* ==================================
    Bar Exits
    ================================== */
    g.selectAll('rect').data(data).exit().transition().duration(500).remove();
  }

  /* ==================================
   And finally, the render
   ================================== */
  return (
    <div className='App row'>
      <div className='sidebar-container col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3'>
        <Sidebar
          year={year}
          refuseTypeSubmit={refuseTypeSubmit}
          yearDropdownSubmit={yearDropdownSubmit}
          sortOrderRadioSubmit={sortOrderRadioSubmit}
        />
      </div>

      <div className='chart-container col-xs-12 col-sm-8 col-md-9 col-lg-9 col-xl-9'>
        <ChartHeader year={year} refuseType={refuseType} />
        <BarChart />
        <Footer />
      </div>
    </div>
  );
}
