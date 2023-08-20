import React, { ChangeEvent } from 'react';

type Props = {
  refuseTypeSubmit: (event: ChangeEvent<HTMLInputElement>) => void
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
        onChange={refuseTypeSubmit}
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
        onChange={refuseTypeSubmit}
      />
      <label htmlFor='refusetonscollected'>🗑️ trash</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='papertonscollected'
        name='radioType'
        value='paper & cardboard'
        onChange={refuseTypeSubmit}
      />
      <label htmlFor='papertonscollected'>🗞️📦 paper & cardboard</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='mgptonscollected'
        name='radioType'
        value='metal/glass/plastic'
        onChange={refuseTypeSubmit}
      />
      <label htmlFor='mgptonscollected'>🥫🍾🧃 metal/glass/plastic</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='resorganicstons'
        name='radioType'
        value='brown bin organics'
        onChange={refuseTypeSubmit}
      />
      <label htmlFor='resorganicstons'>🥬🥕🍎 brown bin organics</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='leavesorganictons'
        name='radioType'
        value='leaves'
        onChange={refuseTypeSubmit}
      />
      <label htmlFor='leavesorganictons'>🍂 leaves</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='xmastreetons'
        name='radioType'
        value='christmas trees'
        onChange={refuseTypeSubmit}
      />
      <label htmlFor='xmastreetons'>🎄 christmas trees</label>
      <br />
    </form>
  );
}
