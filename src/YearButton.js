import React, { Component } from 'react';


export default class YearButton extends Component {
  render() {
    return (



        <select className="dropdown">
          <option className="year" type="button" id="year" value="Update" onClick={this.props.yearButton}>year</option>
          <option className="year" type="button" id="button-2018" value="Update" onClick={this.props.yearButton}>2018</option>
          <option className="year" type="button" id="button-2017" value="Update" onClick={this.props.yearButton}>2017</option>
          <option className="year" type="button" id="button-2016" value="Update" onClick={this.props.yearButton}>2016</option>
          <option className="year" type="button" id="button-2015" value="Update" onClick={this.props.yearButton}>2015</option>
          <option className="year" type="button" id="button-2014" value="Update" onClick={this.props.yearButton}>2014</option>
        </select>




    );
  }
}

