# I just wanna have fun - Angular Structural Directives

This is just a fun project to show the power of structural directives. 

In case you didn't noticed. I was slightly influenced by React Render-Children pattern. I don't chase after the React architecture but I tried to achive stuff the React community does simply better:
- Containers Component, who should not have a templates, nor styles
- Default OnPush
- Clear Separation of concerns, meaning Page or View Components, which are effectively "dumb", but do not have a dependency to the state management library, http-client or router.

I guess it's possible that every usecase could also be done with 'normal' directives, which would include `<ng-templates>..</ng-templates>`. Since structural directives hide this structure from us I decided to go with them.

Again: I just wanna have fun :)

##let
As known from other existing projects like [ngrx-utils](https://github.com/ngrx-utils/ngrx-utils) this directives allows you to define template variables on more global scope within a template. This behaviour is already known from the core ngIf Directive, but can also finds usage without the need of condition.
Merely it is used because you only want to subscribe once and you don't wanna manage the subscription in your component code.
```
// let.view.html
<Page *let="
  let tasks=tasks 
  let documents=documents 
  let loading=loading 
  from { 
    tasks: tasks$ | async,  
    documents: documents$ | async, 
    loading: loading$ | async 
  }">

  <p>Tasks:</p> {{ tasks | json }}
  <p>Documents:</p> {{ documents | json }}
  <p>Loading:</p> {{ loading }}

</Page>

@Component({
  selector: 'let-view',
  templateUrl: 'let.view.html'
})
export class LetView {
  tasks$ = of(['task1', 'task2']);
  documents$ = of(['document1', 'document2']);
  loading$ = of(true);
}
``` 
The main difference to the already given solution of ngrx-utils is that internally the from object is spread into the context object of the strucural directive, which allows us to define the variables like `let task=task`and access their values directly.

