import React from 'react';

export default function Footer(props) {
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
    </footer>
  );
}
