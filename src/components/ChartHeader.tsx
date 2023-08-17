import React from 'react';

type Props = {
  year: number,
  refuseType: string
};

export default function ChartHeader({
  year,
  refuseType
}: Props) {
  let heading;
  // let refuseType = refuseType;

  switch (refuseType) {
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
      heading = 'Christmas Tree';
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