import _ from 'lodash';
import { CityDataWeightsAsNumbersType } from '../types/types';

/* ==================================
  The raw data needs changes:
  1) the refuse weights need to be converted from strings to numbers
  2) the NaN weights need to be changed to 0
  ================================== */

export function convertWeightStringToNumber(data: any[]): CityDataWeightsAsNumbersType[] {
  return data.map((entry) => ({
    /* 
      .parseInt turns weights from strings to numbers
      If an entry doesn't exist (which happens frequently), insert 0
      If we don't check for non-existent entries, NaN is inserted,
      NaNs don't break the app, but they are ugly and confusing to the user.
      */

    ...entry,
    refusetonscollected: _.parseInt(entry.refusetonscollected || 0),
    papertonscollected: _.parseInt(entry.papertonscollected || 0),
    mgptonscollected: _.parseInt(entry.mgptonscollected || 0),
    resorganicstons: _.parseInt(entry.resorganicstons || 0),
    leavesorganictons: _.parseInt(entry.leavesorganictons || 0),
    schoolorganictons: _.parseInt(entry.schoolorganictons || 0),
    xmastreetons: _.parseInt(entry.xmastreetons || 0),
    allcollected: _.parseInt(entry.allcollected || 0),
  }));
}
