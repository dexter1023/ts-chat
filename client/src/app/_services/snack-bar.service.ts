import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({ providedIn: "root" })
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  log(message: string) {
    this.show(message, "Zamknij");
  }
}
