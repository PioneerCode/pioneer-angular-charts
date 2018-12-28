import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IPcacPaginationConfig } from './pagination.model';

@Component({
  selector: 'pcac-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() config = {
    currentPageIndex: 1,
    countPerPage: 10,
    totalItemsInCollection: 10,
    show: false,
  } as IPcacPaginationConfig;

  @Output() startClicked = new EventEmitter<void>();
  @Output() leftClicked = new EventEmitter<number>();
  @Output() rightClicked = new EventEmitter<number>();
  @Output() endClicked = new EventEmitter<void>();

  get leftIsActive(): boolean {
    return this.config.currentPageIndex !== 1;
  }

  get rightIsActive(): boolean {
    return this.config.currentPageIndex !== Math.ceil(this.config.totalItemsInCollection / this.config.countPerPage);
  }

  get currentRangeText(): string {
    return `${this.getStartingRangeText()}-${this.getEndingRangeText()} of ${this.config.totalItemsInCollection}`;
  }

  private getStartingRangeText(): number {
    return this.config.countPerPage * (this.config.currentPageIndex - 1) + 1;
  }

  private getEndingRangeText(): number {
    const totalPossiblePage = Math.ceil(this.config.totalItemsInCollection / this.config.countPerPage);

    if (totalPossiblePage === 1) {
      return this.config.totalItemsInCollection;
    }

    if (totalPossiblePage === this.config.currentPageIndex) {
      const total = this.config.countPerPage * (this.config.currentPageIndex - 1);
      const modulus = this.config.totalItemsInCollection % total;
      return total + modulus;
    }

    return this.config.countPerPage * this.config.currentPageIndex;
  }

  onStartClicked(): void {
    if (this.leftIsActive) {
      this.startClicked.emit();
    }
  }

  onLeftClicked(): void {
    if (this.leftIsActive) {
      this.leftClicked.emit(this.config.currentPageIndex - 1);
    }
  }

  onRightClicked(): void {
    if (this.rightIsActive) {
      this.rightClicked.emit(this.config.currentPageIndex + 1);
    }
  }

  onEndClicked(): void {
    if (this.rightIsActive) {
      this.endClicked.emit();
    }
  }
}
