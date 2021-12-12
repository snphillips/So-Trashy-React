   /* 
   ==================================
   Get population data
   not using the function b/c I'm currently importing
   data from the popNeighbData array of objects below
   ==================================
   */
   
  // getPopulationData(){
  //   let openDataPopSourceLink = `https://data.cityofnewyork.us/resource/5hae-yeks.json`

  //   axios.get(openDataPopSourceLink)
  //     .then( (response) =>  {

  //       console.log("population data:", response.data);
  //       this.setState({populationData: response.data})
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  

  let popNeighbData = [
    {
      _1970_population: 138557,
      _1980_population: 78441,
      _1990_population: 77214,
      _2000_population: 82159,
      _2010_population: 91497,
      _2020_population: 100929,
      borough: "Bronx",
      cd_name: "Melrose, Mott Haven, Port Morris",
      communitydistrict: "01"
    },
    {
      _1970_population: 99493,
      _1980_population: 34399,
      _1990_population: 39443,
      _2000_population: 46824,
      _2010_population: 52246,
      _2020_population: 54454,
      borough: "Bronx",
      cd_name: "Hunts Point, Longwood",
      communitydistrict: "02"
    },
    {
      _1970_population: 150636,
      _1980_population: 53635,
      _1990_population: 57162,
      _2000_population: 68574,
      _2010_population: 79762,
      _2020_population: 93755,
      borough: "Bronx",
      cd_name: "Claremont, Crotona Park East, Melrose, Morrisania",
      communitydistrict: "03"
    },
    {
      _1970_population: 144207,
      _1980_population: 114312,
      _1990_population: 119962,
      _2000_population: 139563,
      _2010_population: 146441,
      _2020_population: 150436,
      borough: "Bronx",
      cd_name: "Concourse, Concourse Village, East Concourse, Highbridge, Mount Eden",
      communitydistrict: "04"
    },
    {
    _1970_population: 121807,
    _1980_population: 107995,
    _1990_population: 118435,
    _2000_population: 128313,
    _2010_population: 128200,
    _2020_population: 132584,
    borough: "Bronx",
    cd_name: "Fordham, Morris Heights, Mount Hope, University Heights",
    communitydistrict: "05"
    },
    {
    _1970_population: 114137,
    _1980_population: 65016,
    _1990_population: 68061,
    _2000_population: 75688,
    _2010_population: 83268,
    _2020_population: 89216,
    borough: "Bronx",
    cd_name: "Bathgate, Belmont, Bronx Park South, East Tremont, West Farms",
    communitydistrict: "06"
    },
    {
    _1970_population: 113764,
    _1980_population: 116827,
    _1990_population: 128588,
    _2000_population: 141411,
    _2010_population: 139286,
    _2020_population: 146813,
    borough: "Bronx",
    cd_name: "Bedford Park, Fordham, Kingsbridge Heights, Norwood, University Heights",
    communitydistrict: "07"
    },
    {
    _1970_population: 103543,
    _1980_population: 98275,
    _1990_population: 97030,
    _2000_population: 101332,
    _2010_population: 101731,
    _2020_population: 106924,
    borough: "Bronx",
    cd_name: "Fieldston, Kingsbridge, Marble Hill, Riverdale, Spuyten Duyvil",
    communitydistrict: "08"
    },
    {
    _1970_population: 166442,
    _1980_population: 167627,
    _1990_population: 155970,
    _2000_population: 167859,
    _2010_population: 172298,
    _2020_population: 188249,
    borough: "Bronx",
    cd_name: "Bronx River, Castle Hill, Clason Point, Harding Park, Parkchester, Soundview",
    communitydistrict: "09"
    },
    {
    _1970_population: 84948,
    _1980_population: 106516,
    _1990_population: 108093,
    _2000_population: 115948,
    _2010_population: 120392,
    _2020_population: 130763,
    borough: "Bronx",
    cd_name: "Throgs Nk., Co-op City, Pelham Bay",
    communitydistrict: "10"
    },
    {
    _1970_population: 105980,
    _1980_population: 99080,
    _1990_population: 97842,
    _2000_population: 110706,
    _2010_population: 113232,
    _2020_population: 119666,
    borough: "Bronx",
    cd_name: "Pelham Pkwy, Morris Park, Laconia",
    communitydistrict: "11"
    },
    {
    _1970_population: 135010,
    _1980_population: 128226,
    _1990_population: 129620,
    _2000_population: 149077,
    _2010_population: 152344,
    _2020_population: 163489,
    borough: "Bronx",
    cd_name: "Wakefield, Williamsbridge",
    communitydistrict: "12"
    },
    {
    _1970_population: 179390,
    _1980_population: 142942,
    _1990_population: 155972,
    _2000_population: 160338,
    _2010_population: 173083,
    _2020_population: 204125,
    borough: "Brooklyn",
    cd_name: "Williamsburg, Greenpoint",
    communitydistrict: "01"
    },
    {
    _1970_population: 110221,
    _1980_population: 92732,
    _1990_population: 94534,
    _2000_population: 98620,
    _2010_population: 99617,
    _2020_population: 130021,
    borough: "Brooklyn",
    cd_name: "Brooklyn Heights, Fort Greene, Downtown Brooklyn, Boerum Hill",
    communitydistrict: "02"
    },
    {
    _1970_population: 203380,
    _1980_population: 133379,
    _1990_population: 138696,
    _2000_population: 143867,
    _2010_population: 152985,
    _2020_population: 174960,
    borough: "Brooklyn",
    cd_name: "Bedford-Stuyvesant, Stuyvesant Heights, Tompkins Park North",
    communitydistrict: "03"
    },
    {
    _1970_population: 137902,
    _1980_population: 92497,
    _1990_population: 102572,
    _2000_population: 104358,
    _2010_population: 112634,
    _2020_population: 120747,
    borough: "Brooklyn",
    cd_name: "Bushwick",
    communitydistrict: "04"
    },
    {
    _1970_population: 170791,
    _1980_population: 154931,
    _1990_population: 161350,
    _2000_population: 173198,
    _2010_population: 182896,
    _2020_population: 200293,
    borough: "Brooklyn",
    cd_name: "East New York, Broadway Junction, City Line, Cypress Hills, New Lots",
    communitydistrict: "05"
    },
    {
    _1970_population: 138933,
    _1980_population: 110228,
    _1990_population: 102724,
    _2000_population: 104054,
    _2010_population: 104709,
    _2020_population: 113933,
    borough: "Brooklyn",
    cd_name: "Park Slope, Carroll Gardens, Cobble Hill, Gowanus, Red Hook",
    communitydistrict: "06"
    },
    {
    _1970_population: 111607,
    _1980_population: 98567,
    _1990_population: 102553,
    _2000_population: 120063,
    _2010_population: 126230,
    _2020_population: 133230,
    borough: "Brooklyn",
    cd_name: "Sunset Park, Windsor Terrace",
    communitydistrict: "07"
    },
    {
    _1970_population: 121821,
    _1980_population: 88796,
    _1990_population: 96400,
    _2000_population: 96076,
    _2010_population: 96317,
    _2020_population: 108259,
    borough: "Brooklyn",
    cd_name: "Crown Heights, Prospect Heights, Weeksville",
    communitydistrict: "08"
    },
    {
    _1970_population: 101047,
    _1980_population: 96669,
    _1990_population: 110715,
    _2000_population: 104014,
    _2010_population: 98429,
    _2020_population: 102000,
    borough: "Brooklyn",
    cd_name: "Crown Heights South, Wingate",
    communitydistrict: "09"
    },
    {
    _1970_population: 129822,
    _1980_population: 118187,
    _1990_population: 110612,
    _2000_population: 122542,
    _2010_population: 124491,
    _2020_population: 136071,
    borough: "Brooklyn",
    cd_name: "Bay Ridge, Dyker Heights",
    communitydistrict: "10"
    },
    {
    _1970_population: 170119,
    _1980_population: 155072,
    _1990_population: 149994,
    _2000_population: 172129,
    _2010_population: 181981,
    _2020_population: 198870,
    borough: "Brooklyn",
    cd_name: "Bensonhurst, Bath Beach ",
    communitydistrict: "11"
    },
    {
    _1970_population: 166301,
    _1980_population: 155899,
    _1990_population: 160018,
    _2000_population: 185046,
    _2010_population: 191382,
    _2020_population: 205377,
    borough: "Brooklyn",
    cd_name: "Borough Park, Ocean Parkway",
    communitydistrict: "12"
    },
    {
    _1970_population: 97750,
    _1980_population: 100030,
    _1990_population: 102596,
    _2000_population: 106120,
    _2010_population: 104278,
    _2020_population: 108905,
    borough: "Brooklyn",
    cd_name: "Coney Island, Brighton Beach",
    communitydistrict: "13"
    },
    {
    _1970_population: 137041,
    _1980_population: 143859,
    _1990_population: 159825,
    _2000_population: 168806,
    _2010_population: 160664,
    _2020_population: 164568,
    borough: "Brooklyn",
    cd_name: "Ditmas Park, Flatbush, Midwood, Ocean Parkway",
    communitydistrict: "14"
    },
    {
    _1970_population: 164815,
    _1980_population: 149572,
    _1990_population: 143477,
    _2000_population: 160319,
    _2010_population: 159650,
    _2020_population: 169632,
    borough: "Brooklyn",
    cd_name: "Sheepshead Bay, Gerritsen Beach",
    communitydistrict: "15"
    },
    {
    _1970_population: 122589,
    _1980_population: 73801,
    _1990_population: 84923,
    _2000_population: 85343,
    _2010_population: 86468,
    _2020_population: 98506,
    borough: "Brooklyn",
    cd_name: "Brownsville, Ocean Hill",
    communitydistrict: "16"
    },
    {
    _1970_population: 149496,
    _1980_population: 154596,
    _1990_population: 161261,
    _2000_population: 165753,
    _2010_population: 155252,
    _2020_population: 162446,
    borough: "Brooklyn",
    cd_name: "East Flatbush, Farragut, Flatbush, Northeast Flatbush, Remsen Village, Rugby, Erasmus",
    communitydistrict: "17"
    },
    {
    _1970_population: 188643,
    _1980_population: 169092,
    _1990_population: 162428,
    _2000_population: 194653,
    _2010_population: 193543,
    _2020_population: 204095,
    borough: "Brooklyn",
    cd_name: "Canarsie, Flatlands",
    communitydistrict: "18"
    },
    {
    _1970_population: 7706,
    _1980_population: 15918,
    _1990_population: 25366,
    _2000_population: 34420,
    _2010_population: 60978,
    _2020_population: 78390,
    borough: "Manhattan",
    cd_name: "Battery Park City, Tribeca",
    communitydistrict: "01"
    },
    {
    _1970_population: 84337,
    _1980_population: 87069,
    _1990_population: 94105,
    _2000_population: 93119,
    _2010_population: 90016,
    _2020_population: 92445,
    borough: "Manhattan",
    cd_name: "Greenwich Village, Soho",
    communitydistrict: "02"
    },
    {
    _1970_population: 181845,
    _1980_population: 154848,
    _1990_population: 161617,
    _2000_population: 164407,
    _2010_population: 163277,
    _2020_population: 163141,
    borough: "Manhattan",
    cd_name: "Lower East Side, Chinatown",
    communitydistrict: "03"
    },
    {
    _1970_population: 83601,
    _1980_population: 82164,
    _1990_population: 84431,
    _2000_population: 87479,
    _2010_population: 103245,
    _2020_population: 131351,
    borough: "Manhattan",
    cd_name: "Chelsea, Clinton",
    communitydistrict: "04"
    },
    {
    _1970_population: 31076,
    _1980_population: 39544,
    _1990_population: 43507,
    _2000_population: 44028,
    _2010_population: 51673,
    _2020_population: 63600,
    borough: "Manhattan",
    cd_name: "Midtown Business District",
    communitydistrict: "05"
    },
    {
    _1970_population: 122465,
    _1980_population: 127554,
    _1990_population: 133748,
    _2000_population: 136152,
    _2010_population: 142745,
    _2020_population: 155614,
    borough: "Manhattan",
    cd_name: "Stuyvesant Town, Turtle Bay",
    communitydistrict: "06"
    },
    {
    _1970_population: 212422,
    _1980_population: 206669,
    _1990_population: 210993,
    _2000_population: 207699,
    _2010_population: 209084,
    _2020_population: 222129,
    borough: "Manhattan",
    cd_name: "West Side, Upper West Side",
    communitydistrict: "07"
    },
    {
    _1970_population: 200851,
    _1980_population: 204305,
    _1990_population: 210880,
    _2000_population: 217063,
    _2010_population: 219920,
    _2020_population: 231983,
    borough: "Manhattan",
    cd_name: "Upper East Side, Carnegie Hill, Lenox Hill, Roosevelt Island, Yorkville",
    communitydistrict: "08"
    },
    {
    _1970_population: 113606,
    _1980_population: 103038,
    _1990_population: 106978,
    _2000_population: 111724,
    _2010_population: 110193,
    _2020_population: 110458,
    borough: "Manhattan",
    cd_name: "Manhattanville, Hamilton Heights",
    communitydistrict: "09"
    },
    {
    _1970_population: 159267,
    _1980_population: 105641,
    _1990_population: 99519,
    _2000_population: 107109,
    _2010_population: 115723,
    _2020_population: 115723,
    borough: "Manhattan",
    cd_name: "Central Harlem",
    communitydistrict: "10"
    },
    {
    _1970_population: 154662,
    _1980_population: 114569,
    _1990_population: 110508,
    _2000_population: 117743,
    _2010_population: 120511,
    _2020_population: 125771,
    borough: "Manhattan",
    cd_name: "East Harlem, Harlem, Randall's Island, Wards Island",
    communitydistrict: "11"
    },
    {
    _1970_population: 180561,
    _1980_population: 179941,
    _1990_population: 198192,
    _2000_population: 208414,
    _2010_population: 190020,
    _2020_population: 180206,
    borough: "Manhattan",
    cd_name: "Washington Heights, Inwood",
    communitydistrict: "12"
    },
    {
    _1970_population: 185925,
    _1980_population: 185198,
    _1990_population: 188549,
    _2000_population: 211220,
    _2010_population: 191105,
    _2020_population: 196803,
    borough: "Queens",
    cd_name: "Astoria, Long Island City",
    communitydistrict: "01"
    },
    {
    _1970_population: 95073,
    _1980_population: 88927,
    _1990_population: 94845,
    _2000_population: 109920,
    _2010_population: 113200,
    _2020_population: 137981,
    borough: "Queens",
    cd_name: "Sunnyside, Woodside",
    communitydistrict: "02"
    },
    {
    _1970_population: 123635,
    _1980_population: 122090,
    _1990_population: 128924,
    _2000_population: 169083,
    _2010_population: 171576,
    _2020_population: 179134,
    borough: "Queens",
    cd_name: "Jackson Heights, North Corona",
    communitydistrict: "03"
    },
    {
    _1970_population: 108233,
    _1980_population: 118430,
    _1990_population: 137023,
    _2000_population: 167005,
    _2010_population: 172598,
    _2020_population: 181025,
    borough: "Queens",
    cd_name: "Elmhurst, South Corona",
    communitydistrict: "04"
    },
    {
    _1970_population: 161022,
    _1980_population: 150142,
    _1990_population: 149126,
    _2000_population: 165911,
    _2010_population: 169190,
    _2020_population: 178178,
    borough: "Queens",
    cd_name: "Ridgewood, Glendale, Maspeth",
    communitydistrict: "05"
    },
    {
    _1970_population: 120429,
    _1980_population: 112245,
    _1990_population: 106996,
    _2000_population: 115967,
    _2010_population: 113257,
    _2020_population: 120955,
    borough: "Queens",
    cd_name: "Forest Hills, Rego Park",
    communitydistrict: "06"
    },
    {
    _1970_population: 207589,
    _1980_population: 204785,
    _1990_population: 220508,
    _2000_population: 242952,
    _2010_population: 247354,
    _2020_population: 269587,
    borough: "Queens",
    cd_name: "Flushing, Bay Terrace",
    communitydistrict: "07"
    },
    {
    _1970_population: 142468,
    _1980_population: 125312,
    _1990_population: 132101,
    _2000_population: 146594,
    _2010_population: 151107,
    _2020_population: 161402,
    borough: "Queens",
    cd_name: "Fresh Meadows, Briarwood",
    communitydistrict: "08"
    },
    {
    _1970_population: 110367,
    _1980_population: 109505,
    _1990_population: 112151,
    _2000_population: 141608,
    _2010_population: 143317,
    _2020_population: 152839,
    borough: "Queens",
    cd_name: "Woodhaven, Richmond Hill",
    communitydistrict: "09"
    },
    {
    _1970_population: 113857,
    _1980_population: 105651,
    _1990_population: 107768,
    _2000_population: 127274,
    _2010_population: 122396,
    _2020_population: 129411,
    borough: "Queens",
    cd_name: "Ozone Park, Howard Beach",
    communitydistrict: "10"
    },
    {
    _1970_population: 127883,
    _1980_population: 110963,
    _1990_population: 108056,
    _2000_population: 116404,
    _2010_population: 116431,
    _2020_population: 122211,
    borough: "Queens",
    cd_name: "Bayside, Douglaston, Little Neck",
    communitydistrict: "11"
    },
    {
    _1970_population: 206639,
    _1980_population: 189383,
    _1990_population: 201293,
    _2000_population: 223602,
    _2010_population: 225919,
    _2020_population: 226278,
    borough: "Queens",
    cd_name: "Jamaica, St. Albans, Hollis",
    communitydistrict: "12"
    },
    {
    _1970_population: 184647,
    _1980_population: 173178,
    _1990_population: 177535,
    _2000_population: 196284,
    _2010_population: 188593,
    _2020_population: 199218,
    borough: "Queens",
    cd_name: "Queens Village, Rosedale",
    communitydistrict: "13"
    },
    {
    _1970_population: 98228,
    _1980_population: 100592,
    _1990_population: 100596,
    _2000_population: 106686,
    _2010_population: 114978,
    _2020_population: 124173,
    borough: "Queens",
    cd_name: "The Rockaways, Broad Channel",
    communitydistrict: "14"
    },
    {
    _1970_population: 135875,
    _1980_population: 138489,
    _1990_population: 137806,
    _2000_population: 162609,
    _2010_population: 175756,
    _2020_population: 189663,
    borough: "Staten Island",
    cd_name: "Stapleton, Port Richmond",
    communitydistrict: "01"
    },
    {
    _1970_population: 85985,
    _1980_population: 105128,
    _1990_population: 113944,
    _2000_population: 127071,
    _2010_population: 132003,
    _2020_population: 140795,
    borough: "Staten Island",
    cd_name: "New Springville, South Beach",
    communitydistrict: "02"
    },
    {
    _1970_population: 72815,
    _1980_population: 108249,
    _1990_population: 126956,
    _2000_population: 152908,
    _2010_population: 160209,
    _2020_population: 164723,
    borough: "Staten Island",
    cd_name: "Tottenville, Woodrow, Great Kills",
    communitydistrict: "03"
    }
]



export default popNeighbData;
