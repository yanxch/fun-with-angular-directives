import {Component, Directive, Input, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router, Route} from '@angular/router';
import {take} from 'rxjs/operators';

export class RouteContext {
  [key: string]: any;
}

@Directive({
  selector: '[path]'
})
export class RouteDirective implements OnInit {

  @Input('path') path: string;

  @Input('pathMatch') match: string;
  @Input('pathOutlet') outlet: string; 

  constructor(private template: TemplateRef<RouteContext>,
    private router: Router) {}

  ngOnInit() {
    const config: Route = {
      path: this.path,
      component: RouterRenderComponent,
      data: { template: this.template }
    };

    if (this.match) {
      config.pathMatch = this.match;
    }

    if (this.outlet) {
      config.outlet = this.outlet;
    }

    this.router.config.push(config);
  }
}

@Component({
  selector: 'Router-Component',
  template: `
    <ng-container #container></ng-container>
  `
})
export class RouterRenderComponent implements OnInit {

    context = new RouteContext();

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    private template: TemplateRef<any>;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.data.pipe(take(1)).subscribe(data => this.template = data.template);
      this.container.createEmbeddedView(this.template, this.context);

      this.route.paramMap
        .subscribe((paramMap: any) => {
          Object.assign(this.context, paramMap.params);
        });
    }
}