import React from 'react';


export default function SortOrder(props) {
    return (

      <form className="radio-toolbar"
            id="radio-toolbar-sort"
            onChange={props.sortOrderRadioSubmit}
            >

        <input type="radio"
               className="radio-sort"
               id="sort-ascending"
               name="radioSort"
               value="sort ascending"
               onChange={props.sortOrderRadioSubmit}
               defaultChecked
               />
        <label htmlFor="sort-ascending">sort ascending</label>
        <br/>

        <input type="radio"
               className="radio-sort"
               id="sort-descending"
               name="radioSort"
               value="sort descending"
               onChange={props.sortOrderRadioSubmit}
               />
        <label htmlFor="sort-descending">sort descending</label>
        <br/>

        <input type="radio"
               className="radio-sort"
               id="sort-alphabetical"
               name="radioSort"
               value="sort alphabetical"
               onChange={props.sortOrderRadioSubmit}
               />
        <label htmlFor="sort-alphabetical">sort alphabetical</label>
        <br/>

      </form>

    );
}
