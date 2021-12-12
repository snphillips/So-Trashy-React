import React, { Component } from 'react';

export default function ChartHeader(props) {

  let heading;
  
// Change heading based on which refuse type is being displayed
  if (props.refuseType === "allcollected") {
  heading = "Trash/Recycling/Compost"
} else if (props.refuseType === "refusetonscollected") {
  heading = "Trash"
} else if (props.refuseType === "papertonscollected" ) {
  heading = "Paper & Cardboard"
} else if (props.refuseType === "mgptonscollected" ) {
  heading = "Metal/Glass/Plastic"
} else if (props.refuseType === "resorganicstons" ) {
  heading = "Organics"
} else if (props.refuseType === "leavesorganictons" ) {
  heading = "Leaves"
} else if (props.refuseType === "xmastreetons" ) {
  heading = "Christmas Tree"}

    return (

      <div>
        <h2>
          <span id="chart-description">Comparing {heading} Collection for </span>
          <span id="chart-year">{props.year}</span>
        </h2>

      </div>


    );
}

