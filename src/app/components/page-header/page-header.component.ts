import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pc-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() title: string;
  @Input() anchor = '';
}
