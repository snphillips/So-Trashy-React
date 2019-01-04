import React, { Component } from 'react';


export default class SortOrder extends Component {
  render() {
    return (


      <form className="radio-buttons"
            onChange={this.props.sortOrderRadioSubmit}
            >

        <input type="radio"
               name="data-sort"
               value="ascending"
               onChange={this.props.sortOrderRadioSubmit}
               defaultChecked
               />
               sort ascending <br/>

        <input type="radio" name="data-sort" value="descending" onChange={this.props.sortOrderRadioSubmit}/> sort descending <br/>
        <input type="radio" name="data-sort" value="alphabetical" onChange={this.props.sortOrderRadioSubmit}/> sort alphabetical <br/>

     </form>

    );
  }
}
