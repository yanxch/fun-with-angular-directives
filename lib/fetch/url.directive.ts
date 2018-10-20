import {HttpClient} from '@angular/common/http';
import {ComponentFactoryResolver, Directive, Input, OnInit, TemplateRef, Type, ViewContainerRef} from '@angular/core';
import {LoadingComponent} from '../loading-spinner/loading-spinner.component';

/**
 * 
 * <Fetch *url="let commits from 'https://api.github.com/users/yanx/events'">
 *    <commits-list commits="commits"><commits-list>
 * </Fetch>
 */

export type UrlContext = {
  $implicit: any;
};

@Directive({
  selector: '[url]'
})
export class FetchUrlDirective implements OnInit {

  context: UrlContext;

  @Input('urlFrom') url: string;
  @Input('urlMap') mapFn: any;
  @Input('urlLoadingComponent') loadingComponent: Type<any> = LoadingComponent;

  constructor(private template: TemplateRef<UrlContext>,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainer: ViewContainerRef,
              private httpClient: HttpClient) {}

  ngOnInit() {
    //Show LoadingComponent
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.loadingComponent);
    this.viewContainer.createComponent(componentFactory);

    this.httpClient.get(this.url)
      .subscribe(
        response => {
          console.log(response);
          this.viewContainer.remove();
          this.viewContainer.createEmbeddedView(this.template, { $implicit: this.mapFn(response) });
        },
        error => {
          this.viewContainer.remove();
        });
  }
}