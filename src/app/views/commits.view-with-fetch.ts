import {Component, Input} from '@angular/core';
import {Commit} from '../components/commitList/commit';
import {toCommits} from '../api/commits/commits.service';

@Component({
  selector: 'commits-view-fetch',
  templateUrl: 'commits.view-with-fetch.html'
})
export class CommitsViewWithFetch {
  commitsUrl(username) {
    return `https://api.github.com/users/${username}/events`;
  }

  toCommits(response: any[]) {
    return toCommits(response);
  }
}

