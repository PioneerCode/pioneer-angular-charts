import { Component, OnInit } from '@angular/core';
import { PcService } from './services/pc.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'pc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public pcacService: PcService) { }

  ngOnInit() {
    this.pcacService.getData();
  }
}
