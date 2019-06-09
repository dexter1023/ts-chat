import { Component, OnInit, Input } from "@angular/core";
import { Message } from "../shared/model/message";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  ngOnInit() {}

  ngAfterViewInit() {
    const container = document.getElementById("msgContainer");
    container.scrollTop = container.scrollHeight;
  }
}
