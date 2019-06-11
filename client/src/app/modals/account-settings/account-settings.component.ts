import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { User } from "src/app/_models/user";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.scss"]
})
export class AccountSettingsComponent implements OnInit {
  showPassword: Boolean = false;

  user: User;

  nameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [Validators.required]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  constructor(
    public dialogRef: MatDialogRef<AccountSettingsComponent>,
    private authenticationService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {
    this.authenticationService.currentUser.subscribe(x => (this.user = x));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
