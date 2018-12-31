import React, { Component } from 'react';


export default class BoroughButtons extends Component {
  render() {
    return (

      <form>
        <input className="refusetype" type="button" value="total by neighborhood" id="neighborhood" onClick={this.props.boroughSubmit}></input>
        <input className="refusetype" type="button" value="total by borough" id="borough" onClick={this.props.boroughSubmit}></input>
        <input className="refusetype" type="button" value="city wide total" id="city" onClick={this.props.boroughSubmit}></input>
      </form>

    );
  }
}

