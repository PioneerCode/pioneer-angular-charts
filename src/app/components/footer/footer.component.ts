import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PcService } from '../../services/pc.service';

@Component({
  selector: 'pc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {
  version = environment.version;
  constructor(public pcService: PcService) { }
}
