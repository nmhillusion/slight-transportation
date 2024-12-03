import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

const commonModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
];

@NgModule({
  imports: commonModules,
  exports: commonModules,
})
export class AppCommonModule {}