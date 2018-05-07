import {
  Component,
  AfterViewInit,
  Input,
  ElementRef,
  Renderer2,
  OnChanges
} from '@angular/core';

declare var Prism;

@Component({
  selector: 'pc-prism',
  template: ``
})
export class PrismComponent implements OnChanges {
  @Input() code: string;
  @Input() language: string;
  private preNode: Element;
  private codeNode: Element;
  private nativeElement: Element;

  constructor(private _renderer: Renderer2, private _el: ElementRef) {
    this.nativeElement = _el.nativeElement;
  }

  ngOnChanges() {
    if (this.code && this.language) {
      this.preNode = this._renderer.createElement('pre');
      this.codeNode = this._renderer.createElement('code');
      this._renderer.addClass(this.codeNode, 'language-' + this.language);
      this._renderer.addClass(this.preNode, 'pc-prism');
      this._renderer.appendChild(this.nativeElement, this.preNode);
      this._renderer.appendChild(this.preNode, this.codeNode);
      this.codeNode.textContent = this.code;
      Prism.highlightElement(this.codeNode, Prism.languages[this.language]);
    }
  }
}
