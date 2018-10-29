# I just wanna have fun - Angular Structural Directives

This is just a fun project to show the power of structural directives. 

In case you didn't noticed. I was slightly influenced by React Render-Children pattern. I don't chase after the React architecture but I tried to achive stuff the React community does simply better:
- Containers Component, who should not have a templates, nor styles
- Default OnPush
- Clear Separation of concerns, meaning Page or View Components, which are effectively "dumb", but do not have a dependency to the state management library, http-client or router.

I guess it's possible that every usecase could also be done with 'normal' directives, which would include `<ng-templates>..</ng-templates>`. Since structural directives hide this structure from us I decided to go with them.

Again: I just wanna have fun :)

## let

As known from other existing projects like [ngrx-utils](https://github.com/ngrx-utils/ngrx-utils) this directives allows you to define template variables on a more global scope within a template. This behaviour is already known from the core ngIf Directive, but can also find usage without the need of a condition.
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

## Route Params

This structural directive allows you to read parameters from the current active route and pass it via inputs into your page component. Therefore your page component does not have to be dependent on the ActiveRoute directly, gaining separation of concerns.
```
<Route *params="let username=usernameParam">
    <commit-list-view [user]="username"></commit-list-view>
</Route> 
```

## Route Definition

This is a naughty one. It allows to configure routes at runtime.
```
<router-outlet></router-outlet>

<Route *path="'test'">
  <h2>TEST Route</h2>
</Route>

<Route *path="'hermann'">
  <h2>Next One</h2>
</Route>

// access params in the same way as with the *params directive
<Route *path="'foo/:usernameParam' let username=usernameParam">
  <user-view [name]="username"></user-view>
</Route>
``` 
It doesn't support childroutes for now.

## Fetch

Fetch data via HTTP-Call.
```
<Fetch *url="let commits from 'https://api.github.com/users/yanxch/events'">
    <commits-list [commits]="commits"><commits-list>
</Fetch>
```
Multiple structural directives can be combined. In the next example the `*params` directive is combined wit the `*url` one.

```
<Route *params="let username=usernameParam">
  <Fetch *url="let commits from commitsUrl(username) map toCommits">
      <commit-list [commits]="commits"></commit-list>
  </Fetch>
</Route>
```
Fetch allows to pass a map function, which takes the response and maps it to whatever you like.

## Connect Redux

Connect to NGRX decaratively. 
```
// counter.view.html
<Connect *redux="let counter=counter
                 let incrementAction=incrementAction
                 let decrementAction=decrementAction
                 let resetAction=resetAction
                 mapSelectorToInput {
                   counter: counterSelector
                  }
                 mapOutputToAction {
                   incrementAction: incrementActionCreator,
                   decrementAction: decrementActionCreator,
                   resetAction: resetActionCreator
                 }">

  <counter [count]="counter | async"
    (onIncrement)="incrementAction($event)"
    (onDecrement)="decrementAction($event)"
    (onReset)="resetAction($event)">
  </counter>

</Connect>

@Component({
  selector: 'counter-view',
  templateUrl: 'counter.view.html'
})
export class CounterView {

  counterSelector(state: AppState) {
    return state.counter;
  }
  
  incrementActionCreator(payload) {
    return {
      type: INCREMENT
    }; 
  }

  decrementActionCreator(payload) {
    return {
      type: DECREMENT
    }; 
  }

  resetActionCreator(payload) {
    return {
      type: RESET
    }; 
  }
}
```
It takes selector functions and binds them to the inputs.
It takes action-creator functions and binds them to the store.
So no ngrx dependency is needed in your page component.


