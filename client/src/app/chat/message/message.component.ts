import { Component, OnInit, Input } from "@angular/core";
import { Message } from "../../_models/message";
import { User } from "src/app/_models/user";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const container = document.getElementById("msgContainer");
    container.scrollTop = container.scrollHeight;
  }
}
