import React from 'react';

export default function RefuseTypeButtonsRadio(props) {
  return (
    <form className='radio-toolbar' id='radio-toolbar-type' onChange={props.refuseTypeSubmit}>
      <input
        type='radio'
        className='radio-type'
        id='allcollected'
        name='radioType'
        value='all trash/recycling/compost'
        onChange={props.refuseTypeSubmit}
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
        onChange={props.refuseTypeSubmit}
      />
      <label htmlFor='refusetonscollected'>trash</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='papertonscollected'
        name='radioType'
        value='paper & cardboard'
        onChange={props.refuseTypeSubmit}
      />
      <label htmlFor='papertonscollected'>paper & cardboard</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='mgptonscollected'
        name='radioType'
        value='metal/glass/plastic'
        onChange={props.refuseTypeSubmit}
      />
      <label htmlFor='mgptonscollected'>metal/glass/plastic</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='resorganicstons'
        name='radioType'
        value='brown bin organics'
        onChange={props.refuseTypeSubmit}
      />
      <label htmlFor='resorganicstons'>brown bin organics</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='leavesorganictons'
        name='radioType'
        value='leaves'
        onChange={props.refuseTypeSubmit}
      />
      <label htmlFor='leavesorganictons'>leaves</label>
      <br />

      <input
        type='radio'
        className='radio-type'
        id='xmastreetons'
        name='radioType'
        value='christmas trees'
        onChange={props.refuseTypeSubmit}
      />
      <label htmlFor='xmastreetons'>christmas trees</label>
      <br />
    </form>
  );
}
