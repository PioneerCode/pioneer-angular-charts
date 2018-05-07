import { Component } from '@angular/core';
import { PcService } from '../../services/pc.service';

@Component({
  selector: 'pc-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  constructor(public pcService: PcService) { }
}
