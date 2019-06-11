import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormControl } from "@angular/forms";
import { first } from "rxjs/operators";

import { MatSnackBar, MatTabGroup } from "@angular/material";
import { AuthenticationService } from "../_services/authentication.service";
import { SnackBarService } from "../_services/snack-bar.service";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;

  login = {
    name: "",
    password: ""
  };

  loginNameFC = new FormControl("", [Validators.required]);
  loginPasswordFC = new FormControl("", [Validators.required]);

  register = {
    name: "",
    email: "",
    password: ""
  };

  registerNameFC = new FormControl("", [Validators.required]);
  registerPasswordFC = new FormControl("", [Validators.required]);
  registerEmailFC = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  loading = false;
  submitted = false;
  returnUrl: string;

  loginFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [Validators.required]);
  emailFormControl = new FormControl("", [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: SnackBarService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  // showSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 3000
  //   });
  // }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onLogin() {
    this.submitted = true;

    this.loading = true;
    this.authenticationService
      .login(this.login.name, this.login.password)
      .pipe(first())
      .subscribe(
        data => {
          this.snackBar.log("Zalogowano pomyślnie!");
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.snackBar.log(error);
          this.loading = false;
        }
      );
  }

  onRegister() {
    this.submitted = true;

    this.loading = true;
    this.authenticationService
      .register(this.register.name, this.register.email, this.register.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.loading = false;
            this.snackBar.log(
              "Zarejestrowano pomyślnie. Możesz się zalogować!"
            );
            this.tabGroup.selectedIndex = 0;
          }
        },
        error => {
          this.snackBar.log(error);
          this.loading = false;
        }
      );
  }
}
