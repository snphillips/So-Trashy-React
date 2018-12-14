import React, { Component } from 'react';


export default class TotalOrPerPerson extends Component {
  render() {
    return (


      <form className="radio-buttons">

        <input type="radio" name="data-type" value="neighborhood-total" /> neighborhood total <br/>
        <input type="radio" name="data-type" value="per-person" /> per person <br/>

     </form>

    );
  }
}
