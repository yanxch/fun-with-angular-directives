import {Directive, TemplateRef, ViewContainerRef, OnInit, Input} from '@angular/core';

export class LetContext {
  $implicit: any;
  [key: string]: any;
}

@Directive({
  selector: '[let]'
})
export class LetDirective implements OnInit {

  private _context = new LetContext();

  @Input() 
  set letFrom(value: any) {
    console.log('Got new value: ', value);
    Object.assign(this._context, value);
  }

  constructor(private template: TemplateRef<LetContext>,
              private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    console.log('Creating embedded View');
    this.viewContainer.createEmbeddedView(this.template, this._context);
  }
}