import React, { ChangeEvent } from 'react';

type Props = {
  refuseTypeSubmit: (event: ChangeEvent<HTMLFormElement>) => void
};

export default function RefuseTypeButtonsRadio({ refuseTypeSubmit }: Props) {
  return (
    <form className='radio-toolbar' id='radio-toolbar-type' onChange={refuseTypeSubmit}>
      <fieldset>
        <legend id="refuse-radio-group-label" className="screen-reader-only">
          Choose a refuse collection type
        </legend>

        <input
          type='radio'
          className='radio-type'
          name='radioType'
          id='allcollected'
          value='all trash/recycling/compost'
          defaultChecked
        />
        <label htmlFor='allcollected'>all trash/recycling/compost</label>
        <br />

        <input
          type='radio'
          className='radio-type'
          name='radioType'
          id='refusetonscollected'
          value='trash'
        />
        <label htmlFor='refusetonscollected'>🗑️ trash</label>
        <br />

        <input
          type='radio'
          className='radio-type'
          name='radioType'
          id='papertonscollected'
          value='paper & cardboard'
        />
        <label htmlFor='papertonscollected'>🗞️📦 paper & cardboard</label>
        <br />

        <input
          type='radio'
          className='radio-type'
          name='radioType'
          id='mgptonscollected'
          value='metal/glass/plastic'
        />
        <label htmlFor='mgptonscollected'>🥫🍾🧃 metal/glass/plastic</label>
        <br />

        <input
          type='radio'
          className='radio-type'
          name='radioType'
          id='resorganicstons'
          value='brown bin organics'
        />
        <label htmlFor='resorganicstons'>🥬🥕🍎 brown bin organics</label>
        <br />

        <input
          type='radio'
          className='radio-type'
          name='radioType'
          id='leavesorganictons'
          value='leaves'
        />
        <label htmlFor='leavesorganictons'>🍂 leaves</label>
        <br />

        <input
          type='radio'
          className='radio-type'
          name='radioType'
          id='xmastreetons'
          value='christmas trees'
        />
        <label htmlFor='xmastreetons'>🎄 christmas trees</label>
      </fieldset>
    </form>
  );
}
