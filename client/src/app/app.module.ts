import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { ChatModule } from "./chat/chat.module";
import { TopbarComponent } from "./topbar/topbar.component";
import { AccountSettingsComponent } from "./modals/account-settings/account-settings.component";

@NgModule({
  declarations: [AppComponent, TopbarComponent, AccountSettingsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ChatModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AccountSettingsComponent]
})
export class AppModule {}
