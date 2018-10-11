import {Component, Input} from '@angular/core';

@Component({
  selector: 'commits-view',
  templateUrl: 'commits.view.html'
})
export class CommitsView {
  commitsUrl(username) {
    return `https://api.github.com/users/${username}/events`;
  }
}