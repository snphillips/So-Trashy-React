import React, { Component } from 'react';


export default class RefuseTypeButtons extends Component {
  render() {
    return (

      <form className="type-buttons">
        <input className="refusetype" type="button" value="Trash" id="refuse" onClick={this.props.refuseTypeButton}></input>
        <input className="refusetype" type="button" value="Paper & Cardboard" id="paper-cardboard" onClick={this.props.refuseTypeButton}></input>
        <input className="refusetype" type="button" value="Metal/Glass/Plastic" id="metal-glass-plastic" onClick={this.props.refuseTypeButton}></input>
        <input className="refusetype" type="button" value="Res Organics" id="resorganicstons" onClick={this.props.refuseTypeButton}></input>
        <input className="refusetype" type="button" value="School Organics" id="schoolorganictons" onClick={this.props.refuseTypeButton}></input>
        <input className="refusetype" type="button" value="Christmas Trees" id="xmastreetons" onClick={this.props.refuseTypeButton}></input>
      </form>

    );
  }
}
