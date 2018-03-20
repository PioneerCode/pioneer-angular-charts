import { Injectable, ElementRef } from '@angular/core';
import { IPcacBarHorizontalChartConfig } from './bar-horizontal-chart.model';
import { select, selection, baseType } from 'd3-selection';
import { PcacColorService, IPcacData } from '../core';
import { PcacChart } from '../core/chart';
import { scaleBand, scaleLinear } from 'd3-scale';

@Injectable()
export class BarHorizontalChartBuilder extends PcacChart {
  private numberOfTicks = 5;
  private xScale: scaleBand<string>;
  private yScale: scaleLinear<number, number>;

  buildChart(chartElm: ElementRef, config: IPcacBarHorizontalChartConfig): void {
    this.setup(chartElm, config);
    this.buildScales(config);
    this.drawChart(chartElm, config);
  }

  private buildScales(config: IPcacBarHorizontalChartConfig) {
    const barMap = config.data[0].data.map((d) => {
      return d.value;
    });

    this.xScale = scaleLinear()
    .domain([0, config.domainMax])
    .range([0, this.width]);

    this.yScale = scaleBand()
      .domain(config.data.map((d) => d.key))
      .range([this.height, 0])
      .padding(0.1);
  }

  private drawChart(chartElm: ElementRef, config: IPcacBarHorizontalChartConfig): void {
    this.prepSvg(chartElm);
    this.axisBuilder.drawAxis({
      svg: this.svg,
      numberOfTicks: this.numberOfTicks,
      height: this.height,
      xScale: this.xScale,
      yScale: this.yScale
    });
    this.gridBuilder.drawVerticalGrid({
      svg: this.svg,
      numberOfTicks: this.numberOfTicks,
      height: this.height,
      xScale: this.xScale,
      yScale: this.yScale
    });
    this.addBars(config);
  }

  private addBars(config: IPcacBarHorizontalChartConfig) {
    this.svg.append('g')
      .attr('class', 'pc-bars')
      .selectAll('g')
      .data(config.data)
      .enter().append('g')
      .attr('class', 'pc-bar-group')
      .attr('transform', (d: IPcacData, i: number) => {
        return 'translate(' + this.xScale(d.key) + ',0)';
      })
      .selectAll('rect')
      .data((d: IPcacData) => {
        return d.data;
      })
      .enter().append('rect')
      .attr('class', 'pc-bar')
      .attr('x', (d: IPcacData) => {
        return this.xScale(d.key);
      })
      .style('fill', (d: IPcacData, i: number, n: any) => {
        return this.colors[i];
      })
      .attr('width', this.xScale.bandwidth())
      .attr('y', (d: IPcacData) => {
        return this.yScale(d.value);
      })
      .attr('height', (d: IPcacData, ) => {
        return this.height - this.yScale(d.value);
      });
  }
}
