import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ChartHeader from './ChartHeader';
import BarChart from './BarChart';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForColors: "borough",
      refuseType: "refusetonscollected",
      year: "2018",
      borough: "All Boroughs",






    }
  //  ==================================
  //  "this" binding
  //  (to allow 'this' to work in callbacks)
  //  ==================================





  }

























  //  ==================================
  //  And finally, the render
  //  ==================================
  render() {
    return (

      <div className="App">

        <Sidebar />
        <BarChart />
        <Footer />
        <ChartHeader year={this.state.year} refuseType={this.state.refuseType} />
        <BarChart />

      </div>
    );
  }
}

