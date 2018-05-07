import { Component, OnInit } from '@angular/core';
import { IJumpNav, JumpNavLevel } from '../../../../../components/jump-nav/jump-nav.component';
import { PcService } from '../../../../../services/pc.service';

@Component({
  selector: 'pc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  {
  jumpNav = [
    {
      key: 'Table',
      value: 'table',
      level: JumpNavLevel.h1
    },
    {
      key: 'Markup',
      value: 'markup',
      level: JumpNavLevel.h2
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
  markupCode = `<pcac-table [config]="config"></pcac-table>`;
  importCode = `import { PcacTableModule } from '@pioneer-code/pioneer-charts';`;

  constructor(public pcService: PcService) { }
}
