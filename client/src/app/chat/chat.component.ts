import { Component, OnInit } from "@angular/core";

import { SocketService } from "../_services/socket.service";
import { User } from "../_models/user";
import { Message } from "../_models/message";
import { Chat } from "../_models/chat";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  chat: Chat;
  currentUser: User;
  messages: Message[];
  messageContent: String = "";

  constructor(
    private socketService: SocketService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onConnect().subscribe(data => {
      this.chat = data;
      this.messages = data.messages;
    });

    this.socketService.onMessage().subscribe(data => {
      this.messages.push(data);
    });
  }

  public sendMessage(message: string): void {
    if (!message) return;

    this.socketService.send(message);
    this.messageContent = null;
  }
}
