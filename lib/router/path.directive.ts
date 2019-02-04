import {Component, Directive, Input, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef, Optional, SkipSelf, Self, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router, Route} from '@angular/router';
import {take} from 'rxjs/operators';
import {RouteComponent} from './route.component';

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

  config: Route;

  constructor(private template: TemplateRef<RouteContext>,
              private router: Router,
              @SkipSelf() @Optional() private parent: RouteComponent) {}

  ngOnInit() {
    if (this.parent) {
      console.log('Found a RouteDirective Parent. I am a child!');
      console.log('I should add my configuration as children');
    }
    this.config = {
      path: this.path,
      component: RouterRenderComponent,
      data: { template: this.template }
    };

    if (this.match) {
      this.config.pathMatch = this.match;
    }

    if (this.outlet) {
      this.config.outlet = this.outlet;
    }

    this.router.config.push(this.config);
  
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