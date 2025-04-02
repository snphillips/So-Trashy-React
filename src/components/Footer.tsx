import React from "react";

export default function Footer() {
  return (
    <footer className="sidebar-footer" aria-label="Website footer">
      <p className="sidebar-link">
        <a href="https://sarahphillipsdev.surge.sh" id="portfolio-link">
          Created by Sarah Phillips
        </a>
      </p>
      <p className="sidebar-link">
        <a
          href="https://github.com/snphillips/So-Trashy-React"
          id="github-link"
        >
          View code on Github{" "}
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
      </p>
      <p className="sidebar-link">
        <a
          href="https://www.buymeacoffee.com/sarahphillips"
          id="buy-me-coffee-link"
        >
          Buy Me a Coffee ☕
        </a>
      </p>
    </footer>
  );
}
