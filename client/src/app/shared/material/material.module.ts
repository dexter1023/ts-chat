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

// import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import {
//   MatButtonModule,
//   MatCardModule,
//   MatDialog,
//   MatDialogModule,
//   MatIconModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatListModule,
//   MatSidenavModule,
//   MatToolbarModule
// } from "@angular/material";

// @NgModule({
//   imports: [
//     CommonModule,
//     MatButtonModule,
//     MatCardModule,
//     MatDialogModule,
//     MatIconModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatListModule,
//     MatSidenavModule,
//     MatToolbarModule
//   ],
//   exports: [
//     MatButtonModule,
//     MatCardModule,
//     MatDialogModule,
//     MatIconModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatListModule,
//     MatSidenavModule,
//     MatToolbarModule
//   ],
//   declarations: [],
//   providers: [MatDialog]
// })
// export class MaterialModule {}
