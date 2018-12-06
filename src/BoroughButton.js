import React, { Component } from 'react';


export default class BoroughButton extends Component {
  render() {
    return (



        <select className="dropdown">
          <option className="borough" id="borough-all-boroughs" value="Update" onClick={this.props.boroughButton}>All Boroughs</option>
          <option className="borough" id="borough-brooklyn" value="Update" onClick={this.props.boroughButton}>Brooklyn</option>
          <option className="borough" id="borough-bronx" value="Update" onClick={this.props.boroughButton}>Bronx</option>
          <option className="borough" id="borough-manhattan" value="Update" onClick={this.props.boroughButton}>Manhattan</option>
          <option className="borough" id="borough-queens" value="Update" onClick={this.props.boroughButton}>Queens</option>
          <option className="borough" id="borough-staten-islant" value="Update" onClick={this.props.boroughButton}>Staten Island</option>
        </select>




    );
  }
}
