import { Component } from '@angular/core';
import { IJumpNav, JumpNavLevel } from '../../../../components/jump-nav/jump-nav.component';

@Component({
  selector: 'pc-data-contract',
  templateUrl: './data-contract.component.html',
  styleUrls: ['./data-contract.component.scss']
})
export class DataContractComponent {
  jumpNav = [
    {
      key: 'Data Contract',
      value: 'data-contract',
      level: JumpNavLevel.h1
    },
    {
      key: 'IPcacData',
      value: 'data',
      level: JumpNavLevel.h2
    },
    {
      key: 'IPcacChartConfig',
      value: 'chart-config',
      level: JumpNavLevel.h2
    },
    {
      key: 'New Chart Config',
      value: 'new-chart-config',
      level: JumpNavLevel.h2
    },
    {
      key: 'Binding Configuration',
      value: 'map',
      level: JumpNavLevel.h2
    }
  ] as IJumpNav[];

  data = `export interface IPcacData {
  key: string | number;
  value: string | number;
  data: IPcacData[];
}`;

  baseConfig = `export interface IPcacChartConfig {
  /**
   * Height in pixels
   */
  height: number;
  ...
  data: IPcacData[];
}`;

  barChartConfig = `import { IPcacChartConfig } from '../core/chart.model';

export interface IPcacBarVerticalChartConfig extends IPcacChartConfig {
  domainMax: number;
  numberOfTicks: number;
  ...
}`;

  bindConfig = `<pcac-bar-vertical-chart [config]="config"></pcac-bar-vertical-chart>`;

  typing = `const barVerticalChartConfig = { ... }  as IPcacBarVerticalChartConfig;`;
}
