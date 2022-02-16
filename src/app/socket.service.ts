import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { io, Socket } from 'socket.io-client'
import { environment } from 'src/environments/environment'
import Message from './Classes/Message'
import User from './Classes/User'


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket = io(environment.production ? '' : 'http://localhost:8080')

  constructor() { }

  public asyncEmit = (eventName: string, data?: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      if(data !== undefined) this.socket.emit(eventName, data)
      else this.socket.emit(eventName)
      
      this.socket.on(eventName, (result: any) => {
        this.socket.off(eventName)
        resolve(result)
      })

      /* If no response after 1 second */
      setTimeout(() => { reject(new Error('Server responded too slow... it might be down or lagging behind')) }, 1000)
      
    })
  }

  public getLatency = async (): Promise<number> => {
    const startTime = new Date().getTime()
    await this.asyncEmit('ping')
    return new Date().getTime() - startTime
  }

  /* Creates a lobby on the server. Returns the lobby name created or null if it wasn't created */
  public createLobby = async (): Promise<string> => {
    const lobby = await this.asyncEmit('create')
    return lobby ? lobby : ''
  }

  /* Places a client in a lobby. Returns host/player id or null if join wasn't successful */
  public join = async (name: string, lobby: string): Promise<User> => {
    return await this.asyncEmit('join', { name: name, lobby: lobby } )
  }

  public sendMessage = (message: string) => this.socket.emit('message', message)

  public getNewMessage = (): Observable<Message> => {
    return new Observable<Message>((observer: any) => {
      this.socket.on('newMessage', (message: Message) => {
        observer.next(message)
      })
    })
  }

  public getOnlineUsers = (): Observable<any> => {
    return new Observable<any>((observer: any) => {
      this.socket.on('all users', (data: any) => {
        observer.next(data)
      })
    })
  }

  public isTyping = () => this.socket.emit('isTyping')

  public stoppedTyping = () => this.socket.emit('stoppedTyping')

  public userTyping = (): Observable<string> => {
    return new Observable<string>((observer: any) => {
      this.socket.on('userTyping', (user_id: string) => {
        observer.next(user_id)
      })
    })
  }

  public userStoppedTyping = (): Observable<string> => {
    return new Observable<string>((observer: any) => {
      this.socket.on('userStoppedTyping', (user_id: string) => {
        observer.next(user_id)
      })
    })
  }

  public disconnect = () => this.socket.emit('disconnected')

 
}
