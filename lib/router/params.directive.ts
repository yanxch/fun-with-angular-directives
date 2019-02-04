import {Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

export class ParamsContext {
  [key: string]: any;
}

@Directive({
  selector: '[params]'
})
export class ParamsDirective implements OnInit, OnDestroy {

  context = new ParamsContext();

  private _routeParamsSubscription: Subscription;

  constructor(private template: TemplateRef<ParamsContext>,
              private viewContainer: ViewContainerRef,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.template, this.context);
    this._routeParamsSubscription = this.route
      .paramMap
      .subscribe((paramMap: any) => 
        // Copy all route params on the context
        Object.assign(this.context, paramMap.params)
      );
  }

  ngOnDestroy() {
    this._routeParamsSubscription.unsubscribe();
  }
}
