import React, { Component } from 'react';


export default class ChartHeader extends Component {
  render() {
    return (

      <div>
        <h2>
          <span id="chart-description">One Year of Trash: </span>
          <span id="chart-year"> 2017</span>
        </h2>

        <h3 class="weight-description">
          Total: <span id="headerweight"></span> tons
        </h3>
      </div>


    );
  }
}
