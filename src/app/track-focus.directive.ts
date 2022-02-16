import { Directive, HostListener, ElementRef } from '@angular/core';
import { SocketService } from './socket.service';
@Directive({
  selector: '[trackFocus]'
})
export class TrackFocusDirective {
  constructor(private socketService: SocketService, private elRef: ElementRef) {}

  @HostListener('focus', ['$event']) onFocus(e: any) { this.socketService.isTyping() }
  @HostListener('blur', ['$event']) onblur(e: any) { this.socketService.stoppedTyping() }
  @HostListener('document:keydown.enter', ['$event']) onEnter(e: KeyboardEvent): void { 
      this.elRef.nativeElement.blur() 
      this.socketService.sendMessage(this.elRef.nativeElement.value)
      this.elRef.nativeElement.value = ''
  }

}
