import {Directive, TemplateRef, ViewContainerRef, OnInit, Input} from '@angular/core';

export class LetContext {
  [key: string]: any;
}

@Directive({
  selector: '[let]'
})
export class LetDirective implements OnInit {

  private _context = new LetContext();

  @Input() 
  set letFrom(value: any) {
    Object.assign(this._context, value);
  }

  constructor(private template: TemplateRef<LetContext>,
              private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.template, this._context);
  }
}