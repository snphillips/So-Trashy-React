import React, { Component } from 'react';


export default class YearButton extends Component {
  render() {
    return (

      <form onChange={this.props.yearDropdownSubmit}
            >

        <select id="tag"
                value={this.props.year}
                onChange={this.props.yearDropdownSubmit}
                className="dropdown-button"
                >

          <option className="year" value="2018" >year</option>
          <option className="year" value="2018" >2018</option>
          <option className="year" value="2017" >2017</option>
          <option className="year" value="2016" >2016</option>
          <option className="year" value="2015" >2015</option>
          <option className="year" value="2014" >2014</option>

        </select>


     </form>

    );
  }
}

        // <input type="submit"
               // value="submit"
               // />
