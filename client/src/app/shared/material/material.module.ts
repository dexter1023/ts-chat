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
  MatInputModule
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
    MatInputModule
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
    MatInputModule
  ]
})
export class MaterialModule {}
