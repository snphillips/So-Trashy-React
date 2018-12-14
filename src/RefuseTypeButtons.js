import React, { Component } from 'react';


export default class RefuseTypeButtons extends Component {
  render() {
    return (

      <form className="type-buttons">
        <input className="refusetype" type="button" value="Trash" id="refusetonscollected" onClick={this.props.refuseTypeSubmit}></input>
        <input className="refusetype" type="button" value="Paper & Cardboard" id="papertonscollected" onClick={this.props.refuseTypeSubmit}></input>
        <input className="refusetype" type="button" value="Metal/Glass/Plastic" id="mgptonscollected" onClick={this.props.refuseTypeSubmit}></input>
        <input className="refusetype" type="button" value="Organics" id="resorganicstons" onClick={this.props.refuseTypeSubmit}></input>
      </form>

    );
  }
}
        // <input className="refusetype" type="button" value="School Organics" id="schoolorganictons" onClick={this.props.refuseTypeSubmit}></input>
        // <input className="refusetype" type="button" value="Christmas Trees" id="xmastreetons" onClick={this.props.refuseTypeSubmit}></input>
