import React from 'react';

export default function YearButton(props) {
  return (
    <form onChange={props.yearDropdownSubmit}>
      <select className='dropdown-button' value={props.year} onChange={props.yearDropdownSubmit}>
        <option className='year' value={new Date().getFullYear()} id='default-current-year'>
          year
        </option>
        <option className='year' value='2023'>
          2023
        </option>
        <option className='year' value='2022'>
          2022
        </option>
        <option className='year' value='2021'>
          2021
        </option>
        <option className='year' value='2020'>
          2020
        </option>
        <option className='year' value='2019'>
          2019
        </option>
        <option className='year' value='2018'>
          2018
        </option>
        <option className='year' value='2017'>
          2017
        </option>
        <option className='year' value='2016'>
          2016
        </option>
        <option className='year' value='2015'>
          2015
        </option>
        <option className='year' value='2014'>
          2014
        </option>
        <option className='year' value='2013'>
          2013
        </option>
        <option className='year' value='2012'>
          2012
        </option>
        <option className='year' value='2011'>
          2011
        </option>
        <option className='year' value='2010'>
          2010
        </option>
      </select>
    </form>
  );
}
