import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.scss"]
})
export class AccountSettingsComponent implements OnInit {
  showPassword: Boolean = false;

  user = {
    name: "",
    password: "",
    email: ""
  };

  nameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [Validators.required]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  constructor(public dialogRef: MatDialogRef<AccountSettingsComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
