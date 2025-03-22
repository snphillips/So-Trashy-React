import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import _lodash from 'lodash';
import popNeighbData from './popNeighbData';
import Sidebar from './components/Sidebar';
import ChartHeader from './components/ChartHeader';
import BarChart from './components/BarChart';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { RefuseTypes, DataItemType, CityResponseDataType, AllRefuseTonsCollectedType, CityDataWeightsAsNumbersType, WorkingDataItemType } from './types';

// TODO: Replace the any types with custom types
let tempNeighbDataResult: any[];
let cityResponseData: CityResponseDataType[] = [];
let dataExtraSpaceInMonthRemoved: CityResponseDataType[] = [];
let dataWeightsAreNumbers: CityDataWeightsAsNumbersType[] = [];
let dataWithBoroughDistrict: CityDataWeightsAsNumbersType[] = [];
let dataWithNeighbNamesAndPop: WorkingDataItemType[] = [];
let dataMonthsAdded: DataItemType[] = [];
let dataAllRefuseTypesAdded: DataItemType[] = [];
// const refuseCategories = ['trash','paper & cardboard','metal/glass/plastic', 'brown bin organics', 'leaves', 'christmas trees' ];

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataItemType[]>([]);
  const [year, setYear] = useState(new Date().getFullYear()); // defaults to current year
  const [refuseType, setRefuseType] = useState<RefuseTypes>('allcollected');
  const [sortOrder, setSortOrder] = useState('sort ascending');

  useEffect(() => {
    // Handle changes to data, sortOrder, and refuseType
    if (data.length) {
      dataSortAscDescOrAlphabetically(data);
      drawChart();
    }
  }, [data, sortOrder, refuseType]);

  useEffect(() => {
    getData();
  }, [year]);

  // The getData function is wrapped with useCallback
  // to ensure it's consistent across renders
  // unless the selected year changes.
  const getData = useCallback(() => {
    setLoading(true);
    const openDataSourceLink = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?$where=month like '%25${year}%25'`;

    axios
      .get(openDataSourceLink)
      .then((response) => {
        cityResponseData = response.data;
        // The response data needs manipulation
        // While manipulating the data, store it in tempData.
        removeExtraSpacesInMonthValue(cityResponseData);
        weightFromStringToNumber(dataExtraSpaceInMonthRemoved);
        addBoroughDistrictToData(dataWeightsAreNumbers);
        dataWithNeighbNamesAndPop = addNeighborhoodNamesAndPopulation(dataWithBoroughDistrict);
        add12Months(dataWithNeighbNamesAndPop);
        addAllRefuseTypes(dataMonthsAdded);
        setData(dataAllRefuseTypesAdded);

        dataSortAscDescOrAlphabetically(dataAllRefuseTypesAdded);
      })
      .catch((error) => {
        console.error('getData() error: ', error);
        setError('Failed to load data. Please try again later.');
        // TODO: Add a UI element to show user an error. The rat?
        // Add this to jsx {error && <p className="error-message">{error}</p>}
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year]);

  /* ==================================
   Add key:value that contains both borough & district together
   ================================== */
  function addBoroughDistrictToData(dataArray: CityDataWeightsAsNumbersType[]) {
    const newData = dataArray.map((entry) => {
      const object = Object.assign({}, entry);
      object.boroughDistrict = entry.borough + ' ' + entry.communitydistrict;
      return object;
    });
    dataWithBoroughDistrict = newData;
  }

  /* ==================================
   Add key:value that contains total weight all refuse
   (add trash + recycling + compost for a grand total)
   ================================== */
  function addAllRefuseTypes(dataArray: DataItemType[]) {
    const newData = dataArray.map((entry) => {
      const newKey = Object.assign({}, entry);
      newKey.allcollected =
        entry.refusetonscollected +
        entry.papertonscollected +
        entry.mgptonscollected +
        entry.resorganicstons +
        entry.xmastreetons +
        entry.leavesorganictons;
      return newKey;
    });
    dataAllRefuseTypesAdded = newData;
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

      tempNeighbDataResult = popNeighbData.filter((popEntry) => 
      entry.boroughDistrict === popEntry.boroughDistrict
    );

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
    return dataArray;
  }

  /*
   ==================================
  Sorts the data ascending, descending or alphabetically,
  depending on user choice
  ==================================
  */
  // TODO: use 2020 population for 2020 onwards
  function dataSortAscDescOrAlphabetically(data: DataItemType[]) {
    if (sortOrder === 'sort ascending') {
      data.sort((a: DataItemType, b: DataItemType) =>
        d3.ascending(a[refuseType] / a._2010_population, b[refuseType] / b._2010_population),
      );
    } else if (sortOrder === 'sort descending') {
      data.sort((a: DataItemType, b: DataItemType) =>
        d3.descending(a[refuseType] / a._2010_population, b[refuseType] / b._2010_population),
      );
    } else if (sortOrder === 'sort alphabetical') {
      data.sort((a: DataItemType, b: DataItemType) => d3.descending(b.boroughDistrict, a.boroughDistrict));
    } else {
      // default is ascending
      data.sort((a: DataItemType, b: DataItemType) =>
        d3.ascending(a[refuseType] / a._2010_population, b[refuseType] / b._2010_population),
      );
    }
    return setData(data);
  }

  /* ==================================
  The raw data needs changes:
  1) the refuse weights need to be changed from strings to numbers
  2) the NaN weights need to be changed to 0
  ================================== */
  function weightFromStringToNumber(dataArray: any[]) {
    const newData = dataArray.map((entry) => {
      /* 
      .parseInt turns weights from strings to numbers
      If an entry doesn't exist (which happens frequently), insert 0
      If we don't check for non-existent entries, NaN is inserted,
      NaNs don't break the app, but they are ugly and confusing to the user.
      */
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

    dataWeightsAreNumbers = newData;
  }

  /* ==================================
  The raw data from the city has extra spaces in the month
  like this: '2023 / 04'. Here we remove those spaces.
  ================================== */
  function removeExtraSpacesInMonthValue(dataArray: CityResponseDataType[]) {
    const newData = dataArray.map((entry) => {
      entry.month = entry.month.replace(/\s+/g, '');
      return entry;
    });
    dataExtraSpaceInMonthRemoved = newData;
  }

  /* ==================================
  The source data is monthly, but we're only interested in yearly totals
  So, the 12 months of data need to be added all together.
  ================================== */
  function add12Months(dataArray: any[]) {
    /*
    1) Find all the unique districts (so we can later add their monthly totals)
    This creates an array of 59 objects with ALL the data
    We're only interested in the boroughDistrict strings 
    */
    const dataArrayWithUniqueDistricts = _lodash.uniqBy(dataArray, (item) => {
      return item.boroughDistrict;
    });
    // This creates an array of 59 unique boroughDistrict strings. I.e. - 'Brooklyn 06'
    const allBoroughDistrictsArray: string[] = _lodash.map(dataArrayWithUniqueDistricts, (item) => {
      return item.boroughDistrict;
    });

    /* 
    2) For every boroughDistrict,
    filter some information we'll need from dataArray,
    and the sum of all 12 months tonnage per year
    */
    const sumByKey = (items: DataItemType[], key: RefuseTypes): number => _lodash.sumBy(items, (item) => item[key]);

    const newData: DataItemType[] = _lodash.map(allBoroughDistrictsArray, (boroughDistrict: string) => {
      const allBoroughDistricts: DataItemType[] = _lodash.filter(dataArray, (item: DataItemType) => {
        return item.boroughDistrict === boroughDistrict;
      });

      const tonnageKeys: RefuseTypes[] = [
        'refusetonscollected',
        'papertonscollected',
        'mgptonscollected',
        'resorganicstons',
        'leavesorganictons',
        'schoolorganictons',
        'xmastreetons',
      ];

      const tonnages: Partial<DataItemType> = {};
      tonnageKeys.forEach((key) => {
        tonnages[key] = sumByKey(allBoroughDistricts, key);
      });

      return {
        boroughDistrict: boroughDistrict,
        borough: allBoroughDistricts[0].borough,
        communityDistrictName: allBoroughDistricts[0].communityDistrictName,
        _2010_population: allBoroughDistricts[0]._2010_population,
        _2020_population: allBoroughDistricts[0]._2020_population,
        ...tonnages,
      } as DataItemType;
    });
    dataMonthsAdded = newData;
  }

  function refuseTypeSubmit(event: ChangeEvent<HTMLFormElement>): void {
    setRefuseType(event.target.id as RefuseTypes);
  }

  function yearDropdownSubmit(event: ChangeEvent<HTMLFormElement>): void {
    const selectedYear = Number(event.target.value);
    setYear(selectedYear);
    event.preventDefault();
  }

  function sortOrderRadioSubmit(event: ChangeEvent<HTMLFormElement>): void {
    setSortOrder(event.target.value);
  }

  /* **********************************
  Drawing the Chart function
  ********************************** */

  function drawChart() {
    // clear existing chart before we create new one
    d3.selectAll('svg > *').remove();
    const svg = d3.select('svg');

    const margin = { top: 60, right: 140, bottom: 190, left: 150 };
    const width = Number(svg.attr('width'));
    const height = Number(svg.attr('height'));

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /* ==================================
    Colors
    ================================== */
    const colorBars = d3
      .scaleOrdinal()
      .domain(['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'])
      .range(['#21E0D6', '#EF767A', '#820933', '#6457A6', '#2C579E']);

    /* ==================================
    ToolTip
    ================================== */
    let tooltip = d3.select<HTMLDivElement, unknown>('.tool-tip');
    
    if (tooltip.empty()) {
      tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tool-tip');
    }
    
    /* ==================================
    Establishing the Domain(data) & Range(viz)
    ================================== */
    const xScale = d3
      .scaleLinear()
      // domain: the min and max value of domain(data)
      .domain([0, d3.max(data, (d) => (d[refuseType] / d._2010_population) * 2000)!])
      // range: the min and max value of range(the visualization)
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      // Domain: the min and max value of domain(data)
      .domain(data.map((d) => d.boroughDistrict))
      // Range: the min and max value of range(the visualization)
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    /* ==================================
    Drawing the Axes (left, top, bottom)
    ================================== */
    let yAxisGroup = g.select<SVGGElement>('.y-axis');
    if (yAxisGroup.empty()) {
      yAxisGroup = g.append('g').attr('class', 'y-axis');
    }

    let xAxisTopGroup = g.select<SVGGElement>('.x-axis-top');
    if (xAxisTopGroup.empty()) {
      xAxisTopGroup = g.append('g').attr('class', 'x-axis-top');
    }

    let xAxisBottomGroup = g.select<SVGGElement>('.x-axis-bottom');
    if (xAxisBottomGroup.empty()) {
      xAxisBottomGroup = g.append('g')
        .attr('class', 'x-axis-bottom')
        .attr('transform', `translate(0, ${innerHeight})`);
    }

    // Call axis generators on the selected groups
    yAxisGroup.call(d3.axisLeft(yScale));
    xAxisTopGroup.call(d3.axisTop(xScale));
    xAxisBottomGroup.call(d3.axisBottom(xScale));

    /* ==================================
    Drawing the Bars
    ================================== */
    const bars = g.selectAll<SVGRectElement, DataItemType>('rect').data(data);
      
    // Remove excess bars
    bars.exit().remove();

    bars
      .enter()
      .append('rect')
      .merge(bars)
      .style('fill', (d: DataItemType): string => {
        return colorBars(d['borough']) as string;
      })
      .attr('y', (d: DataItemType) => yScale(d.boroughDistrict) as number)
      .attr('width', (d: DataItemType) => xScale((d[refuseType] / d._2010_population) * 2000))
      // bandwidth is computed width
      .attr('height', yScale.bandwidth())
      .on('mouseover', handleMouseOver)
      .on('mousemove', handleMouseMove)
      .on('mouseout', handleMouseOut);

      
      /* ==================================
      MouseOver: bars turn yellow
      MouseOut: bars return to normal color
      ================================== */
      function handleMouseOver(this: SVGRectElement, event: MouseEvent, d: DataItemType) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill', '#ffcd44');
      
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 120}px`)
          .style('display', 'inline-block')
          .html(generateTooltipHTML(d));
      }
      
      function handleMouseOut(this: SVGRectElement, event: MouseEvent, d: DataItemType) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill', colorBars(d.borough) as string);
      
        tooltip.style('display', 'none');
      }
      
      function handleMouseMove(event: MouseEvent) {
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 120}px`);
      }
      
      function generateTooltipHTML(d: DataItemType): string {
        const totalRefuse =
          d.mgptonscollected +
          d.resorganicstons +
          d.papertonscollected +
          d.refusetonscollected +
          d.xmastreetons +
          d.leavesorganictons;
      
        const refuseCategories: { key: keyof DataItemType; name: string }[] = [
          { key: 'refusetonscollected', name: 'trash' },
          { key: 'papertonscollected', name: 'paper & cardboard' },
          { key: 'mgptonscollected', name: 'metal/glass/plastic' },
          { key: 'resorganicstons', name: 'brown bin organics' },
          { key: 'leavesorganictons', name: 'leaves' },
          { key: 'xmastreetons', name: 'christmas trees' },
        ];
      
        const listItems = refuseCategories
          .map((category) => {
            const percent = totalRefuse
              ? ((d[category.key] as number) * 100) / totalRefuse
              : 0;
            return `<li>${category.name}: ${percent.toFixed(1)}%</li>`;
          })
          .join('<br/>');
      
        return `
          <h4>${d.communityDistrictName}</h4>
          2010 population: ${new Intl.NumberFormat().format(d._2010_population)} <br/>
          neighborhood total: ${new Intl.NumberFormat().format(d[refuseType])} tons/year<br/>
          per person: ${Math.round((d[refuseType] / d._2010_population) * 2000)} pounds/year<br/><br/>
          <p>Breakdown of refuse by percent:</p>
          <ul>${listItems}</ul>
        `;
      }
      
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
      .text((d: DataItemType) => {
        return new Intl.NumberFormat().format((d[refuseType] / d._2010_population) * 2000) + ' lbs/person';
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

  return (
    <div className="App row">
      <div className="sidebar-container col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
        <Sidebar
          year={year}
          refuseTypeSubmit={refuseTypeSubmit}
          yearDropdownSubmit={yearDropdownSubmit}
          sortOrderRadioSubmit={sortOrderRadioSubmit}
        />
      </div>

      <div className="chart-container col-xs-12 col-sm-8 col-md-9 col-lg-9 col-xl-9">
        <ChartHeader year={year} refuseType={refuseType} />
        <LoadingSpinner loading={loading} />
        <BarChart />
      </div>
    </div>
  );
}
