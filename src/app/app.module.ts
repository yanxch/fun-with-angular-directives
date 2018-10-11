import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {Fetch} from '../../lib/fetch/fetch.component';
import {UrlDirective} from '../../lib/fetch/url.directive';
import {LoadingComponent} from '../../lib/loading-spinner/loading-spinner.component';
import {CommitListComponent} from './components/commitList/commitList.component';
import {HttpClientModule} from '@angular/common/http';
import {CommitsView} from './views/commits.view';
import {RouteComponent} from '../../lib/router/route.component';
import {ParamsDirective} from '../../lib/router/params.directive';


const routes = [
    { path: 'commits/:usernameParam', component: CommitsView }
];

@NgModule({
  declarations: [
    AppComponent,
    Fetch,
    UrlDirective,
    LoadingComponent,
    RouteComponent,
    ParamsDirective,
    CommitListComponent,
    CommitsView
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent]
})
export class AppModule { }
