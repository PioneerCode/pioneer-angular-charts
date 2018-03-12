import { Injectable, ElementRef } from '@angular/core';
import { ILineAreaChartConfig } from './line-area-chart.model';
import { select, selection, baseType } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { line, area } from 'd3-shape';

export interface ILineAreaChartBuilder {
  buildChart(chartElm: ElementRef, config: ILineAreaChartConfig): void;
}

@Injectable()
export class LineAreaChartBuilder implements ILineAreaChartBuilder {
  private width = 400;
  private height = 400;
  private margin = { top: 16, right: 16, bottom: 20, left: 40 };
  private svg: selection<baseType, {}, HTMLElement, any>;
  private line: line<[number, number]>;
  private area: area<[number, number]>;
  private xScale: scaleLinear<number, number>;
  private yScale: scaleLinear<number, number>;

  constructor() { }

  buildChart(chartElm: ElementRef, config: ILineAreaChartConfig): void {
    this.setup(chartElm);
    this.buildScales(config);
    this.drawChart(chartElm);
  }

  private setup(chartElm: ElementRef): void {
    select(chartElm.nativeElement).select('g').remove();
    this.width = chartElm.nativeElement.parentNode.clientWidth - this.margin.left - this.margin.right;
    this.height = chartElm.nativeElement.parentNode.clientHeight - this.margin.top - this.margin.bottom;
  }

  private buildScales(config: ILineAreaChartConfig): void {
    this.xScale = scaleLinear()
      .domain([0, config.data[0].data.length - 1])
      .range([0, this.width]);

    this.yScale = scaleLinear()
      .domain([0, config.domainMax])
      .range([this.height, 0]);

    this.line = line()
      .x((d, i) => {
        return this.xScale(i);
      })
      .y((d: any) => {
        return this.yScale(d.value);
      });

    this.area = area()
      .x((d, i) => {
        return this.xScale(i);
      })
      .y0(this.height)
      .y1((d: any) => {
        return this.yScale(d.value);
      });
  }

  private drawChart(chartElm: ElementRef): void {
    this.svg = select(chartElm.nativeElement)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
}