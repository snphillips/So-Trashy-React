import React, { Component } from 'react';


export default class Footer extends Component {
  render() {
    return (

      <footer>

        <span className="footerLink">
          <a href="https://sarahphillipsdev.surge.sh" id="portfolio-link">by Sarah Phillips   </a>
        </span>

        <span className="footerLink">
          <a href="https://github.com/snphillips/So-Trashy-React" id="github-link">
            <i className="fab fa-github"></i>
          </a>
        </span>

      </footer>
    );
  }
}
