import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import { AccountSettingsComponent } from "../modals/account-settings/account-settings.component";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent implements OnInit {
  constructor(public modal: MatDialog) {}

  openModal(name): void {
    this.modal.open(name);
  }

  openAccountSettingsModal(): void {
    this.openModal(AccountSettingsComponent);
  }

  ngOnInit() {}
}
