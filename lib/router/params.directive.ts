import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

export class ParamsContext {
  $implicit: any;
  [key: string]: any;
}

@Directive({
  selector: '[params]'
})
export class ParamsDirective implements OnInit {

  context = new ParamsContext();

  constructor(private template: TemplateRef<ParamsContext>,
              private viewContainer: ViewContainerRef,
              private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('Create new View');
    this.viewContainer.createEmbeddedView(this.template, this.context);
    this.route.paramMap
      .subscribe((paramMap: any) => {
        Object.assign(this.context, paramMap.params);
      });
  }
}