import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public name:string = ''
  public lobby:string = ''

  public formError = {
    name: false,
    lobby: false
  }

  constructor(private router: Router, private socketService: SocketService) { }

  ngOnInit(): void { }

  createLobby = async (isPublic: boolean) => {
    this.checkNameError()
    if(!this.formError.name) {
      const lobby = await this.socketService.createLobby()
      if(lobby) this.router.navigate([`chat/${lobby}/${this.name}`])
    }
    
  }

  joinLobby = (): void => {
    this.checkAllErrors()
    if(!this.formError.name && !this.formError.lobby) {
      this.router.navigate([`chat/${this.lobby}/${this.name}`])
    }
  }

  checkAllErrors = (): void => {
    this.checkNameError()
    this.checkLobbyError()
  }

  checkNameError = (): void => { this.formError.name = this.name.length > 0 ? false : true }

  checkLobbyError = ():void => { this.formError.lobby = this.lobby.length > 0 ? false : true }


}
