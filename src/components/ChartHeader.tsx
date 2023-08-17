import React from 'react';
import { RefuseType, RefuseHeadingType } from '../types';

type Props = {
  year: number,
  refuseKind: RefuseType
};

export default function ChartHeader({
  year,
  refuseKind
}: Props) {
  let heading : RefuseHeadingType;
  // let refuseType = refuseType;

  switch (refuseKind) {
    case 'allcollected':
      heading = 'Trash/Recycling/Compost';
      break;
    case 'refusetonscollected':
      heading = 'Trash';
      break;
    case 'papertonscollected':
      heading = 'Paper & Cardboard';
      break;
    case 'mgptonscollected':
      heading = 'Metal/Glass/Plastic';
      break;
    case 'resorganicstons':
      heading = 'Organics';
      break;
    case 'leavesorganictons':
      heading = 'Leaves';
      break;
    case 'xmastreetons':
      heading = 'Christmas Trees';
      break;
    default:
      heading = 'Trash/Recycling/Compost';
  }

  return (
    <div>
      <h2>
        <span id='chart-description'>Comparing {heading} Collection for </span>
        <span id='chart-year'>{year}</span>
      </h2>
    </div>
  );
}
