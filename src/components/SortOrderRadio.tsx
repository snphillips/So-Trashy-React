import React, { ChangeEvent } from 'react';

type Props = {
  sortOrderRadioSubmit: (event: ChangeEvent<HTMLInputElement>) => void
};

export default function SortOrder({
  sortOrderRadioSubmit
}: Props) {
  return (
    <form className='radio-toolbar' id='radio-toolbar-sort' onChange={sortOrderRadioSubmit}>
      <input
        type='radio'
        className='radio-sort'
        id='sort-ascending'
        name='radioSort'
        value='sort ascending'
        onChange={sortOrderRadioSubmit}
        defaultChecked
      />

      <label htmlFor='sort-ascending'>⬇ sort least to most</label>
      <br />

      <input
        type='radio'
        className='radio-sort'
        id='sort-descending'
        name='radioSort'
        value='sort descending'
        onChange={sortOrderRadioSubmit}
      />
      <label htmlFor='sort-descending'>⬆ sort most to least</label>
      <br />

      <input
        type='radio'
        className='radio-sort'
        id='sort-alphabetical'
        name='radioSort'
        value='sort alphabetical'
        onChange={sortOrderRadioSubmit}
      />
      <label htmlFor='sort-alphabetical'>sort alphabetical</label>
      <br />
    </form>
  );
}
