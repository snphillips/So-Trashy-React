import React, { Component } from 'react';


export default class ChartHeader extends Component {
  render() {
    return (

      <div>
        <h2>
          <span id="chart-description">{this.props.refuseType}: </span>
          <span id="chart-year">{this.props.year}</span>
        </h2>

      </div>


    );
  }
}


        // <h3 className="weight-description">
          // Total: <span id="headerweight"></span> tons
        // </h3>
