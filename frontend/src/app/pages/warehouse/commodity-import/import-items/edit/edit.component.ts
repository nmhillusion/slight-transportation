import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppCommonModule } from "@app/core/app-common.module";
import { SIZE } from "@app/layout/size.constant";
import { CommodityImportModel } from "@app/model/business/commodity-import.model";
import { CommodityModel } from "@app/model/business/commodity.model";
import { WarehouseItemModel } from "@app/model/business/warehouse-item.model";
import { LogModel } from "@app/model/core/log.model";
import { Nullable } from "@app/model/core/nullable.model";
import { BasePage } from "@app/pages/base.page";
import { CommodityService } from "@app/pages/commodity/commodity-mgmt/commodity.service";
import { SelectCommodityDialog } from "@app/pages/commodity/select-commodity--dialog/select-commodity--dialog.component";
import { WarehouseItemService } from "@app/service/warehouse-item.service";
import { AppInlineLogMessage } from "@app/widget/component/inline-log-message/inline-log-message.component";

@Component({
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  imports: [AppCommonModule, AppInlineLogMessage],
})
export class EditDialog extends BasePage {
  dialogData = inject<{
    commodityImport: CommodityImportModel;
    warehouseItem: WarehouseItemModel;
  }>(MAT_DIALOG_DATA);

  logMessage$ = signal<Nullable<LogModel>>(null);
  $dialogRef = inject(MatDialogRef<EditDialog>);

  formGroup = new FormGroup({
    // comId: new FormControl(0, [Validators.required, Validators.min(1)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  // commodityList$ = signal<CommodityModel[]>([]);
  $$selectedCom$ = signal<Nullable<CommodityModel>>(null);

  /// methods
  constructor(
    private $commodityService: CommodityService,
    private $warehouseItemService: WarehouseItemService
  ) {
    super("");
  }

  protected override __ngOnInit__() {}

  openSelectCommodityDialog() {
    const dialogRef = this.$dialog.open<
      SelectCommodityDialog,
      { commodity: Nullable<CommodityModel> },
      Nullable<CommodityModel>
    >(SelectCommodityDialog, {
      data: {
        commodity: this.$$selectedCom$(),
      },
      width: SIZE.DIALOG.width,
      maxHeight: SIZE.DIALOG.height,
    });

    this.registerSubscription(
      dialogRef.afterClosed().subscribe((commodity) => {
        this.$$selectedCom$.set(commodity);
      })
    );
  }

  onConfirm() {
    console.log("on confirm - import items");

    const warehouseItem = this.dialogData.warehouseItem || {};

    warehouseItem.warehouseId = this.dialogData.commodityImport.warehouseId;
    warehouseItem.importId = this.dialogData.commodityImport.importId;

    warehouseItem.comId = this.$$selectedCom$()?.comId || 0;
    warehouseItem.quantity = this.formGroup.value.quantity || -1;

    warehouseItem.createTime = new Date();

    console.log("confirm to sync import entity: ", warehouseItem);

    this.registerSubscription(
      this.$warehouseItemService.sync(warehouseItem).subscribe({
        next: (value) => {
          this.onClose();
        },
        error: (err) => {
          this.logMessage$.set({
            logType: "error",
            message: JSON.stringify(err),
          });
        },
      })
    );
  }

  onClose() {
    console.log("on close dialog - import items");

    this.$dialogRef.close();
  }
}
