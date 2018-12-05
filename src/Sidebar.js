import React, { Component } from 'react';
import RefuseTypeButtons from "./RefuseTypeButtons";
import YearButton from './YearButton';
import BoroughButton from './BoroughButton';

export default class Sidebar extends Component {
  render() {
    return (

      <aside className="sidebar">

        <h1 className="title">So Trashy</h1>

          <p id="sitedescription">Visualizing refuse, recycling, and compost in New York City.</p>

          <RefuseTypeButtons />
          <YearButton />
          <BoroughButton />

          <p id="sitedescription">Numbers provided by New York City's Department of Sanitation.</p>

      </aside>
    );
  }
}

