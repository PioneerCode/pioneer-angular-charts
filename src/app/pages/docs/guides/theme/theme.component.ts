import { Component } from '@angular/core';
import { IJumpNav, JumpNavLevel } from '../../../../components/jump-nav/jump-nav.component';

@Component({
  selector: 'pc-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {
  jumpNav = [
    {
      key: 'Theme',
      value: 'theme',
      level: JumpNavLevel.h1
    },
    {
      key: 'Default Theme',
      value: 'default-theme',
      level: JumpNavLevel.h2
    },
    {
      key: 'Sass',
      value: 'sass',
      level: JumpNavLevel.h2
    },
    {
      key: 'Customize',
      value: 'customize',
      level: JumpNavLevel.h2
    },
    {
      key: 'Styles',
      value: 'styles',
      level: JumpNavLevel.h3
    },
    {
      key: 'Color Service',
      value: 'color-service',
      level: JumpNavLevel.h3
    }
  ] as IJumpNav[];
  importStylesCode = `@import "node_modules/@pioneer-code/pioneer-charts/scss/pcac";`;
  importStylesCodeOverride = `// Your variable overrides
$theme-colors: ( "primary": #24282e, "primary-light": #a3a1fb, "success": #5ee2a0, "danger": #ff6565, "warning": #fec163);

// Pioneer Charts and its default variables
@import "node_modules/@pioneer-code/pioneer-charts/scss/pcac";`;
  colorServiceExample = `...
this.colors = this.colorService.getColorScale(config.data.length);
...

...
.style('fill', (d: IPcacData, i: number) => {
  return this.colors[i];
})
...`;
  importColorService = `import { Component, OnInit } from '@angular/core';
import { PcacColorService } from '@pioneer-code/pioneer-charts';;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public colorService: PcacColorService) { }
  this.colorService.setScale([...]);
}`;
}
