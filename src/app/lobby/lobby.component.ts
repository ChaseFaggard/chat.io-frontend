import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import User from '../Classes/User'
import { SocketService } from '../socket.service'

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  public lobby:string = ''
  public user: User = new User('', '')
  public onlineUsers: User[] = []

  constructor(private route: ActivatedRoute, private socketService: SocketService) { 

    this.socketService.getOnlineUsers().subscribe((users: any) => {
      const onlineUsers: User[] = []
      for(let i = 0; i < users.length; i++) {
        let user: User = users[i][1]
        onlineUsers.push(user)
      }
      this.onlineUsers = onlineUsers
    })

    const lobby = route.snapshot.paramMap.get("lobby") // Get lobby name from url params
    const name = route.snapshot.paramMap.get("name") 
    console.log('Name: ' + name)
    if(lobby !== null && name !== null) this.joinLobby(name, lobby)
  }

  ngOnInit(): void { }

  joinLobby = async (name: string, lobby: string) => {
    this.user = await this.socketService.join(name, lobby)
    if(this.user) {
      this.lobby = lobby
      console.log(`Successfully joined lobby ${lobby}.`)
    } else console.log('Error. No lobby found with that name')
  }

}
