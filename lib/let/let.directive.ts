import {Directive, TemplateRef, ViewContainerRef, OnInit, Input} from '@angular/core';

export type PathContext = {
  $implicit: any;
  [key: string]: any;
};

@Directive({
  selector: '[let]'
})
export class LetDirective implements OnInit {

  @Input('letFrom') from: any;

  @Input('let')
  set let(value: any) {
    console.log(value);
  }

  constructor(private template: TemplateRef<PathContext>,
              private viewContainer: ViewContainerRef) {}
  ngOnInit() {
     
    this.viewContainer.createEmbeddedView(this.template, 
      {
        $implicit: this.from,
        ...this.from
      });
  }
}