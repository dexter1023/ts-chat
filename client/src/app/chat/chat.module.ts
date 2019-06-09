import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ChatComponent } from "./chat.component";

import { SocketService } from "./shared/services/socket.service";
import { MaterialModule } from "../shared/material/material.module";

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  providers: [SocketService]
})
export class ChatModule {}