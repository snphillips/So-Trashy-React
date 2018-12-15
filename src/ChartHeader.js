import React, { Component } from 'react';




export default class ChartHeader extends Component {
  render() {








const heading = "trash";

if (this.props.refuseType === "refusetonscollected") {
  this.heading = "Trash"
} else if (this.props.refuseType === "papertonscollected" ) {
  this.heading = "Paper & Cardboard"
} else if (this.props.refuseType === "mgptonscollected" ) {
  this.heading = "Metal/Glass/Plastic"
} else if (this.props.refuseType === "resorganicstons" ) {
  this.heading = "Organics"
}

    return (

      <div>
        <h2>
          <span id="chart-description">One Year of {this.heading}: </span>
          <span id="chart-year">{this.props.year}</span>
        </h2>

      </div>


    );
  }
}
          // <span id="chart-description">{this.props.refuseType}: </span>
