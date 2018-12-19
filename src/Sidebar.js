import React, { Component } from 'react';
import RefuseTypeButtons from "./RefuseTypeButtons";
import YearButton from './YearButton';
import SortOrder from './SortOrder';
import Footer from './Footer';

export default class Sidebar extends Component {
  render() {
    return (

      <aside className="sidebar">

        <h1 className="title">So Trashy</h1>

          <p id="sitedescription">Visualizing one year of refuse, recycling, and compost in New York City.</p>
          <p id="sitedescription">Datasets provided by <a href='https://opendata.cityofnewyork.us/'>NYC Open Data.</a></p>

          <RefuseTypeButtons refuseTypeSubmit={this.props.refuseTypeSubmit} />

          <YearButton yearDropdownSubmit={this.props.yearDropdownSubmit} />

          <SortOrder sortOrderRadioSubmit={this.props.sortOrderRadioSubmit} />


          <Footer />

      </aside>
    );
  }
}


