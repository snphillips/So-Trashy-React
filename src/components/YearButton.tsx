import React, { ChangeEvent } from "react";

type Props = {
  yearDropdownSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
  year: number;
};

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2010 + 1 },
  (_, index) => currentYear - index
);

export default function YearButton({ yearDropdownSubmit, year }: Props) {
  return (
    <form onChange={yearDropdownSubmit}>
      <label htmlFor="year-select" className="screen-reader-only">
        Select a year
      </label>
      <select className="year-dropdown-button" defaultValue={year}>
        <option className="year" value={currentYear} id="default-current-year">
          year
        </option>
        {years.map((year) => (
          <option key={year} className="year" value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}
