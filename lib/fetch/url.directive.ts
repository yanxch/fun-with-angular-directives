import {HttpClient} from '@angular/common/http';
import {ComponentFactoryResolver, Directive, Input, OnInit, TemplateRef, Type, ViewContainerRef} from '@angular/core';
import {LoadingComponent} from '../loading-spinner/loading-spinner.component';

/**
 * 
 * <Fetch *url="let commits from 'https://api.github.com/users/yanx/events'">
 *    <commits-list commits="commits"><commits-list>
 * </Fetch>
 */

export class UrlContext {
  $implicit: any;
}

@Directive({
  selector: '[url]'
})
export class FetchUrlDirective implements OnInit {

  context = new UrlContext();
  url: string;

  @Input() 
  set urlFrom(value: string) {
    this.url = value;
    this.fetch(this.url);
  }

  @Input('urlMap') mapFn = response => response;
  @Input('urlLoadingComponent') loadingComponent: Type<any> = LoadingComponent;

  constructor(private template: TemplateRef<UrlContext>,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainer: ViewContainerRef,
              private httpClient: HttpClient) {}

  ngOnInit() {}

  fetch(url :string) {
    if (url) {
      //Show LoadingComponent
      this.viewContainer.remove();
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.loadingComponent);
      this.viewContainer.createComponent(componentFactory);

      this.httpClient.get(this.url)
        .subscribe(
          response => {
            this.viewContainer.remove();
            this.viewContainer.createEmbeddedView(this.template, { $implicit: this.mapFn(response) });
          },
          error => {
            this.viewContainer.remove();
          });
    }
  }
}