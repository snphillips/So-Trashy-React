import React, { ChangeEvent } from "react";
import RefuseTypeButtonsRadio from "./RefuseTypeButtonsRadio";
import YearButton from "./YearButton";
import SortOrderRadio from "./SortOrderRadio";
import Footer from "./Footer";

type Props = {
  refuseTypeSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
  sortOrderRadioSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
  year: number;
  yearDropdownSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
};

export default function Sidebar({
  refuseTypeSubmit,
  sortOrderRadioSubmit,
  year,
  yearDropdownSubmit,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h1 className="title">So Trashy</h1>

        <p className="sidebar-text">
          Visualizing a neighborhood comparison of trash, recycling, and compost
          pick-up in New York City.
        </p>

        <YearButton year={year} yearDropdownSubmit={yearDropdownSubmit} />

        <RefuseTypeButtonsRadio refuseTypeSubmit={refuseTypeSubmit} />

        <SortOrderRadio sortOrderRadioSubmit={sortOrderRadioSubmit} />

        <br />
        <p className="sidebar-text sidebar-link">
          <a href="https://opendata.cityofnewyork.us/" id="open-data-link">
            Data: NYC Open Data{" "}
            <i className="fa fa-external-link-square" aria-hidden="true"></i>{" "}
          </a>
        </p>
        <p className="sidebar-text sidebar-link">
          <a
            href="https://data.cityofnewyork.us/City-Government/DSNY-Monthly-Tonnage-Data/ebb7-mvp5"
            id="DSNY-tonnage-link"
          >
            DSNY Monthly Tonnage Data{" "}
            <i className="fa fa-external-link-square" aria-hidden="true"></i>
          </a>
        </p>
        <p className="sidebar-text sidebar-link">
          <a
            href="https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2"
            id="nyc-population-link"
          >
            NYC Population by District{" "}
            <i className="fa fa-external-link-square" aria-hidden="true"></i>
          </a>
        </p>
        <p className="sidebar-text sidebar-link">
          <a
            href="https://communityprofiles.planning.nyc.gov/"
            id="community-district-link"
          >
            Community District Lookup{" "}
            <i className="fa fa-external-link-square" aria-hidden="true"></i>
          </a>
        </p>
        <Footer />
      </div>
    </aside>
  );
}
