import React from 'react';

export default function Footer() {
  return (
    <footer>
      <span className='footerLink'>
        <a href='https://sarahphillipsdev.surge.sh' id='portfolio-link'>
          by Sarah Phillips{' '}
        </a>
      </span>

      <span className='footerLink'>
        <a href='https://github.com/snphillips/So-Trashy-React' id='github-link'>
          <i className='fa fa-github' aria-hidden='true'></i>
        </a>
      </span>
      <br />
      <br />
      <a href='https://www.buymeacoffee.com/sarahphillips' className='footerLink' target='_blank' rel='noopener noreferrer'>
      Buy Me a Coffee ☕
    </a>
    </footer>
  );
}
