import React, { Component } from 'react';
import RefuseTypeButtons from "./RefuseTypeButtons";
import YearButton from './YearButton';
import TotalOrPerPerson from './TotalOrPerPerson';
import BoroughButton from './BoroughButton';

export default class Sidebar extends Component {
  render() {
    return (

      <aside className="sidebar">

        <h1 className="title">So Trashy</h1>

          <p id="sitedescription">Visualizing refuse, recycling, and compost in New York City.</p>

          <RefuseTypeButtons refuseTypeSubmit={this.props.refuseTypeSubmit}/>

          <YearButton handleYearDropdownChange={this.props.handleYearDropdownChange}
                      handleYearDropdownSubmit={this.props.handleYearDropdownSubmit}
                      />



          <p id="sitedescription">Data provided by <a href='https://opendata.cityofnewyork.us/'>NYC Open Data.</a></p>

      </aside>
    );
  }
}
          // <TotalOrPerPerson />

          // <BoroughButton handleBoroughDropdownChange={this.props.handleBoroughDropdownChange}
                         // handleBoroughDropdownSubmit={this.props.handleBoroughDropdownSubmit}
                      // />
