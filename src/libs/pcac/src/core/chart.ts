import { axisBottom, axisLeft } from 'd3-axis';
import { selection, baseType } from 'd3-selection';
import { PcacAxisBuilder } from './axis.builder';
import { IPcacChartConfig } from './chart.model';
import { PcacColorService } from './color.service';
import { select } from 'd3-selection';
import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class PcacChart extends PcacAxisBuilder {
  margin = { top: 16, right: 16, bottom: 20, left: 40 };
  svg: selection<baseType, {}, HTMLElement, any>;
  width = 400;
  height = 400;
  colors = [] as string[];

  constructor(private colorService: PcacColorService) {
    super();
  }

  setup(chartElm: ElementRef, config: IPcacChartConfig): void {
    select(chartElm.nativeElement).select('g').remove();
    this.width = chartElm.nativeElement.parentNode.clientWidth - this.margin.left - this.margin.right;
    this.height = config.height;
    this.colors = this.colorService.getColorScale(config.data.length);
  }

  prepSvg(chartElm: ElementRef): void {
    this.svg = select(chartElm.nativeElement)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
}