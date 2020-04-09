import { of, ReplaySubject, Observable, merge, Subject } from 'rxjs'; 
import { map, tap, mergeMap } from 'rxjs/operators';
import { skipUntil } from 'rxjs/operators';

var output = [];


var observ = Observable.create((observer: any) => {
  observer.next('Hello First Time here');
});
var observable2 = Observable.create((observer: any) => {
  observer.next('Todays a great day');
});
var newObs = merge(observable2, observ);
newObs.subscribe((text) => addRow(text));



var observable$ = Observable.create((data: any) => {
  var i = 1;
  setInterval(() => {
    data.next(i++);
  }, 1000)
});

var obs3$ = new Subject();

setTimeout(() => {
  obs3$.next('Hello im obs3');
}, 3000); 

var newObs1 = observable$.pipe(skipUntil(obs3$));
newObs1.subscribe();

function addRow(text) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(text);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}