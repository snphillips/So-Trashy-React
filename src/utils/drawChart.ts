import * as d3 from 'd3';
import { DataItemType, RefuseTypes } from '../types';

  export function drawChart(data: DataItemType[], refuseType: RefuseTypes) {
    // clear existing chart before we create new one
    d3.selectAll('svg > *').remove();
    const svg = d3.select('svg');

    const margin = { top: 60, right: 140, bottom: 190, left: 150 };
    const width = Number(svg.attr('width'));
    const height = Number(svg.attr('height'));

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /* ==================================
    Colors
    ================================== */
    const colorBars = d3
      .scaleOrdinal()
      .domain(['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'])
      .range(['#21E0D6', '#EF767A', '#820933', '#6457A6', '#2C579E']);

    /* ==================================
    ToolTip
    ================================== */
    let tooltip = d3.select<HTMLDivElement, unknown>('.tool-tip');
    
    if (tooltip.empty()) {
      tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tool-tip');
    }
    
    /* ==================================
    Establishing the Domain(data) & Range(viz)
    ================================== */
    const xScale = d3
      .scaleLinear()
      // domain: the min and max value of domain(data)
      .domain([0, d3.max(data, (d) => (d[refuseType] / d._2010_population) * 2000)!])
      // range: the min and max value of range(the visualization)
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      // Domain: the min and max value of domain(data)
      .domain(data.map((d) => d.boroughDistrict))
      // Range: the min and max value of range(the visualization)
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    /* ==================================
    Drawing the Axes (left, top, bottom)
    ================================== */
    let yAxisGroup = g.select<SVGGElement>('.y-axis');
    if (yAxisGroup.empty()) {
      yAxisGroup = g.append('g').attr('class', 'y-axis');
    }

    let xAxisTopGroup = g.select<SVGGElement>('.x-axis-top');
    if (xAxisTopGroup.empty()) {
      xAxisTopGroup = g.append('g').attr('class', 'x-axis-top');
    }

    let xAxisBottomGroup = g.select<SVGGElement>('.x-axis-bottom');
    if (xAxisBottomGroup.empty()) {
      xAxisBottomGroup = g.append('g')
        .attr('class', 'x-axis-bottom')
        .attr('transform', `translate(0, ${innerHeight})`);
    }

    // Call axis generators on the selected groups
    yAxisGroup.call(d3.axisLeft(yScale));
    xAxisTopGroup.call(d3.axisTop(xScale));
    xAxisBottomGroup.call(d3.axisBottom(xScale));

    /* ==================================
    Drawing the Bars
    ================================== */
    const bars = g.selectAll<SVGRectElement, DataItemType>('rect').data(data);
      
    // Remove excess bars
    bars.exit().remove();

    bars
      .enter()
      .append('rect')
      .merge(bars)
      .style('fill', (d: DataItemType): string => {
        return colorBars(d['borough']) as string;
      })
      .attr('y', (d: DataItemType) => yScale(d.boroughDistrict) as number)
      .attr('width', (d: DataItemType) => xScale((d[refuseType] / d._2010_population) * 2000))
      // bandwidth is computed width
      .attr('height', yScale.bandwidth())
      .on('mouseover', handleMouseOver)
      .on('mousemove', handleMouseMove)
      .on('mouseout', handleMouseOut);

      
      /* ==================================
      MouseOver: bars turn yellow
      MouseOut: bars return to normal color
      ================================== */
      function handleMouseOver(this: SVGRectElement, event: MouseEvent, d: DataItemType) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill', '#ffcd44');
      
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 120}px`)
          .style('display', 'inline-block')
          .html(generateTooltipHTML(d));
      }
      
      function handleMouseOut(this: SVGRectElement, event: MouseEvent, d: DataItemType) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill', colorBars(d.borough) as string);
      
        tooltip.style('display', 'none');
      }
      
      function handleMouseMove(event: MouseEvent) {
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 120}px`);
      }
      
      function generateTooltipHTML(d: DataItemType): string {
        const totalRefuse =
          d.mgptonscollected +
          d.resorganicstons +
          d.papertonscollected +
          d.refusetonscollected +
          d.xmastreetons +
          d.leavesorganictons;
      
        const refuseCategories: { key: keyof DataItemType; name: string }[] = [
          { key: 'refusetonscollected', name: 'trash' },
          { key: 'papertonscollected', name: 'paper & cardboard' },
          { key: 'mgptonscollected', name: 'metal/glass/plastic' },
          { key: 'resorganicstons', name: 'brown bin organics' },
          { key: 'leavesorganictons', name: 'leaves' },
          { key: 'xmastreetons', name: 'christmas trees' },
        ];
      
        const listItems = refuseCategories
          .map((category) => {
            const percent = totalRefuse
              ? ((d[category.key] as number) * 100) / totalRefuse
              : 0;
            return `<li>${category.name}: ${percent.toFixed(1)}%</li>`;
          })
          .join('<br/>');
      
        return `
          <h4>${d.communityDistrictName}</h4>
          2010 population: ${new Intl.NumberFormat().format(d._2010_population)} <br/>
          neighborhood total: ${new Intl.NumberFormat().format(d[refuseType])} tons/year<br/>
          per person: ${Math.round((d[refuseType] / d._2010_population) * 2000)} pounds/year<br/><br/>
          <p>Breakdown of refuse by percent:</p>
          <ul>${listItems}</ul>
        `;
      }

          /* ==================================
          Tool Tip - off
          ================================== */
          g.on('mouseout', () => {
            tooltip.style('display', 'none');
          });
      
          /* ==================================
          Bar Labels
          ================================== */
          g.selectAll('.text')
            .data(data)
            .enter()
            .append('text')
            // starting with 0 opacity, ending at 1 to help with jarring effect
            .style('opacity', 0)
            .attr('class', 'label')
            .text((d: DataItemType) => {
              return new Intl.NumberFormat().format((d[refuseType] / d._2010_population) * 2000) + ' lbs/person';
            })
            // ! asserts that the expression is not undefined
            .attr('y', (d) => yScale(d.boroughDistrict)! + 20)
            .attr('x', (d) => xScale((d[refuseType] / d._2010_population) * 2000) + 5)
            .style('opacity', 1);
      
          /* ==================================
          Bar Exits
          ================================== */
          g.selectAll('rect').data(data).exit().transition().duration(500).remove();
        }