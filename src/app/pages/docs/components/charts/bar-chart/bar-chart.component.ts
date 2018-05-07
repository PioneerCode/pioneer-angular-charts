import { Component } from '@angular/core';
import { PcService } from '../../../../../services/pc.service';
import { IJumpNav, JumpNavLevel } from '../../../../../components/jump-nav/jump-nav.component';

@Component({
  selector: 'pc-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  verticalCode = `<pcac-bar-vertical-chart [config]="barVerticalChartConfig"></pcac-bar-vertical-chart>`;
  horizontalCode = `<pcac-bar-horizontal-chart [config]="barHorizontalChartConfig"></pcac-bar-horizontal-chart>`;
  importCode = `import { PcacBarVerticalChartModule, PcacBarHorizontalChartModule } from '@pioneer-code/pioneer-charts';`;
  jumpNav = [
    {
      key: 'Bar Chart',
      value: 'bar-chart',
      level: JumpNavLevel.h1
    },
    {
      key: 'Markup',
      value: 'markup',
      level: JumpNavLevel.h2
    },
    {
      key: 'Horizontal',
      value: 'horizontal',
      level: JumpNavLevel.h3
    },
    {
      key: 'Vertical',
      value: 'vertical',
      level: JumpNavLevel.h3
    },
    {
      key: 'API',
      value: 'api',
      level: JumpNavLevel.h2

    },
    {
      key: 'Configuration',
      value: 'configuration',
      level: JumpNavLevel.h3
    },
    {
      key: 'Contract',
      value: 'contract',
      level: JumpNavLevel.h2
    }
  ] as IJumpNav[];

  constructor(public pcService: PcService) { }
}
