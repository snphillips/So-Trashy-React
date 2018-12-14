import React, { Component } from 'react';


export default class RefuseTypeButtons extends Component {
  render() {
    return (

      <form className="type-buttons">
        <input className="refusetype" type="button" value="trash" id="refusetonscollected" onClick={this.props.refuseTypeSubmit}></input>
        <input className="refusetype" type="button" value="paper & cardboard" id="papertonscollected" onClick={this.props.refuseTypeSubmit}></input>
        <input className="refusetype" type="button" value="metal/glass/plastic" id="mgptonscollected" onClick={this.props.refuseTypeSubmit}></input>
        <input className="refusetype" type="button" value="organics" id="resorganicstons" onClick={this.props.refuseTypeSubmit}></input>
      </form>

    );
  }
}
        // <input className="refusetype" type="button" value="School Organics" id="schoolorganictons" onClick={this.props.refuseTypeSubmit}></input>
        // <input className="refusetype" type="button" value="Christmas Trees" id="xmastreetons" onClick={this.props.refuseTypeSubmit}></input>
