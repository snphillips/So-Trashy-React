import React, { Component } from 'react';


export default class SortOrder extends Component {
  render() {
    return (


      <form className="radio-toolbar"
            id="radio-toolbar-sort"
            onChange={this.props.sortOrderRadioSubmit}
            >

        <input type="radio"
               className="radio-sort"
               id="sort-ascending"
               name="radioSort"
               value="sort ascending"
               onChange={this.props.sortOrderRadioSubmit}
               defaultChecked
               />
        <label for="sort-ascending">sort ascending</label>
        <br/>

        <input type="radio"
               className="radio-sort"
               id="sort-descending"
               name="radioSort"
               value="sort descending"
               onChange={this.props.sortOrderRadioSubmit}
               />
        <label for="sort-descending">sort descending</label>
        <br/>

        <input type="radio"
               className="radio-sort"
               id="sort-alphabetical"
               name="radioSort"
               value="sort alphabetical"
               onChange={this.props.sortOrderRadioSubmit}
               />
        <label for="sort-alphabetical">sort alphabetical</label>
        <br/>

      </form>

    );
  }
}
