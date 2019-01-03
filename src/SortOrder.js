import React, { Component } from 'react';


export default class SortOrder extends Component {
  render() {
    return (


      <form className="sort-buttons">

        <input className="sort-order" type="button" name="data-sort" value="ascending" onClick={this.props.sortOrderRadioSubmit}></input><br/>
        <input className="sort-order" type="button" name="data-sort" value="descending" onClick={this.props.sortOrderRadioSubmit}></input><br/>
        <input className="sort-order" type="button" name="data-sort" value="alphabetical" onClick={this.props.sortOrderRadioSubmit}></input><br/>

     </form>

    );
  }
}
