// import { Component, OnInit } from "@angular/core";

import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  AfterViewInit,
  QueryList,
  ElementRef
} from "@angular/core";

import { Action } from "./shared/model/action.enum";
import { Event } from "./shared/model/event.enum";
import { Message } from "./shared/model/message";
import { User } from "./shared/model/user";
import { SocketService } from "./shared/services/socket.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string = "";
  isConnection: any;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.isConnection = this.socketService
      .onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log("Connected"); // TODO
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("Disconnected");
    });
  }

  public sendMessage(message: string): void {
    if (!message) return;

    this.socketService.send({
      from: this.user,
      content: message
    });

    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      };
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }
}
