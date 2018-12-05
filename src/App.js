import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ChartHeader from './ChartHeader';
import BarChart from './BarChart';

export default class App extends Component {
  render() {
    return (

      <div className="App">

        <Sidebar />
        <BarChart />
        <Footer />
        <ChartHeader />
        <BarChart />

      </div>
    );
  }
}

