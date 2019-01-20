import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatListModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Route, RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {ConnectComponent} from '../../lib/connect/connect.component';
import {ReduxDirective} from '../../lib/connect/redux.directive';
import {Fetch} from '../../lib/fetch/fetch.component';
import {FetchUrlDirective} from '../../lib/fetch/url.directive';
import {LetDirective} from '../../lib/let/let.directive';
import {Page} from '../../lib/let/page.component';
import {LoadingComponent} from '../../lib/loading-spinner/loading-spinner.component';
import {ParamsDirective} from '../../lib/router/params.directive';
import {RouteDirective, RouterRenderComponent} from '../../lib/router/path.directive';
import {RouteComponent} from '../../lib/router/route.component';
import {CommitsService} from './api/commits/commits.service';
import {AppComponent} from './app.component';
import {CommitListComponent} from './components/commitList/commitList.component';
import {CounterComponent} from './components/counter/counter.component';
import {LetComponent} from './components/let/let.component';
import {UserView} from './components/user/user.component';
import {CommitsContainer} from './container/commits.container';
import {counterReducer} from './state';
import {CommitsNormalView} from './views/commits-normal.view';
import {CommitsView} from './views/commits.view';
import {CounterContainer} from './views/counter.container';
import {CounterView} from './views/counter.view';
import {LetView} from './views/let.view';
import {LetViewContainer} from './views/letView.container';
import {LetView2Container} from './views/letView2.container';



const routes: Route[] = [
    { path: 'commits/:usernameParam', component: CommitsView },
    { path: 'let', component: LetViewContainer },
    { path: 'let2', component: LetView2Container},
    { path: 'connect', component: CounterView },
    { path: 'commits-normal/:username', component: CommitsNormalView}
];

export interface AppState {
  counter: number;
}

@NgModule({
  declarations: [
    AppComponent,
    Fetch,
    FetchUrlDirective,
    LoadingComponent,
    RouteComponent,
    ParamsDirective,
    RouteDirective,
    RouterRenderComponent,
    CommitListComponent,
    CommitsView,
    UserView,
    LetDirective,
    LetView,
    Page,
    CounterComponent,
    ConnectComponent,
    ReduxDirective,
    CounterView,
    CommitsContainer,
    CommitsNormalView,
    LetViewContainer,
    CounterContainer,
    LetComponent,
    LetView2Container
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot({ counter: counterReducer}),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    CommitsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent, RouterRenderComponent]
})
export class AppModule { }
