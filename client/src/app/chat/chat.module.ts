import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ChatComponent } from "./chat.component";

import { SocketService } from "../_services/socket.service";
import { MaterialModule } from "../shared/material/material.module";
import { MessageComponent } from "./message/message.component";

@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  providers: [SocketService]
})
export class ChatModule {}
