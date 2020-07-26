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
          <p className="sidebar-text">Data provided by <a href='https://opendata.cityofnewyork.us/' id="open-data-link">NYC Open Data <i class="fa fa-external-link-square" aria-hidden="true"></i> </a></p>
          <p className="sidebar-text"><a href='https://data.cityofnewyork.us/City-Government/DSNY-Monthly-Tonnage-Data/ebb7-mvp5' id="DSNY-tonnage-link">DSNY Monthly Tonnage Data <i class="fa fa-external-link-square" aria-hidden="true"></i></a></p>
          <p className="sidebar-text"><a href='https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2' id="nyc-population-link">NYC Population by District <i class="fa fa-external-link-square" aria-hidden="true"></i></a></p>
          <p className="sidebar-text sidebar-link"><a href='https://communityprofiles.planning.nyc.gov/' id="community-district-link">Find your community district here <i class="fa fa-external-link-square" aria-hidden="true"></i></a></p>

      </aside>
    );
  }
}

