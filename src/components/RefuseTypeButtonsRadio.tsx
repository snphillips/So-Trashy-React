import React, { ChangeEvent } from 'react';

type Props = {
  refuseTypeSubmit: (event: ChangeEvent<HTMLFormElement>) => void
};

// TODO: refactor to be more DRY

export default function RefuseTypeButtonsRadio({
  refuseTypeSubmit
}: Props) {
  return (
    <form className='radio-toolbar' id='radio-toolbar-type' onChange={refuseTypeSubmit}>
      <input
        type='radio'
        className='radio-type'
        id='allcollected'
        name='radioType'
        value='all trash/recycling/compost'
        defaultChecked
      />
      <label htmlFor='allcollected'>all trash/recycling/compost</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='refusetonscollected'
        name='radioType'
        value='trash'
      />
      <label htmlFor='refusetonscollected'>🗑️ trash</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='papertonscollected'
        name='radioType'
        value='paper & cardboard'
      />
      <label htmlFor='papertonscollected'>🗞️📦 paper & cardboard</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='mgptonscollected'
        name='radioType'
        value='metal/glass/plastic'
      />
      <label htmlFor='mgptonscollected'>🥫🍾🧃 metal/glass/plastic</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='resorganicstons'
        name='radioType'
        value='brown bin organics'
      />
      <label htmlFor='resorganicstons'>🥬🥕🍎 brown bin organics</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='leavesorganictons'
        name='radioType'
        value='leaves'
      />
      <label htmlFor='leavesorganictons'>🍂 leaves</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='xmastreetons'
        name='radioType'
        value='christmas trees'
      />
      <label htmlFor='xmastreetons'>🎄 christmas trees</label>
      <br />
    </form>
  );
}
