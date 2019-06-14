import { Component, OnInit, Input } from "@angular/core";
import { Message } from "../../_models/message";
import { User } from "src/app/_models/user";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SocketService } from "src/app/_services/socket.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private socketService: SocketService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  public deleteMessage(): void {
    this.socketService.deleteMessage(this.message._id);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const container = document.getElementById("msgContainer");
    container.scrollTop = container.scrollHeight;
  }
}
