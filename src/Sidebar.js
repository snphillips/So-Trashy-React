import React, { Component } from 'react';
import RefuseTypeButtonsRadio from './RefuseTypeButtonsRadio';
import YearButton from './YearButton';
import SortOrderRadio from './SortOrderRadio';
// import NeighborhoodDropdown from './NeighborhoodDropdown';


export default class Sidebar extends Component {
  render() {
    return (

      <aside className="sidebar">

        <h1 className="title">So Trashy</h1>

          <p className="sidebar-text">Visualizing a neighborhood comparison of trash, recycling, and compost pick-up in New York City.</p>

          <YearButton yearDropdownSubmit={this.props.yearDropdownSubmit} />

          <RefuseTypeButtonsRadio refuseTypeSubmit={this.props.refuseTypeSubmit} />

          <SortOrderRadio sortOrderRadioSubmit={this.props.sortOrderRadioSubmit} />

          <br/>
          <p className="sidebar-text">Data provided by <a href='https://opendata.cityofnewyork.us/'>NYC Open Data.</a></p>
          <p className="sidebar-text" className="sidebar-link">
            <a href='https://communityprofiles.planning.nyc.gov/'>Find your community district here.</a>
          </p>

      </aside>
    );
  }
}

          // <p className="sidebar-text"><a href='https://data.cityofnewyork.us/City-Government/DSNY-Monthly-Tonnage-Data/ebb7-mvp5'>DSNY Monthly Tonnage Data</a></p>
          // <p className="sidebar-text"><a href='https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2'>NYC Population by District</a></p>
