import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Commit} from './commit';

@Component({
  selector: 'commit-list',
  templateUrl: './commitList.component.html',
  styleUrls: ['./commitList.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitListComponent implements OnInit {
   @Input()
   commits: Commit[];

   ngOnInit() {
     console.log('CommitListComponent');
     console.log(this.commits);
   }
}
