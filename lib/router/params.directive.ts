import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

export type ParamsContext = {
  $implicit: any;
  [key: string]: any
};

@Directive({
  selector: '[params]'
})
export class ParamsDirective implements OnInit {

  context: ParamsContext;

  constructor(private template: TemplateRef<ParamsContext>,
              private viewContainer: ViewContainerRef,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: any) => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.template, { 
          $implicit: paramMap.params,
          ...paramMap.params
        }); 
      });
  }
}