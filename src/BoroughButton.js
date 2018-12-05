import React, { Component } from 'react';


export default class BoroughButton extends Component {
  render() {
    return (



        <select className="dropdown">
          <option className="borough" id="borough-all-boroughs" value="Update">All Boroughs</option>
          <option className="borough" id="borough-brooklyn" value="Update" onClick="getDataBrooklyn()">Brooklyn</option>
          <option className="borough" id="borough-bronx" value="Update" onClick="getDataBronx()">Bronx</option>
          <option className="borough" id="borough-manhattan" value="Update" onClick="getDataManhattan()">Manhattan</option>
          <option className="borough" id="borough-queens" value="Update" onClick="getDataQueens()">Queens</option>
          <option className="borough" id="borough-staten-islant" value="Update" onClick="getDataStatenIsland()">Staten Island</option>
        </select>




    );
  }
}
