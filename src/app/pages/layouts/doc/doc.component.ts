import { Component, Input } from '@angular/core';
import { PcService } from '../../../services/pc.service';
import { IJumpNav } from '../../../components/jump-nav/jump-nav.component';

@Component({
  selector: 'pc-doc-layout',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocLayoutComponent {
  @Input() jumpNav: IJumpNav[];
  constructor(
    public pcService: PcService
  ) {
  }
}
