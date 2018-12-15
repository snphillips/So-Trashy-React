import React, { Component } from 'react';
import RefuseTypeButtons from "./RefuseTypeButtons";
import YearButton from './YearButton';
import SortOrder from './SortOrder';
import TotalOrPerPerson from './TotalOrPerPerson';

export default class Sidebar extends Component {
  render() {
    return (

      <aside className="sidebar">

        <h1 className="title">So Trashy</h1>

          <p id="sitedescription">Visualizing refuse, recycling, and compost in New York City.</p>

          <RefuseTypeButtons refuseTypeSubmit={this.props.refuseTypeSubmit} />

          <YearButton yearDropdownSubmit={this.props.yearDropdownSubmit} />

          <SortOrder sortOrderRadioSubmit={this.props.sortOrderRadioSubmit} />


          <p id="sitedescription">Data provided by <a href='https://opendata.cityofnewyork.us/'>NYC Open Data.</a></p>

      </aside>
    );
  }
}

          // <TotalOrPerPerson totalOrPPRadioSubmit={this.props.totalOrPPRadioSubmit}/>
