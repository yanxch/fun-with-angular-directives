import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Commit} from '../../components/commitList/commit';
import {map} from 'rxjs/operators';

@Injectable()
export class CommitsService {
  
  constructor(private http: HttpClient) {}

  commitsByUsername(username: string) {
    const url = `https://api.github.com/users/${username}/events`;

    return this.http.get(url).pipe(map(toCommits));
  }
}


// Pure functions --> easy to test
const isPushEvent = (entry) => entry.type === 'PushEvent';

export const toCommits = (response: any[]) => 
  response
    .filter(isPushEvent)
    .reduce((commits, pushEvent) => // [[Commit, Commit], [Commit, Commit, Commit]] => [Commit, Commit, Commit, Commit, Commit]
      commits.concat(pushEvent.payload.commits.map(commit => 
          new Commit(commit.sha, 
              pushEvent.repo.name, 
              commit.author.name, 
              commit.message))
          )    
      , []) as Commit[];