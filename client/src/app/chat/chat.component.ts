import { Component, OnInit } from "@angular/core";

import { Action } from "./shared/model/action.enum";
import { Event } from "./shared/model/event.enum";
import { SocketService } from "../_services/socket.service";
import { User } from "../_models/user";
import { Message } from "../_models/message";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  action = Action;
  user: User = {
    name: "Default"
  };
  mockPawel: User = {
    name: "Paweł"
  };
  mockDamian: User = {
    name: "Damian"
  };
  messages: Message[] = [
    {
      author: this.mockPawel,
      content: "Hello"
    },
    {
      author: this.mockDamian,
      content: "Hello world!"
    },
    {
      author: this.mockPawel,
      content: "xDDD"
    }
  ];
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
      author: this.mockPawel,
      content: message
    });

    //TMP póki nie ma połączenia z backendem
    this.messages.push({
      author: this.mockPawel,
      content: message
    });

    this.messageContent = null;
  }

  // TODO: Wysyłanie "message" do socketa na serwerze
  /* public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        author: this.user,
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
  } */
}
