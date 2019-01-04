import React, { Component } from 'react';
import RefuseTypeButtons from './RefuseTypeButtons';
import RefuseTypeButtonsRadio from './RefuseTypeButtonsRadio';
import YearButton from './YearButton';
import SortOrder from './SortOrder';
import SortOrderRadio from './SortOrderRadio';
import SortOrderRadio2 from './SortOrderRadio2';
import NeighborhoodDropdown from './NeighborhoodDropdown';


export default class Sidebar extends Component {
  render() {
    return (

      <aside className="sidebar">

        <h1 className="title">So Trashy</h1>

          <p id="sidebar-text">Visualizing a neighborhood comparison of trash, recycling, and compost pick-up in New York City.</p>

          <p id="sidebar-text">Data provided by <a href='https://opendata.cityofnewyork.us/'>NYC Open Data.</a></p>


          <YearButton yearDropdownSubmit={this.props.yearDropdownSubmit} />

          <RefuseTypeButtonsRadio refuseTypeSubmit={this.props.refuseTypeSubmit} />

          <SortOrderRadio sortOrderRadioSubmit={this.props.sortOrderRadioSubmit} />

          <br/>
          <p id="sidebar-text"><a href='https://communityprofiles.planning.nyc.gov/'>Find your community district here.</a></p>

      </aside>
    );
  }
}

