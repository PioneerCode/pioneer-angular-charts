import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PcService } from '../../services/pc.service';

@Component({
  selector: 'pc-base-config',
  templateUrl: './base-config.component.html',
  styleUrls: ['./base-config.component.scss']
})
export class BaseConfigComponent  {
  @Input() includeTickFormat = false;
}
