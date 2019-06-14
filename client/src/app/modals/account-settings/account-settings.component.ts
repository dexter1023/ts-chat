import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { User } from "src/app/_models/user";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.scss"]
})
export class AccountSettingsComponent implements OnInit {
  showPassword: Boolean = false;
  currentUser: User;

  nameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl({ value: "", disabled: true }, [
    Validators.required
  ]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  constructor(
    public dialogRef: MatDialogRef<AccountSettingsComponent>,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {
    this.authenticationService.currentUser.subscribe((user: User) => {
      if (user) {
        this.nameFormControl.setValue(user.name);
        this.emailFormControl.setValue(user.email);
        this.passwordFormControl.setValue(user.password);
        this.currentUser = user;
      }
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.nameFormControl.value, this.emailFormControl.value)
      .subscribe(() => {
        this.onNoClick();
        this.authenticationService.logout();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
