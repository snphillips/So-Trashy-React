import React, { Component } from 'react';


export default class BoroughButton extends Component {
  render() {
    return (


      <form onChange={this.props.handleBoroughDropdownSubmit} >

        <select id="tag"
                value={this.props.year}
                onChange={this.props.handleBoroughDropdownChange}
                >

          <option className="year" value="All Boroughs" >All Boroughs</option>
          <option className="year" value="Brooklyn" >Brooklyn</option>
          <option className="year" value="Bronx" >Bronx</option>
          <option className="year" value="Manhattan" >Manhattan</option>
          <option className="year" value="Queens" >Queens</option>
          <option className="year" value="Staten Island" >Staten Island</option>

        </select>


     </form>

    );
  }
}


        // <input type="submit"
               // value="submit"
               // />
