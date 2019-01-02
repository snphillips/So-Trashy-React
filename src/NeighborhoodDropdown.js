import React, { Component } from 'react';

// https://communityprofiles.planning.nyc.gov/


export default class NeighborhoodDropdown extends Component {
  render() {
    return (

      <form onChange={this.props.neighborhoodDropdownSubmit}
            >

        <select id="neighborhood-dropdown"
                className="dropdown-button"
                value={this.props.neighborhood}
                onChange={this.props.neighborhoodDropdownSubmit}
                >

          <option value="All neighborhoods" >neighborhood lookup</option>
          <option value="Bronx 1" >Bronx 1: Melrose, Mott Haven, Port Morris</option>
          <option value="Bronx 2" >Bronx 2: Hunts Point, Longwood</option>
          <option value="Bronx 3" >Bronx 3: Claremont, Crotona Park East, Melrose, Morrisania</option>
          <option value="Bronx 4" >Bronx 4: Concourse, Concourse Village, East Concourse, Highbridge, Mount Eden</option>
          <option value="Bronx 5" >Bronx 5: Fordham, Morris Heights, Mount Hope, University Heights</option>
          <option value="Bronx 6" >Bronx 6: Bathgate, Belmont, Bronx Park South, East Tremont, West Farms</option>
          <option value="Bronx 7" >Bronx 7: Bedford Park, Fordham, Kingsbridge Heights, Norwood, University Heights</option>
          <option value="Bronx 8" >Bronx 8: Fieldston, Kingsbridge, Marble Hill, North Riverdale, Riverdale, Spuyten Duyvil</option>
          <option value="Bronx 9" >Bronx 9: Bronx River, Castle Hill, Clason Point, Harding Park, Parkchester, Soundview, Soundview-Bruckner, Unionport</option>
          <option value="Bronx 10" >Bronx 10: City Island, Co-op City, Country Club, Edgewater Park, Pelham Bay, Schuylerville, Throgs Neck, Westchester Square </option>
          <option value="Bronx 11" >Bronx 11: Allerton, Bronxdale, Indian Village, Morris Park, Pelham Gardens, Pelham Parkway, Van Nest </option>
          <option value="Bronx 12" >Bronx 12: Baychester, Eastchester, Edenwald, Olinville, Wakefield, Williamsbridge, Woodlawn</option>
          <option value="Brooklyn 1" >Brooklyn 1: East Williamsburg, Greenpoint, Northside, Southside, Williamsburg</option>
          <option value="Brooklyn 2" >Brooklyn 2: Boerum Hill, Brooklyn Heights, Clinton Hill, Downtown Brooklyn, DUMBO, Fort Greene, Vinegar Hill </option>
          <option value="Brooklyn 3" >Brooklyn 3: Bedford-Stuyvesant, Stuyvesant Heights, Tompkins Park North</option>
          <option value="Brooklyn 4" >Brooklyn 4: Bushwick</option>
          <option value="Brooklyn 5" >Brooklyn 5: Broadway Junction, City Line, Cypress Hills, East New York, Highland Park, New Lots, Spring Creek, Starrett City</option>
          <option value="Brooklyn 6" >Brooklyn 6: Carroll Gardens, Cobble Hill, Columbia St, Gowanus, Park Slope, Red Hook</option>
          <option value="Brooklyn 7" >Brooklyn 7: Sunset Park, Windsor Terrace</option>
          <option value="Brooklyn 8" >Brooklyn 8: Crown Heights, Prospect Heights, Weeksville</option>
          <option value="Brooklyn 9" >Brooklyn 9: Crown Heights South, Prospect Lefferts Gardens, Wingate</option>
          <option value="Brooklyn 10" >Brooklyn 10: Bay Ridge, Dyker Heights, Fort Hamilton</option>
          <option value="Brooklyn 11" >Brooklyn 11: Bath Beach, Bensonhurst, Gravesend, Mapleton</option>
          <option value="Brooklyn 12" >Brooklyn 12: Borough Park, Kensington, Ocean Parkway</option>
          <option value="Brooklyn 13" >Brooklyn 13: Brighton Beach, Coney Island, Gravesend, Homecrest, Sea Gate, West Brighton</option>
          <option value="Brooklyn 14" >Brooklyn 14: Ditmas Park, Flatbush, Manhattan Terrace, Midwood, Ocean Parkway, Prospect Park South</option>
          <option value="Brooklyn 15" >Brooklyn 15: Gerritsen Beach, Gravesend, Homecrest, Kings Highway, Manhattan Beach, Plumb Beach, Sheepshead Bay</option>
          <option value="Brooklyn 16" >Brooklyn 16: Broadway Junction, Brownsville, Ocean Hill</option>
          <option value="Brooklyn 17" >Brooklyn 17: East Flatbush, Farragut, Flatbush, Northeast Flatbush, Remsen Village, Rugby, Erasmus</option>
          <option value="Brooklyn 18" >Brooklyn 18: Bergen Beach, Canarsie, Flatlands, Georgetown, Marine Park, Mill Basin, Mill Island, Paerdegat Basin </option>
          <option value="Manhattan 1" >Manhattan 1: Battery Park City, South Street Seaport, Tribeca, Wall Street</option>
          <option value="Manhattan 2" >Manhattan 2: Greenwich Village, Hudson Square, Little Italy, NoHo, SoHo, South Village, West Village</option>
          <option value="Manhattan 3" >Manhattan 3: Chinatown, East Village, Lower East Side, NoHo, Two Bridges</option>
          <option value="Manhattan 4" >Manhattan 4: Chelsea, Clinton, Hudson Yards </option>
          <option value="Manhattan 5" >Manhattan 5: Flatiron, Gramercy Park, Herald Square, Midtown, Midtown South, Murray Hill, Times Square, Union Square</option>
          <option value="Manhattan 6" >Manhattan 6: Beekman Place, Gramercy Park, Murray Hill, Peter Cooper Village, Stuyvesant Town, Sutton Place, Tudor City </option>
          <option value="Manhattan 7" >Manhattan 7: Lincoln Square, Manhattan Valley, Upper West Side </option>
          <option value="Manhattan 8" >Manhattan 8: Carnegie Hill, Lenox Hill, Roosevelt Island, Upper East Side, Yorkville </option>
          <option value="Manhattan 9" >Manhattan 9: Hamilton Heights, Manhattanville, Morningside Heights, West Harlem</option>
          <option value="Manhattan 10" >Manhattan 10: Central Harlem </option>
          <option value="Manhattan 11" >Manhattan 11: East Harlem, Harlem, Randall's Island Park, Wards Island Park </option>
          <option value="Manhattan 12" >Manhattan 12: Inwood, Washington Heights </option>
          <option value="Queens 1" >Queens 1: Astoria, Queensbridge </option>
          <option value="Queens 2" >Queens 2: Blissville, Hunters Point, Long Island City, Sunnyside, Woodside</option>
          <option value="Queens 3" >Queens 3: East Elmhurst, Jackson Heights, North Corona</option>
          <option value="Queens 4" >Queens 4: </option>
          <option value="Queens 5" >Queens 5: </option>
          <option value="Queens 6" >Queens 6: </option>
          <option value="Queens 7" >Queens 7: </option>
          <option value="Queens 8" >Queens 8: </option>
          <option value="Queens 9" >Queens 9: </option>
          <option value="Queens 10" >Queens 10: </option>
          <option value="Queens 11" >Queens 11: </option>
          <option value="Queens 12" >Queens 12: </option>
          <option value="Queens 13" >Queens 13: </option>
          <option value="Queens 14" >Queens 14: </option>
          <option value="Staten Island 1" >Staten Island 1: </option>
          <option value="Staten Island 2" >Staten Island 2: </option>
          <option value="Staten Island 3" >Staten Island 3: </option>


        </select>


     </form>

    );
  }
}
