import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class MaterialModule {}
