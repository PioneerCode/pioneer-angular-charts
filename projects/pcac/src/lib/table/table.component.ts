import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  QueryList,
  ViewChildren,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { IPcacTableConfig, IPcacTableHeader, PcacTableSortIconsEnum } from './table.model';
import { TableSortService } from './table-sort.service';
import { IPcacData } from '../core/chart.model';

@Component({
  selector: 'pcac-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    TableSortService
  ]
})
export class PcacTableComponent implements OnChanges, AfterViewInit {
  @Input() config = { height: 400 } as IPcacTableConfig;
  @Output() deleteClicked: EventEmitter<IPcacData> = new EventEmitter();
  @Output() editClicked: EventEmitter<IPcacData> = new EventEmitter();
  @Output() historyClicked: EventEmitter<IPcacData> = new EventEmitter();

  @ViewChild('tableBody', { static: true }) tableBody: ElementRef;
  @ViewChild('tableFooter', { static: true }) tableFooter: ElementRef;
  @ViewChildren('rows') rows: QueryList<any>;

  public columnWidths = [] as number[];
  public rowHeight: number;
  public footerHeight: number;
  public headers = [] as IPcacTableHeader[];
  public rowData = [] as IPcacData[];
  public adjustedHeight = 200;

  private resizeWindowTimeout: any;

  constructor(
    private sortService: TableSortService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.initTableUi();
    // @ngFor rows finished
    this.rows.changes.subscribe(() => {
      if (this.config.enableStickyHeader || this.config.enableStickyFooter) {
        this.calculateColumnWidths();
      }
    });
  }

  ngOnChanges() {
    this.initTableUi();
  }

  onEditClicked(row: IPcacData): void {
    this.editClicked.emit(row);
  }

  onDeleteClicked(row: IPcacData): void {
    this.deleteClicked.emit(row);
  }

  onHistoryClicked(row: IPcacData): void {
    this.historyClicked.emit(row);
  }

  private initTableUi() {
    if (this.config && this.config.data && this.config.data.length > 0) {
      this.adjustedHeight = this.config.height + 28;
      if (this.config.enableStickyHeader || this.config.enableStickyFooter) {
        this.calculateColumnWidths();
      }
      this.setHeaders();
      this.setRows();
    }
  }

  /**
   * When dealing with sticky header/footer, we need to calc widths of absolute positioned
   * table columns.
   */
  private calculateColumnWidths(): void {
    if (this.tableBody.nativeElement.rows[0]) {
      const cells = this.tableBody.nativeElement.rows[0].cells;
      this.columnWidths = [] as number[];
      for (let i = 0; i < cells.length; i++) {
        this.columnWidths.push(cells[i].clientWidth);
      }
      // https://stackoverflow.com/questions/44922384/angular4-change-detection-expressionchangedafterithasbeencheckederror
      this.changeDetector.detectChanges();
    }
  }

  /**
   * Set internal cache of headers to ease template manipulation and apply icon
   */
  private setHeaders(): void {
    this.headers = [] as IPcacTableHeader[];
    for (let i = 0; i < this.config.data[0].data.length; i++) {
      this.headers.push({
        key: this.config.data[0].data[i].key,
        value: this.config.data[0].data[i].value,
        icon: PcacTableSortIconsEnum.Sort
      } as IPcacTableHeader);
    }
  }

  /**
   * Deep copy of rows to ease template manipulation and sorting
   */
  private setRows(): void {
    this.rowData = JSON.parse(JSON.stringify(this.config.data)).slice(1);
  }

  /**
   * On header click, sort column.
   */
  sortTable(columnIndex: number) {
    const direction = this.headers[columnIndex].icon === PcacTableSortIconsEnum.SortAsc ?
      PcacTableSortIconsEnum.SortDesc :
      PcacTableSortIconsEnum.SortAsc;
    this.clearStateExceptCurrent(columnIndex);
    this.sortService.sort(this.rowData, columnIndex, direction);
    this.headers[columnIndex].icon = direction;
  }

  private clearStateExceptCurrent(columnIndex: number): void {
    for (let i = 0; i < this.headers.length; i++) {
      if (i !== columnIndex) {
        this.headers[i].icon = PcacTableSortIconsEnum.Sort;
      }
    }
  }

  /**
   * Opting against fromEvent due to incompatibility with rxjs 5 => 6
   */
  @HostListener('window:resize')
  onResize() {
    const self = this;
    clearTimeout(this.resizeWindowTimeout);
    this.resizeWindowTimeout = setTimeout(() => {
      self.initTableUi();
    }, 300);
  }
}
