import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export enum JumpNavLevel {
  h1,
  h2,
  h3
}

export interface IJumpNav {
  key: string;
  value: string;
  level: JumpNavLevel;
}

@Component({
  selector: 'pc-jump-nav',
  templateUrl: './jump-nav.component.html',
  styleUrls: ['./jump-nav.component.scss']
})
export class JumpNavComponent implements OnInit, AfterViewChecked {
  @Input() jumpNav: IJumpNav[];
  currentRoute: string[];
  fragment: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {
    this.route.events.subscribe((res) => {
      this.currentRoute = [this.route.url];
      if (this.currentRoute[0].includes('#')) {
        this.currentRoute[0] = this.currentRoute[0].substring(0, this.currentRoute[0].indexOf('#'));
      }
    });
  }

  ngOnInit() {
    this.activeRoute.fragment.subscribe(fragment => { this.fragment = fragment === null || fragment === '' ? undefined : fragment; });
  }

  ngAfterViewChecked(): void {
    const elm = document.querySelector('#' + this.fragment);
    if (this.fragment && elm) {
      elm.scrollIntoView();
      window.scrollBy(0, -54);
    }
  }

  getLevelClass(jump: IJumpNav) {
    const styles = [] as string[];
    switch (jump.level) {
      case JumpNavLevel.h1:
        styles.push('level-1');
        break;
      case JumpNavLevel.h2:
        styles.push('level-2');
        break;
      case JumpNavLevel.h3:
        styles.push('level-3');
        break;
    }

    if (jump.level === JumpNavLevel.h1 && !this.fragment || jump.value === this.fragment) {
      styles.push('active');
    }
    return styles;
  }
}
