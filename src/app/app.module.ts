import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterModule, Route} from '@angular/router';

import {AppComponent} from './app.component';
import {Fetch} from '../../lib/fetch/fetch.component';
import {FetchUrlDirective} from '../../lib/fetch/url.directive';
import {LoadingComponent} from '../../lib/loading-spinner/loading-spinner.component';
import {CommitListComponent} from './components/commitList/commitList.component';
import {HttpClientModule} from '@angular/common/http';
import {CommitsView} from './views/commits.view';
import {RouteComponent} from '../../lib/router/route.component';
import {ParamsDirective} from '../../lib/router/params.directive';
import {PathDirective, RouterRenderComponent} from '../../lib/router/path.directive';
import {UserView} from './components/user/user.component';
import {LetDirective} from '../../lib/let/let.directive';
import {LetView} from './views/let.view';
import {Page} from '../../lib/let/page.component';
import {StoreModule} from '@ngrx/store';
import {counterReducer} from './state';
import {CounterComponent} from './components/counter/counter.component';
import {ReduxDirective} from '../../lib/connect/redux.directive';
import {CounterView} from './views/counter.view';
import {ConnectComponent} from '../../lib/connect/connect.component';


const routes: Route[] = [
    { path: 'commits/:usernameParam', component: CommitsView },
    { path: 'let', component: LetView },
    { path: 'connect', component: CounterView }
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
    PathDirective,
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
    CounterView
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
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent, RouterRenderComponent]
})
export class AppModule { }
