import React, { Component } from 'react';
import RefuseTypeButtons from './RefuseTypeButtons';
import YearButton from './YearButton';
import SortOrder from './SortOrder';
import NeighborhoodDropdown from './NeighborhoodDropdown';
import Footer from './Footer';

export default class Sidebar extends Component {
  render() {
    return (

      <aside className="sidebar">

        <h1 className="title">So Trashy</h1>

          <p id="sidebar-text">Visualizing a neighborhood comparison of trash, recycling, and compost pick-up in New York City.
          Data provided by <a href='https://opendata.cityofnewyork.us/'>NYC Open Data.</a></p>

          <RefuseTypeButtons refuseTypeSubmit={this.props.refuseTypeSubmit} />

          <YearButton yearDropdownSubmit={this.props.yearDropdownSubmit} />

          <h5 id="sidebar-text">sort data:</h5>
          <SortOrder sortOrderRadioSubmit={this.props.sortOrderRadioSubmit} />


          <Footer />

      </aside>
    );
  }
}
          // <NeighborhoodDropdown neighborhoodDropdownSubmit={this.props.neighborhoodDropdownSubmit}/>
