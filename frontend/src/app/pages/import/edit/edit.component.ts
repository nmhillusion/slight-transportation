import { Component, inject, signal } from "@angular/core";
import { BasePage } from "@app/pages/base.page";
import { LogModel } from "@app/model/core/log.model";
import { Nullable } from "@app/model/core/nullable.model";
import { CommodityImportModel } from "@app/model/business/commodity-import.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WarehouseService } from "@app/service/warehouse.service";
import { WarehouseModel } from "@app/model/business/warehouse.model";
import { AppCommonModule } from "@app/core/app-common.module";
import { CommodityImportService } from "@app/service/commodity-import.service";
import { DialogRef } from "@angular/cdk/dialog";

@Component({
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  imports: [AppCommonModule],
})
export class EditComponent extends BasePage {
  data: { import: CommodityImportModel } = inject(MAT_DIALOG_DATA);
  $dialogRef = inject(DialogRef<CommodityImportModel>);

  logMessage$ = signal<Nullable<LogModel>>(null);

  formGroup = new FormGroup({
    importName: new FormControl("", [Validators.required]),
    importTime: new FormControl(new Date(), [Validators.required]),
    warehouseId: new FormControl(0, [Validators.required]),
  });

  warehouseList$ = signal<WarehouseModel[]>([]);

  /// methods

  constructor(
    private $warehouseService: WarehouseService,
    private $commodityImportService: CommodityImportService
  ) {
    super("Edit Import");
  }

  protected override __ngOnInit__() {
    console.log("pass data: ", this.data);

    this.registerSubscription(
      this.$warehouseService.findAll().subscribe({
        next: (result) => {
          this.warehouseList$.set(result);
        },
        complete: () => {
          // console.log(
          //   "complete load warehouse list -- ",
          //   this.warehouseList$(),
          //   this.data,
          //   this.data.import
          // );

          if (this.data && this.data.import) {
            console.log("patching value: ", this.data?.import);

            this.formGroup.patchValue(this.data?.import);
          }
        },
      })
    );
  }

  save() {
    console.log("do save form...", this.data);

    if (!this.data) {
      this.data = { import: {} };
    }

    if (!this.data.import) {
      this.data.import = {};
    }

    this.data.import.importName = this.formGroup.value.importName || "";
    this.data.import.importTime = this.formGroup.value.importTime || new Date();
    this.data.import.warehouseId = this.formGroup.value.warehouseId || 0;

    console.log({ submitData: this.data });

    this.registerSubscription(
      this.$commodityImportService
        .sync(this.data.import)
        .subscribe((result) => {
          this.$dialogRef.close(result);
        })
    );
  }
}
