import React, { Component } from 'react';


export default class YearButton extends Component {
  render() {
    return (



        <select className="dropdown">
          <option className="year" id="year" value="Update">year</option>
          <option className="year" id="button-2018" value="Update" onclick="getData2018()">2018</option>
          <option className="year" id="button-2017" value="Update" onclick="getData2017()">2017</option>
          <option className="year" id="button-2016" value="Update" onclick="getData2016()">2016</option>
          <option className="year" id="button-2015" value="Update" onclick="getData2015()">2015</option>
          <option className="year" id="button-2014" value="Update" onclick="getData2014()">2014</option>
        </select>




    );
  }
}

