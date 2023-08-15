import React from 'react';
import RefuseTypeButtonsRadio from './RefuseTypeButtonsRadio';
import YearButton from './YearButton';
import SortOrderRadio from './SortOrderRadio';

export default function Sidebar(props) {
  return (
    <aside className='sidebar'>
      <h1 className='title'>So Trashy</h1>

      <p className='sidebar-text'>
        Visualizing a neighborhood comparison of trash, recycling, and compost pick-up in New York
        City.
      </p>

      <YearButton yearDropdownSubmit={props.yearDropdownSubmit} />

      <RefuseTypeButtonsRadio refuseTypeSubmit={props.refuseTypeSubmit} />

      <SortOrderRadio sortOrderRadioSubmit={props.sortOrderRadioSubmit} />

      <br />
      <p className='sidebar-text sidebar-link'>
        Data provided by{' '}
        <a href='https://opendata.cityofnewyork.us/' id='open-data-link'>
          NYC Open Data <i className='fa fa-external-link-square' aria-hidden='true'></i>{' '}
        </a>
      </p>
      <p className='sidebar-text sidebar-link'>
        <a
          href='https://data.cityofnewyork.us/City-Government/DSNY-Monthly-Tonnage-Data/ebb7-mvp5'
          id='DSNY-tonnage-link'
        >
          DSNY Monthly Tonnage Data{' '}
          <i className='fa fa-external-link-square' aria-hidden='true'></i>
        </a>
      </p>
      <p className='sidebar-text sidebar-link'>
        <a
          href='https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2'
          id='nyc-population-link'
        >
          NYC Population by District{' '}
          <i className='fa fa-external-link-square' aria-hidden='true'></i>
        </a>
      </p>
      <p className='sidebar-text sidebar-link'>
        <a href='https://communityprofiles.planning.nyc.gov/' id='community-district-link'>
          Find your community district here{' '}
          <i className='fa fa-external-link-square' aria-hidden='true'></i>
        </a>
      </p>
    </aside>
  );
}
