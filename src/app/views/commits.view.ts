import {Component, Input} from '@angular/core';
import {Commit} from '../components/commitList/commit';
import {toCommits} from '../api/commits/commits.service';

@Component({
  selector: 'commits-view',
  templateUrl: 'commits.view.html'
})
export class CommitsView {
  commitsUrl(username) {
    return `https://api.github.com/users/${username}/events`;
  }

  toCommits(response: any[]) {
    return toCommits(response);
  }
}

