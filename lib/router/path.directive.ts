import {ComponentFactoryResolver, Directive, OnInit, TemplateRef, ViewContainerRef, Component, ViewChild, Input, Type} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';

export type PathContext = {
  $implicit: any;
};

@Directive({
  selector: '[path]'
})
export class PathDirective implements OnInit {

  @Input('path') path: string;

  constructor(private template: TemplateRef<PathContext>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private router: Router) {}

  ngOnInit() {
    this.router.config.push({
      path: this.path,
      component: RouterRenderComponent,
      data: { template: this.template }
    });
  }
}

export function RouterComponentFactory(template, context, component: Type<RouterRenderComponent>): Type<RouterRenderComponent> {
  return class extends component {

    constructor() {
      super(template, context);
    }

    ngOnInit() {
      super.ngOnInit();
    }

  };
}

@Component({
  selector: 'Router-Component',
  template: `
    <ng-container #container></ng-container>
  `
})
export class RouterRenderComponent implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    private template: TemplateRef<any>;

    constructor(private route: ActivatedRoute) {
    }


    ngOnInit() {
      this.route.data.pipe(take(1)).subscribe(data => this.template = data.template);

      this.route.paramMap
        .subscribe((paramMap: any) => {
          this.container.clear();
          this.container.createEmbeddedView(this.template, { 
            $implicit: paramMap.params,
            ...paramMap.params
          }); 
        });

    }
}