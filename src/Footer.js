import React, { Component } from 'react';


export default class Footer extends Component {
  render() {
    return (

      <footer>
        <span className="footerLink">made with <i className="fas fa-heart"></i><a href="https://sarahphillipsdev.surge.sh">by Sarah Phillips</a></span>
        <span className="footerLink"><a href="https://github.com/snphillips/todoodles"><i className="fab fa-github"></i></a></span>
      </footer>
    );
  }
}
