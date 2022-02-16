import { Injectable } from '@angular/core'
import { fromEvent, Observable, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  public onWindowResize = (): Observable<Event> => fromEvent(window, 'resize')

  public onKeyDown = (): Observable<string> => {
    return fromEvent(document, 'keydown').pipe(
      map((e: Event) => (<KeyboardEvent>e).key)
    )
  }

  public onKeyUp = (): Observable<string> => {
    return fromEvent(document, 'keyup').pipe(
      map((e: Event) => (<KeyboardEvent>e).key)
    )
  }

}
