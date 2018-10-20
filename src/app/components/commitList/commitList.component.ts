import {Component, Input, OnInit} from '@angular/core';
import {Commit} from './commit';

@Component({
  selector: 'commit-list',
  templateUrl: './commitList.component.html',
  styleUrls: ['./commitList.component.scss']
})
export class CommitListComponent implements OnInit {
   @Input()
   commits: Commit[];

   ngOnInit() {
     console.log('CommitListComponent');
     console.log(this.commits);
   }
}
