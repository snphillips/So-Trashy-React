import React, { Component } from 'react';


export default class RefuseTypeButtons extends Component {
  render() {
    return (

      <div className="type-buttons">
        <input className="refusetype" type="button" value="Trash" id="refuse"></input>
        <input className="refusetype" type="button" value="Paper & Cardboard" id="paper-cardboard"></input>
        <input className="refusetype" type="button" value="Metal/Glass/Plastic" id="metal-glass-plastic"></input>
        <input className="refusetype" type="button" value="Res Organics" id="resorganicstons"></input>
        <input className="refusetype" type="button" value="School Organics" id="schoolorganictons"></input>
        <input className="refusetype" type="button" value="Christmas Trees" id="xmastreetons"></input>
      </div>

    );
  }
}
