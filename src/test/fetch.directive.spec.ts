import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {createHostComponentFactory, SpectatorWithHost} from '@netbasal/spectator';
import {FetchUrlDirective} from '../../lib/fetch/url.directive';
import {LoadingComponent} from '../../lib/loading-spinner/loading-spinner.component';
import {defer} from 'rxjs';
import {fakeAsync} from '@angular/core/testing';

@Component({ selector: 'custom-host', template: '' })
class FetchUrlDirectiveHost {
  constructor() {}
}

describe('Fetch Url Directive', function () {
  let host: SpectatorWithHost<FetchUrlDirective, FetchUrlDirectiveHost>;
  let httpClientSpy;
  let createHost;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(asyncData({
      firstname: 'Max',
      surname: 'Mustermann',
      info: 'Is having fun.'
    }));
    createHost = createHostComponentFactory({
      component: FetchUrlDirective,
      host: FetchUrlDirectiveHost,
      declarations: [LoadingComponent],
      componentProviders: [
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      entryComponents: [LoadingComponent]
    });
  });

  it('fetches and shows remote data', fakeAsync(() => {
    // 
    // Given
    host = createHost(`
      <div *url="let user from 'http://localhost:9876/test'">
        <p class="first">Firstname: {{user.firstname}}</p> 
        <p class="second">Surname: {{user.surname}}</p> 
        <p class="third">Info: {{user.info}}</p> 
      </div>
    `);
    //
    // When
    host.detectChanges();
    //
    // Then
    const firstname = host.hostDebugElement.query(By.css('.first')).nativeElement;
    const surname = host.hostDebugElement.query(By.css('.second')).nativeElement;
    const info = host.hostDebugElement.query(By.css('.third')).nativeElement;

    expect(firstname).toHaveText('Firstname: Max');
    expect(surname).toHaveText('Surname: Mustermann');
    expect(info).toHaveText('Is having fun.');
  }));
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}