// Typescript enums and interfaces

export type RefuseHeadingType =
  | 'Trash/Recycling/Compost'
  | 'Trash'
  | 'Paper & Cardboard'
  | 'Metal/Glass/Plastic'
  | 'Organics'
  | 'Leaves'
  | 'Christmas Trees';

export type RefuseTypes =
  | 'allcollected'
  | 'leavesorganictons'
  | 'mgptonscollected'
  | 'papertonscollected'
  | 'refusetonscollected'
  | 'resorganicstons'
  | 'schoolorganictons'
  | 'xmastreetons';

export type BoroughType = 'Bronx' | 'Brooklyn' | 'Manhattan' | 'Queens' | 'Staten Island';

export type SortOrderType = 'ascending' | 'descending' | 'alphabetical';

// The city's data calls this communitydistrict
// 7A is from when the city's data had Queens 7A
// as a Community District for unknown reasons
export type CommunityDistrictNumberType =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '7A';

// The city's data had Queens 7A
// as a Community District for unknown reasons
export type BoroughDistrictType =
  | 'Bronx 01'
  | 'Bronx 02'
  | 'Bronx 03'
  | 'Bronx 04'
  | 'Bronx 05'
  | 'Bronx 06'
  | 'Bronx 07'
  | 'Bronx 08'
  | 'Bronx 09'
  | 'Bronx 10'
  | 'Bronx 11'
  | 'Bronx 12'
  | 'Brooklyn 01'
  | 'Brooklyn 02'
  | 'Brooklyn 03'
  | 'Brooklyn 04'
  | 'Brooklyn 05'
  | 'Brooklyn 06'
  | 'Brooklyn 07'
  | 'Brooklyn 08'
  | 'Brooklyn 09'
  | 'Brooklyn 10'
  | 'Brooklyn 11'
  | 'Brooklyn 12'
  | 'Brooklyn 13'
  | 'Brooklyn 14'
  | 'Brooklyn 15'
  | 'Brooklyn 16'
  | 'Brooklyn 17'
  | 'Brooklyn 18'
  | 'Manhattan 01'
  | 'Manhattan 02'
  | 'Manhattan 03'
  | 'Manhattan 04'
  | 'Manhattan 05'
  | 'Manhattan 06'
  | 'Manhattan 07'
  | 'Manhattan 08'
  | 'Manhattan 09'
  | 'Manhattan 10'
  | 'Manhattan 11'
  | 'Manhattan 12'
  | 'Queens 01'
  | 'Queens 02'
  | 'Queens 03'
  | 'Queens 04'
  | 'Queens 05'
  | 'Queens 06'
  | 'Queens 07'
  | 'Queens 08'
  | 'Queens 09'
  | 'Queens 10'
  | 'Queens 11'
  | 'Queens 12'
  | 'Queens 13'
  | 'Queens 14'
  | 'Staten Island 01'
  | 'Staten Island 02'
  | 'Staten Island 03'
  | 'Queens 7A';

export type CommunityDistrictNameType =
  | 'Melrose, Mott Haven, Port Morris'
  | 'Hunts Point, Longwood'
  | 'Claremont, Crotona Park East, Melrose, Morrisania'
  | 'Concourse, Concourse Village, East Concourse, Highbridge, Mount Eden'
  | 'Fordham, Morris Heights, Mount Hope, University Heights'
  | 'Bathgate, Belmont, Bronx Park South, East Tremont, West Farms'
  | 'Bedford Park, Fordham, Kingsbridge Heights, Norwood, University Heights'
  | 'Fieldston, Kingsbridge, Marble Hill, Riverdale, Spuyten Duyvil'
  | 'Bronx River, Castle Hill, Clason Point, Harding Park, Parkchester, Soundview'
  | 'Throgs Neck, Co-op City, Pelham Bay'
  | 'Pelham Pkwy, Morris Park, Laconia'
  | 'Wakefield, Williamsbridge'
  | 'Williamsburg, Greenpoint'
  | 'Brooklyn Heights, Fort Greene, Downtown Brooklyn, Boerum Hill'
  | 'Bedford-Stuyvesant, Stuyvesant Heights, Tompkins Park North'
  | 'Bushwick'
  | 'East New York, Broadway Junction, City Line, Cypress Hills, New Lots'
  | 'Park Slope, Carroll Gardens, Cobble Hill, Gowanus, Red Hook'
  | 'Sunset Park, Windsor Terrace'
  | 'Crown Heights, Prospect Heights, Weeksville'
  | 'Crown Heights South, Wingate'
  | 'Bay Ridge, Dyker Heights'
  | 'Bensonhurst, Bath Beach '
  | 'Borough Park, Ocean Parkway'
  | 'Coney Island, Brighton Beach'
  | 'Ditmas Park, Flatbush, Midwood, Ocean Parkway'
  | 'Sheepshead Bay, Gerritsen Beach'
  | 'Brownsville, Ocean Hill'
  | 'East Flatbush, Farragut, Flatbush, Northeast Flatbush, Remsen Village, Rugby, Erasmus'
  | 'Canarsie, Flatlands'
  | 'Battery Park City, Tribeca'
  | 'Greenwich Village, Soho'
  | 'Lower East Side, Chinatown'
  | 'Chelsea, Clinton'
  | 'Midtown Business District'
  | 'Stuyvesant Town, Turtle Bay'
  | 'West Side, Upper West Side'
  | 'Upper East Side, Carnegie Hill, Lenox Hill, Roosevelt Island, Yorkville'
  | 'Manhattanville, Hamilton Heights'
  | 'Central Harlem'
  | "East Harlem, Harlem, Randall's Island, Wards Island"
  | 'Washington Heights, Inwood'
  | 'Astoria, Long Island City'
  | 'Sunnyside, Woodside'
  | 'Jackson Heights, North Corona'
  | 'Elmhurst, South Corona'
  | 'Ridgewood, Glendale, Maspeth'
  | 'Forest Hills, Rego Park'
  | 'Flushing, Bay Terrace'
  | 'Fresh Meadows, Briarwood'
  | 'Woodhaven, Richmond Hill'
  | 'Ozone Park, Howard Beach'
  | 'Bayside, Douglaston, Little Neck'
  | 'Jamaica, St. Albans, Hollis'
  | 'Queens Village, Rosedale'
  | 'The Rockaways, Broad Channel'
  | 'Stapleton, Port Richmond'
  | 'New Springville, South Beach'
  | 'Tottenville, Woodrow, Great Kills';

/* Several notes about the city's data:
1) All the city's data comes in as strings
2) Not all refuse types are reported on in every district, 
every month of the year. For instance, xmas trees are only picked up
in December or January. Also, not all neighborhoods have
had organics pick up...We use a ? after 
all the refuse types because some types may be undefined.
Expect other situations like this. */

// Base type with common properties
type BaseCityDataType = {
  borough: string;
  borough_id: string;
  communitydistrict: string;
  month: string;
};

// Type for data with string properties
export type CityResponseDataType = BaseCityDataType & {
  leavesorganictons?: string;
  mgptonscollected: string;
  papertonscollected: string;
  refusetonscollected: string;
  resorganicstons?: string;
  schoolorganictons?: string;
  xmastreetons?: string;
};

// Type for data with number properties
export type CityDataWeightsAsNumbersType = BaseCityDataType & {
  boroughDistrict: string;
  leavesorganictons?: number;
  mgptonscollected: number;
  papertonscollected: number;
  refusetonscollected: number;
  resorganicstons?: number;
  schoolorganictons?: number;
  xmastreetons?: number;
};

export interface WorkingDataItemType {
  allcollected?: number;
  borough?: BoroughType;
  boroughDistrict?: string;
  communitydistrict?: CommunityDistrictNumberType;
  communityDistrictName?: CommunityDistrictNameType;
  leavesorganictons?: number;
  mgptonscollected?: number;
  papertonscollected?: number;
  refusetonscollected?: number;
  resorganicstons?: number;
  schoolorganictons?: number;
  xmastreetons?: number;
  _2010_population?: number;
  _2020_population?: number;
}

export interface DataItemType {
  allcollected: number;
  borough: BoroughType;
  boroughDistrict: string;
  communitydistrict: CommunityDistrictNumberType;
  communityDistrictName: CommunityDistrictNameType;
  leavesorganictons: number;
  mgptonscollected: number;
  papertonscollected: number;
  refusetonscollected: number;
  resorganicstons: number;
  schoolorganictons: number;
  xmastreetons: number;
  _2010_population: number;
  _2020_population: number;
}
export interface PopNeighbDataType {
  borough: BoroughType;
  boroughDistrict: BoroughDistrictType;
  communityDistrictName: CommunityDistrictNameType;
  communitydistrict: CommunityDistrictNumberType;
  _2010_population: number;
  _2020_population: number;
}

export interface AllRefuseTonsCollectedType {
  refusetonscollected: number;
  papertonscollected: number;
  mgptonscollected: number;
  resorganicstons: number;
  leavesorganictons: number;
  xmastreetons: number;
}
