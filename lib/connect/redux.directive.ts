import {TemplateRef, OnInit, ViewContainerRef, Directive, Input, OnDestroy} from '@angular/core';
import {Store, Action} from '@ngrx/store';

export type ReduxContext = {
  $implicit: any;
  [key: string]: any;
};

export type ActionCreator<T> = {
  (payload: T): Action;
};

export type Selector<T> = {
  (store: T): any;
};

@Directive({
  selector: '[redux]'
})
export class ReduxDirective implements OnInit, OnDestroy {

  @Input('reduxMapSelectorToInput') inputs: any;
  @Input('reduxMapOutputToAction') outputs: any;

  constructor(private template: TemplateRef<ReduxContext>,
              private viewContainer: ViewContainerRef,
              private store: Store<any>) {}

  contextOutputs = {};

  ngOnInit() {
      Object.keys(this.inputs)
        .forEach(key => {
          this.inputs[key] = this.store.select(this.inputs[key]);
        });

      Object.keys(this.outputs)
        .forEach(key => {
          this.outputs[key] = this.bindAction(this.outputs[key]);
        });

      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.template, { 
        $implicit: null,
        ...this.inputs,
        ...this.outputs
      }); 
  }

  ngOnDestroy() {

  }

  select(selector) {
    return this.store.select(selector);
  }

  bindAction<T>(actionCreator: ActionCreator<T>) {
    return (payload: T) => {
      this.store.dispatch(actionCreator(payload));
    };
  }
}