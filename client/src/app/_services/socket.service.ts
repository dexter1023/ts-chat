import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import * as socketIo from "socket.io-client";
import { Message } from "../_models/message";
import { User } from "../_models/user";
import { AuthenticationService } from "./authentication.service";
import { Chat } from "../_models/chat";
import { Socket } from "socket.io";

const SERVER_URL = "ws://localhost:4000/rooms";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket: Socket;
  private currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL, {
      query: {
        token: this.currentUser.token
      }
    });
  }

  public send(message: String): void {
    this.socket.emit("message", {
      user: this.currentUser.id,
      message: message
    });
  }

  public deleteMessage(messageId: String): void {
    this.socket.emit("deleteMessage", {
      messageId
    });
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on("message", (data: Message) => {
        observer.next(data);
      });
    });
  }

  public onConnect(): Observable<Chat> {
    return new Observable<Chat>(observer => {
      this.socket.on("connected", (data: any) => {
        observer.next(data);
      });
    });
  }

  public onDeleteMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("deleteMessage", (data: any) => {
        observer.next(data);
      });
    });
  }
}
