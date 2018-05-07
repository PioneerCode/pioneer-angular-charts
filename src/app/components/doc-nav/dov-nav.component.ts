import { Component, OnInit } from '@angular/core';
import { PcService } from '../../services/pc.service';

@Component({
  selector: 'pc-doc-nav',
  templateUrl: './doc-nav.component.html',
  styleUrls: ['./doc-nav.component.scss']
})
export class DocNavComponent {
  constructor(public pcService: PcService) { }
}
