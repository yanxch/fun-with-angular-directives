import {CommitsService} from '../api/commits/commits.service';
import {OnInit, Input, Component, SimpleChanges} from '@angular/core';
import {Commit} from '../components/commitList/commit';
import {Observable} from 'rxjs';

@Component({
  selector: 'commits-container',
  templateUrl: 'commits.container.html'
  // no styles in containers please :)                  
})
export class CommitsContainer implements OnInit {
  
  @Input()
  username: string;
  
  commits$: Observable<Commit[]>;

  constructor(private commitsApi: CommitsService) {}

  ngOnInit() {
  }
  
  ngOnChanges({ username }: SimpleChanges) {
    if (username.currentValue) {
      this.commits$ = this.loadCommits(username.currentValue);
    }
  }

  private loadCommits(username: string) {
    return this.commitsApi.commitsByUsername(username);
  }
}