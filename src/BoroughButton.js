import React, { Component } from 'react';


export default class BoroughButton extends Component {
  render() {
    return (



        <select className="dropdown">
          <option className="borough" id="borough-all-boroughs" value="Update">All Boroughs</option>
          <option className="borough" id="borough-brooklyn" value="Update" onclick="getDataBrooklyn()">Brooklyn</option>
          <option className="borough" id="borough-bronx" value="Update" onclick="getDataBronx()">Bronx</option>
          <option className="borough" id="borough-manhattan" value="Update" onclick="getDataManhattan()">Manhattan</option>
          <option className="borough" id="borough-queens" value="Update" onclick="getDataQueens()">Queens</option>
          <option className="borough" id="borough-staten-islant" value="Update" onclick="getDataStatenIsland()">Staten Island</option>
        </select>




    );
  }
}
