import {CommitsService} from '../api/commits/commits.service';
import {OnInit, Input, Component} from '@angular/core';
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
    this.commits$ = this.loadCommits(this.username);
  }

  private loadCommits(username: string) {
    return this.commitsApi.commitsByUsername(username);
  }
}