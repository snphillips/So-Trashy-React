import React, { Component } from 'react';


export default class TotalOrPerPerson extends Component {
  render() {
    return (


      <form className="radio-buttons">

        <input type="radio" name="data-type" value="neighborhood-total" checked /> Neighborhood Total <br/>
        <input type="radio" name="data-type" value="per-person" /> Per Person <br/>

     </form>

    );
  }
}
