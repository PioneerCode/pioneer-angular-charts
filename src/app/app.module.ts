/**
 * Angular
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

/**
 * Demo deps
 */
import { PcRepository } from './repository/pc.repository';
import { PcService } from './services/pc.service';

/**
 * Pages
 */
import { HomeComponent } from './pages/home/home.component';
import { ChartsComponent } from './pages/charts/charts.component';

/**
 * Layouts
 */
import { DocLayoutComponent } from './pages/layouts/doc/doc.component';
import { PublicComponent } from './pages/layouts/public/public.component';

/**
 * Guide Pages
 */
import { IntroductionComponent } from './pages/docs/guides/introduction/introduction.component';
import { ThemeComponent } from './pages/docs/guides/theme/theme.component';
import { DataContractComponent } from './pages/docs/guides/data-contract/data-contract.component';

/**
 * Component Pages
 */
import { LineAreaChartComponent } from './pages/docs/components/charts/line-area-chart/line-area-chart.component';
import { BarChartComponent } from './pages/docs/components/charts/bar-chart/bar-chart.component';
import { TableComponent } from './pages/docs/components/charts/table/table.component';
import { PieChartComponent } from './pages/docs/components/charts/pie-chart/pie-chart.component';
import { HeaderComponent } from './pages/docs/components/ui/header/header.component';
import { BaseConfigComponent } from './components/base-config/base-config.component';
import { JumpNavComponent } from './components/jump-nav/jump-nav.component';

/**
 * Demo Components
 */
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PrismComponent } from './components/prism/prism.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { DocNavComponent } from './components/doc-nav/dov-nav.component';

/**
 * Pipes
 */
import { StringifyPipe } from './pipes/stringify.pipe';

/**
 * Pioneer Charts
 */
import {
  PcacCoreModule,
  PcacHeaderModule,
  PcacBarVerticalChartModule,
  PcacPieChartModule,
  PcacTableModule,
  PcacBarHorizontalChartModule,
  PcacLineAreaChartModule
} from '@pioneer-code/pioneer-charts';

const appRoutes: Routes = [
  { path: 'docs/guides/introduction', component: IntroductionComponent },
  { path: 'docs/guides/data-contract', component: DataContractComponent },
  { path: 'docs/guides/theme', component: ThemeComponent },
  { path: 'docs/components/charts/bar-chart', component: BarChartComponent },
  { path: 'docs/components/charts/line-area-chart', component: LineAreaChartComponent },
  { path: 'docs/components/charts/table', component: TableComponent },
  { path: 'docs/components/charts/pie-chart', component: PieChartComponent},
  { path: 'docs/components/ui/header', component: HeaderComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LineAreaChartComponent,
    BarChartComponent,
    HeaderComponent,
    BaseConfigComponent,
    PieChartComponent,
    TableComponent,
    PageHeaderComponent,
    PrismComponent,
    DocLayoutComponent,
    DocNavComponent,
    NavComponent,
    FooterComponent,
    ChartsComponent,
    IntroductionComponent,
    ThemeComponent,
    DataContractComponent,
    PublicComponent,
    JumpNavComponent,
    StringifyPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    PcacCoreModule,
    PcacHeaderModule,
    PcacTableModule,
    PcacPieChartModule,
    PcacBarVerticalChartModule,
    PcacBarHorizontalChartModule,
    PcacLineAreaChartModule
  ],
  providers: [
    PcRepository,
    PcService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
