import * as d3 from "d3";
import { DataItemType, RefuseTypes } from "../types/types";

export function drawChart(
  data: DataItemType[],
  refuseType: RefuseTypes,
  year: number
) {
  // clear existing chart before we create new one
  d3.selectAll("svg > *").remove();
  const svg = d3.select("svg");

  const getPopulation = (d: DataItemType) =>
    year >= 2020 ? d._2020_population : d._2010_population;

  const margin = { top: 60, right: 140, bottom: 190, left: 150 };
  const width = Number(svg.attr("width"));
  const height = Number(svg.attr("height"));

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  /* ==================================
    Colors
    ================================== */
  const colorBars = d3
    .scaleOrdinal<string, string>()
    .domain(["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"])
    .range(["#21E0D6", "#EF767A", "#820933", "#6457A6", "#2C579E"]);

  /* ==================================
    Tooltip shelf (for mobile)
    ================================== */

  // Inject the shelf HTML if not already in the DOM
  if (!document.getElementById("info-shelf")) {
    const shelf = document.createElement("div");
    shelf.id = "info-shelf";
    shelf.className = "shelf hidden";
    shelf.innerHTML = `
    <button class="close-btn" aria-label="Close information panel">x</button>
    <div class="shelf-content"></div>
  `;
    document.body.appendChild(shelf);

    // Add close handler
    shelf.querySelector(".close-btn")?.addEventListener("click", () => {
      shelf.classList.remove("visible");
      shelf.classList.add("hidden");
    });
  }

  /* ==================================
    ToolTip
    ================================== */
  let tooltip = d3.select<HTMLDivElement, unknown>(".tool-tip");

  if (tooltip.empty()) {
    tooltip = d3.select("body").append("div").attr("class", "tool-tip");
  }

  /* ==================================
    Establishing the Domain(data) & Range(viz)
    ================================== */
  const xScale = d3
    .scaleLinear()
    // domain: the min and max value of domain(data)
    .domain([
      0,
      d3.max(data, (d) => (d[refuseType] / getPopulation(d)) * 2000)!,
    ])
    // range: the min and max value of range(the visualization)
    .range([0, innerWidth]);

  const yScale = d3
    .scaleBand()
    // Domain: the min and max value of domain(data)
    .domain(data.map((d) => d.boroughDistrict))
    // Range: the min and max value of range(the visualization)
    .range([0, innerHeight])
    .padding(0.1);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  /* ==================================
    Drawing the Axes (left, top, bottom)
    ================================== */
  let yAxisGroup = g.select<SVGGElement>(".y-axis");
  if (yAxisGroup.empty()) {
    yAxisGroup = g.append("g").attr("class", "y-axis");
  }

  let xAxisTopGroup = g.select<SVGGElement>(".x-axis-top");
  if (xAxisTopGroup.empty()) {
    xAxisTopGroup = g.append("g").attr("class", "x-axis-top");
  }

  let xAxisBottomGroup = g.select<SVGGElement>(".x-axis-bottom");
  if (xAxisBottomGroup.empty()) {
    xAxisBottomGroup = g
      .append("g")
      .attr("class", "x-axis-bottom")
      .attr("transform", `translate(0, ${innerHeight})`);
  }

  // Call axis generators on the selected groups
  yAxisGroup.call(d3.axisLeft(yScale));
  xAxisTopGroup.call(d3.axisTop(xScale));
  xAxisBottomGroup.call(d3.axisBottom(xScale));

  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************

  // Determine if the device is mobile.
  // desktop tooltip
  // mobile tooltip is drawer
  const isMobile = window.innerWidth <= 768;

  /* ==================================
  Drawing the Bars
  ================================== */
  const bars = g.selectAll<SVGRectElement, DataItemType>("rect").data(data);

  // Remove excess bars
  bars.exit().remove();

  const barsEnter = bars
    .enter()
    .append("rect")
    .attr("tabindex", "0") // makes bars focusable
    .attr("role", "img") // announces it's a graphic
    .attr("aria-roledescription", "bar in bar chart")
    .attr("aria-label", (d: DataItemType) => {
      const perPerson = Math.round((d[refuseType] / getPopulation(d)) * 2000);
      return `${d.communityDistrictName}, ${perPerson} pounds of ${refuseType} per person per year`;
    });

  barsEnter
    .merge(bars)
    .style("fill", (d: DataItemType): string => colorBars(d.borough))
    .attr("y", (d: DataItemType) => yScale(d.boroughDistrict) as number)
    .attr("width", (d: DataItemType) =>
      xScale((d[refuseType] / getPopulation(d)) * 2000)
    )
    .attr("height", yScale.bandwidth());

  // Attach additional event handlers conditionally
  if (!isMobile) {
    // Only attach mouse events for desktop
    barsEnter
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut)
      .on("keydown", function (event, d) {
        if (event.key === "Enter" || event.key === " ") {
          // mimic mouseover behavior
          handleMouseOver.call(this, event, d);
          event.preventDefault();
        }
        // mimic mouseout behavior
        if (event.key === "Escape") {
          handleMouseOut.call(this, event, d);
        }
      })
      .on("blur", function (event, d) {
        handleMouseOut.call(this, event, d);
      });
  }

  // Attach the click event for both desktop and mobile.
  barsEnter.on("click", function (event, d) {
    // Reset all bars' fill colors
    g.selectAll<SVGRectElement, DataItemType>("rect").style(
      "fill",
      (d): string => colorBars(d.borough)
    );
    // Highlight the clicked bar
    d3.select(this).style("fill", "#ffcd44");

    if (isMobile) {
      console.log("isMobile");
      // Use the bottom shelf on mobile
      const shelf = document.getElementById("info-shelf");
      const content = shelf?.querySelector(".shelf-content");

      if (shelf && content) {
        console.log("isMobile content", content);
        console.log("isMobile shelf", shelf);
        content.innerHTML = generateTooltipHTML(d, year);
        shelf.classList.add("visible");
        shelf.classList.remove("hidden");
      }
    } else {
      console.log("is desktop");
      // Use the floating tooltip on desktop
      tooltip.classed("hidden", false).html(generateTooltipHTML(d, year));
      const tooltipNode = tooltip.node();
      if (tooltipNode) {
        const { width, height } = tooltipNode.getBoundingClientRect();
        const { x, y } = clampPosition(event.pageX, event.pageY, width, height);
        tooltip.style("left", `${x}px`).style("top", `${y}px`);
      }
    }

    event.stopPropagation();
  });

  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************
  // ********************************

  /* ==================================
      MouseOver: bars turn yellow
      MouseOut: bars return to normal color
      ================================== */

  // Ensures tooltip stays within the viewport
  function clampPosition(x: number, y: number, width: number, height: number) {
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    return {
      x: Math.min(Math.max(x, 15), maxX), // Ensure x is within the screen bounds
      y: Math.min(Math.max(y, 15), maxY), // Ensure y is within the screen bounds
    };
  }

  function handleMouseOver(
    this: SVGRectElement,
    event: MouseEvent | KeyboardEvent,
    d: DataItemType
  ) {
    d3.select(this).transition().duration(200).style("fill", "#ffcd44");

    tooltip.classed("hidden", false).html(generateTooltipHTML(d, year));

    const tooltipNode = tooltip.node();
    if (!tooltipNode) return;

    const { width, height } = tooltipNode.getBoundingClientRect();

    if (event instanceof MouseEvent) {
      const { x, y } = clampPosition(event.pageX, event.pageY, width, height);
      tooltip.style("left", `${x}px`).style("top", `${y}px`);
    } else {
      const boundingBox = this.getBoundingClientRect();
      const left = boundingBox.left + window.scrollX + 15;
      const top = boundingBox.top + window.scrollY - 40;

      const { x, y } = clampPosition(left, top, width, height);
      tooltip.style("left", `${x}px`).style("top", `${y}px`);
    }
  }

  function handleMouseOut(
    this: SVGRectElement,
    event: MouseEvent,
    d: DataItemType
  ) {
    d3.select(this)
      .transition()
      .duration(200)
      .style("fill", colorBars(d.borough) as string);

    tooltip.classed("hidden", true);
  }

  function handleMouseMove(event: MouseEvent) {
    // const offsetY = event.pageY < 200 ? -40 : -120;
    const offsetY = event.pageY < 200 ? -500 : -20;

    tooltip
      .style("left", `${event.pageX + 15}px`)
      .style("top", `${event.pageY - offsetY}px`);
  }

  function generateTooltipHTML(d: DataItemType, year: number): string {
    const totalRefuse =
      d.mgptonscollected +
      d.resorganicstons +
      d.papertonscollected +
      d.refusetonscollected +
      d.xmastreetons +
      d.leavesorganictons;

    const refuseCategories: { key: keyof DataItemType; name: string }[] = [
      { key: "refusetonscollected", name: "trash" },
      { key: "papertonscollected", name: "paper & cardboard" },
      { key: "mgptonscollected", name: "metal/glass/plastic" },
      { key: "resorganicstons", name: "brown bin organics" },
      { key: "leavesorganictons", name: "leaves" },
      { key: "xmastreetons", name: "christmas trees" },
    ];

    const listItems = refuseCategories
      .map((category) => {
        const percent = totalRefuse
          ? ((d[category.key] as number) * 100) / totalRefuse
          : 0;
        return `<li>${category.name}: ${percent.toFixed(1)}%</li>`;
      })
      .join("<br/>");

    const tooltipYear: string = year >= 2020 ? "2020" : "2010";

    return `
          <h4>${d.communityDistrictName}</h4>
          ${tooltipYear} population: ${new Intl.NumberFormat().format(
      getPopulation(d)
    )} <br/>
          neighborhood total: ${new Intl.NumberFormat().format(
            d[refuseType]
          )} tons/year<br/>
          per person: ${Math.round(
            (d[refuseType] / getPopulation(d)) * 2000
          )} pounds/year<br/><br/>
          <p>Breakdown of refuse by percent:</p>
          <ul>${listItems}</ul>
        `;
  }

  /* ==================================
  Tool Tip - off
  ================================== */
  g.on("mouseout", () => {
    tooltip.classed("hidden", true); // hide
  });

  /* ==================================
  Bar Labels
  ================================== */
  g.selectAll(".text")
    .data(data)
    .enter()
    .append("text")
    // starting with 0 opacity, ending at 1 to help with jarring effect
    .style("opacity", 0)
    .attr("class", "label")
    .text((d: DataItemType) => {
      return (
        new Intl.NumberFormat().format(
          (d[refuseType] / getPopulation(d)) * 2000
        ) + " lbs/person"
      );
    })
    // ! asserts that the expression is not undefined
    .attr("y", (d) => yScale(d.boroughDistrict)! + 20)
    .attr("x", (d) => xScale((d[refuseType] / getPopulation(d)) * 2000) + 5)
    .style("opacity", 1);

  /* ==================================
  Bar Exits
   ================================== */
  g.selectAll("rect").data(data).exit().transition().duration(500).remove();
}
