import { Component, Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core'
import { SocketService } from '../socket.service';
import Message from '../Classes/Message';
import User from '../Classes/User';

import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public latency: number = 0

  public messages: Message[] = []

  public message: string = '';

  public faCommentDots = faCommentDots

  public animals: string[] = [
    'alligator', 'ant', 'bat', 'bear', 'bee', 'bird', 'bulldog', 'butterfly', 'cat', 'chicken',
    'cow', 'crab', 'crocodile', 'deer', 'dog', 'donkey', 'duck', 'eagle', 'elephant', 'fish',
    'fox', 'frog', 'giraffe', 'gorilla', 'hippo', 'horse', 'insect', 'lion', 'monkey', 'moose',
    'mouse', 'owl', 'panda', 'penguin', 'pig', 'rabbit', 'rhino', 'rooster', 'shark', 'sheep',
    'snake', 'tiger', 'turkey', 'turtle', 'wolf'
  ]

  @Input() user: User = new User('', '')
  @Input() onlineUsers: User[] = []
  @Input() lobby: string = ''

  constructor(private socketService: SocketService) { }

  ngOnInit() {

    setInterval(this.checkLatency, 10000)

    this.socketService.getNewMessage().subscribe((msg: Message) => {
      this.messages.push(msg)
      console.log(JSON.stringify(msg))
    })

    this.socketService.userTyping().subscribe((user_id: string) => {
      const index = this.onlineUsers.findIndex(user => user.id == user_id)
      if(index > -1) this.onlineUsers[index].isTyping = true
    })

    this.socketService.userStoppedTyping().subscribe((user_id: string) => {
      const index = this.onlineUsers.findIndex(user => user.id == user_id)
      if(index > -1) this.onlineUsers[index].isTyping = false
    })    
  }

  sendMessage(message: string) {
    if (message) {
      this.socketService.sendMessage(message);
    }
  }

  disconnect = () => this.socketService.disconnect()

  checkLatency = async (): Promise<void> => { this.latency = await this.socketService.getLatency() }

  /* Copys text to clipboard */
  copy(str: string): void {
    let listener = (e: ClipboardEvent) => {
      e.clipboardData!.setData('text/plain', (str));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);

    const lobby: string = this.lobby
    this.lobby = 'copied'
    setTimeout(() => {
      this.lobby = lobby
    }, 600)
  }

}

