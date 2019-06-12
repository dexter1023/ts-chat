import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import { AccountSettingsComponent } from "../modals/account-settings/account-settings.component";
import { AuthenticationService } from "../_services/authentication.service";
import { User } from "../_models/user";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent implements OnInit {
  currentUser: User;

  constructor(
    public modal: MatDialog,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  openModal(name): void {
    this.modal.open(name);
  }

  openAccountSettingsModal(): void {
    this.openModal(AccountSettingsComponent);
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {}
}
