import {Component} from '@angular/core';


/**
  
 <Connect *redux="mapSelectorToInput {
                    commits: selectCommits(routeParamUser) | async
                  }
                  mapOutputToAction {
                    onSelected: onCommitSelected
                  }"
                  let commits=commits
                  let onCommitSelected=onCommitSelected>
    <commit-list [commits]="commits" (onSelected)="onCommitSelected($event)"/>
  </Connect>
 
 */

@Component({
  selector: 'Connect',
  template: `
    <ng-content></ng-content>
  `
})
export class ConnectComponent {

}