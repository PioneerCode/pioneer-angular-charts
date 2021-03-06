import { Injectable, ElementRef } from '@angular/core';

import { select, Selection, EnterElement, BaseType } from 'd3-selection';
import { scaleBand, ScaleBand, scaleLinear, ScaleLinear } from 'd3-scale';
import { color } from 'd3-color';
import { transition } from 'd3-transition';

/**
 * Lib
 */
import { IPcacBarVerticalChartConfig } from './bar-vertical-chart.model';
import { PcacAxisBuilder } from '../../core/axis.builder';
import { PcacGridBuilder } from '../../core/grid.builder';
import { PcacTransitionService } from '../../core/transition.service';
import { PcacTooltipBuilder } from '../../core/tooltip.builder';
import { PcacColorService } from '../../core/color.service';
import { PcacChart } from '../../core/chart';
import { IPcacData, PcacTickFormatEnum } from '../../core/chart.model';

import { Subject, Observable } from 'rxjs';

type GroupType = Selection<Element |
  EnterElement |
  Document |
  Window,
  IPcacData,
  Element |
  EnterElement |
  Document |
  Window,
  IPcacData>;

export interface IBarVerticalChartBuilder {
  buildChart(chartElm: ElementRef, config: IPcacBarVerticalChartConfig): void;
}

@Injectable()
export class BarVerticalChartBuilder extends PcacChart {
  private xScaleStacked: ScaleBand<string>;
  private xScaleGrouped: ScaleBand<string>;
  private yScale: ScaleLinear<number, number>;
  private barClickedSource = new Subject<IPcacData>();
  barClicked$ = this.barClickedSource.asObservable();

  constructor(
    public axisBuilder: PcacAxisBuilder,
    public gridBuilder: PcacGridBuilder,
    public transitionService: PcacTransitionService,
    public tooltipBuilder: PcacTooltipBuilder,
    public colorService: PcacColorService
  ) {
    super(
      axisBuilder,
      gridBuilder,
      transitionService,
      tooltipBuilder,
      colorService
    );
  }

  buildChart(chartElm: ElementRef, config: IPcacBarVerticalChartConfig): void {
    if (config.colorOverride && config.colorOverride.colors) {
      this.colors = config.colorOverride.colors;
    }
    if (config.hideAxis) {
      this.adjustForHiddenAxis(config);
    }
    this.initializeChartState(chartElm, config);
    if (config.colorOverride && config.colorOverride.colors) {
      this.colors = config.colorOverride.colors.reverse();
    }
    this.buildScales(config);
    this.drawChart(chartElm, config);
  }

  private adjustForHiddenAxis(config: IPcacBarVerticalChartConfig) {
    const hasGroupLabel = this.hasGroupLabel(config);

    config.height = config.height + this.margin.top;
    if (!hasGroupLabel) {
      config.height = config.height + this.margin.bottom;
    }
    this.margin.top = 0;
    this.margin.bottom = hasGroupLabel ? this.margin.bottom : 0;
    this.margin.left = 0;
    this.margin.right = 0;
  }

  private hasGroupLabel(config: IPcacBarVerticalChartConfig) {
    let hasGroupLabel = false;
    config.data.forEach(node => {
      if (node.key) {
        hasGroupLabel = true;
      }
    });
    return hasGroupLabel;
  }

  private buildScales(config: IPcacBarVerticalChartConfig) {
    this.yScale = scaleLinear()
      .rangeRound([0, config.height])
      .domain([config.domainMax, 0]);

    this.xScaleStacked = scaleBand()
      .domain(config.data.map((d) => d.key as string))
      .rangeRound([0, this.width])
      .padding(0.1);

    this.xScaleGrouped = scaleBand()
      .padding(0.2)
      .rangeRound([0, this.xScaleStacked.bandwidth()])
      .domain(config.data[0].data.map((d) => d.key as string));
  }

  private drawChart(chartElm: ElementRef, config: IPcacBarVerticalChartConfig): void {
    this.buildContainer(chartElm);
    this.axisBuilder.drawAxis({
      svg: this.svg,
      numberOfTicks: config.numberOfTicks || 5,
      height: this.height,
      xScale: this.xScaleStacked,
      yScale: this.yScale,
      xFormat: PcacTickFormatEnum.None,
      yFormat: config.tickFormat || PcacTickFormatEnum.None,
      hideYAxis: config.hideAxis
    });
    if (!config.hideGrid) {
      this.gridBuilder.drawHorizontalGrid({
        svg: this.svg,
        numberOfTicks: config.numberOfTicks || 5,
        width: this.width,
        xScale: this.xScaleStacked,
        yScale: this.yScale
      });
    }
    this.addGroups(config);
  }

  private addGroups(config: IPcacBarVerticalChartConfig) {
    const groupsContainer = this.svg.append('g')
      .attr('class', 'pcac-bars')
      .selectAll('g')
      .data(config.data)
      .enter().append('g')
      .attr('class', 'pcac-bar-group')
      .attr('data-group-id', (d: IPcacData, i: number) => {
        return i;
      })
      .attr('transform', (d: IPcacData, i: number) => {
        return 'translate(' + this.xScaleStacked(d.key as string) + ',0)';
      });

    const group = groupsContainer.selectAll('rect')
      .data((d: IPcacData, i: number) => {
        return d.data;
      });

    this.drawBarsPerGroup(group, config);

    // We have no thresholds to draw
    if (!config.thresholds) {
      return;
    }

    // Draw threshold across entire chart
    if (config.thresholds.length === 1 && !config.thresholds[0].data) {
      this.drawThresholdAcrossChart(config);
    }

    // Draw threshold across each group
    if (config.thresholds.length > 1 && (!config.thresholds[0].data || config.isStacked)) {
      this.drawThresholdsPerGroup(group, config);
    }

    // Draw threshold across each bar in group
    if (config.thresholds.length > 1 && config.thresholds[0].data && !config.isStacked) {
      this.drawThresholdsPerBarInGroup(group, config);
    }
  }

  private drawBarsPerGroup(group: GroupType, config: IPcacBarVerticalChartConfig) {
    const self = this;
    group.enter().append('rect')
      .attr('class', 'pcac-bar')
      .attr('x', (d: IPcacData, i: number) => {

        return !config.isStacked ? this.xScaleGrouped(d.key as string) : this.xScaleStacked(d.key as string);
      })
      .style('fill', (d: IPcacData, i: number, n: any) => {
        if (config.spreadColorsPerGroup) {
          const groupIndex = parseInt(n[0].parentNode.getAttribute('data-group-id'), 10);
          return this.colors[groupIndex];
        }
        return this.colors[i];
      })
      .attr('y', () => {
        return this.height;
      })
      .attr('height', 0)
      .on('mouseover', function (d: IPcacData, i: number, n: any) {
        select(this).transition(transition()
          .duration(self.transitionService.getTransitionDuration() / 5))
          .style('fill', () => {
            if (config.spreadColorsPerGroup) {
              const groupIndex = parseInt(n[0].parentNode.getAttribute('data-group-id'), 10);
              return color(self.colors[groupIndex]).darker(1).toString();
            }
            return color(self.colors[i]).darker(1).toString();
          });
      })
      .on('mousemove', function (d: IPcacData, i: number) {
        self.tooltipBuilder.showBarTooltip(d, config.tickFormat || PcacTickFormatEnum.None);
      })
      .on('mouseout', function (d: IPcacData, i: number, n: any) {
        self.tooltipBuilder.hideTooltip();
        select(this).transition(transition()
          .duration(self.transitionService.getTransitionDuration() / 5))
          .style('fill', () => {
            if (config.spreadColorsPerGroup) {
              const groupIndex = parseInt(n[0].parentNode.getAttribute('data-group-id'), 10);
              return self.colors[groupIndex];
            }
            return self.colors[i];
          });
      })
      .on('click', (d: IPcacData, i: number) => {
        this.barClickedSource.next(d);
      })
      .transition(transition()
        .duration(this.transitionService.getTransitionDuration()))
      .attr('width', !config.isStacked ? this.xScaleGrouped.bandwidth() : this.xScaleStacked.bandwidth())
      .attr('y', (d: IPcacData) => {
        return this.yScale(d.value as number);
      })
      .attr('height', (d: IPcacData) => {
        return this.height - this.yScale(d.value as number);
      });
  }

  private drawThresholdAcrossChart(config: IPcacBarVerticalChartConfig) {
    this.applyPreTransitionThresholdStyles(this.svg.select('.pcac-bars').append('rect'), config)
      .attr('width', this.width)
      .on('mousemove', (d: IPcacData, i: number) => {
        this.tooltipBuilder.showBarTooltip(config.thresholds[i], config.tickFormat || PcacTickFormatEnum.None);
      })
      .transition(transition()
        .duration(this.transitionService.getTransitionDuration()))
      .attr('y', (d: IPcacData, i: number) => {
        return this.yScale(config.thresholds[i].value as number);
      });
  }

  private drawThresholdsPerGroup(group: GroupType, config: IPcacBarVerticalChartConfig) {
    this.applyPreTransitionThresholdStyles(this.svg.selectAll('.pcac-bar-group').append('rect'), config)
      .attr('width', this.xScaleStacked.bandwidth())
      .on('mousemove', (d: IPcacData, i: number) => {
        this.tooltipBuilder.showBarTooltip(config.isStacked ?
          config.thresholds[i].data[0] :
          config.thresholds[i],
          config.tickFormat || PcacTickFormatEnum.None
        );
      })
      .transition(transition()
        .duration(this.transitionService.getTransitionDuration()))
      .attr('y', (d: IPcacData, i: number) => {
        return this.yScale(config.isStacked ? config.thresholds[i].data[0].value as number : config.thresholds[i].value as number);
      });
  }

  private drawThresholdsPerBarInGroup(group: GroupType, config: IPcacBarVerticalChartConfig) {
    this.applyPreTransitionThresholdStyles(group.enter().append('rect'), config)
      .on('mousemove', (d: IPcacData, i: number, n: any) => {
        this.tooltipBuilder.showBarTooltip(
          config.thresholds[n[0].parentElement.dataset['groupId']].data[i],
          config.tickFormat || PcacTickFormatEnum.None
        );
      })
      .attr('width', this.xScaleGrouped.bandwidth())
      .transition(transition()
        .duration(this.transitionService.getTransitionDuration()))
      .attr('y', (d: IPcacData, i: number, n: any) => {
        return this.yScale(config.thresholds[n[0].parentElement.dataset['groupId']].data[i].value as number);
      });
  }

  private applyPreTransitionThresholdStyles(elm: Selection<BaseType, {}, HTMLElement, any> | any, config: IPcacBarVerticalChartConfig) {
    return elm.attr('class', 'pcac-threshold')
      .attr('x', (d: IPcacData) => {
        return this.xScaleGrouped(d ? d.key as string : '');
      })
      .attr('y', () => {
        return this.height;
      })
      .attr('height', 0)
      .style('fill', () => {
        return this.colorService.getAlert();
      })
      .style('stroke', () => {
        return this.colorService.getAlert();
      })
      .style('stroke-width', () => {
        return 2;
      })
      .on('mouseout', () => {
        this.tooltipBuilder.hideTooltip();
      })
      .attr('height', () => {
        return '3px';
      });
  }
}
