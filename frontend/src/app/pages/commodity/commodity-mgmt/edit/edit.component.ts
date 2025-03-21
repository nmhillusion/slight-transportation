import { DialogRef } from "@angular/cdk/dialog";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppCommonModule } from "@app/core/app-common.module";
import { CommodityTypeModel } from "@app/model/business/commodity-type.model";
import { CommodityModel } from "@app/model/business/commodity.model";
import { LogModel } from "@app/model/core/log.model";
import { Nullable } from "@app/model/core/nullable.model";
import { BasePage } from "@app/pages/base.page";
import { CommodityTypeService } from "@app/service/commodity-type.service";
import { CommodityService } from "../commodity.service";
import { SelectCommodityTypeDialog } from "../../select-commodity-type--dialog/select-commodity-type--dialog.component";
import { SIZE } from "@app/layout/size.constant";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  imports: [AppCommonModule],
})
export class EditComponent extends BasePage {
  loading$ = signal(false);
  logMessage$: WritableSignal<Nullable<LogModel>> = signal(null);

  data: {
    commodity: CommodityModel;
  } = inject(MAT_DIALOG_DATA);

  formGroup: FormGroup = new FormGroup({
    comName: new FormControl("", [Validators.required]),
  });

  selectedCommodityType$ = signal<Nullable<CommodityTypeModel>>(null);

  /// METHODS

  constructor(
    private $dialogRef: DialogRef<CommodityModel>,
    private $commodityTypeService: CommodityTypeService,
    private $commodityService: CommodityService
  ) {
    super("Edit Commodity");
  }

  protected override __ngOnInit__() {
    this.formGroup.patchValue(this.data.commodity);

    if (this.data.commodity && this.data.commodity.comTypeId) {
      this.registerSubscription(
        this.$commodityTypeService
          .findById(this.data.commodity.comTypeId)
          .subscribe((result) => {
            this.selectedCommodityType$.set(result);
          })
      );
    }
  }

  openDialogSelectCommodityType() {
    const dialogRef = this.$dialog.open<
      SelectCommodityTypeDialog,
      {
        commodityType: Nullable<CommodityTypeModel>;
      },
      Nullable<CommodityTypeModel>
    >(SelectCommodityTypeDialog, {
      data: {
        commodityType: this.selectedCommodityType$(),
      },
      width: SIZE.DIALOG.width,
      maxHeight: SIZE.DIALOG.height,
    });

    this.registerSubscription(
      dialogRef.afterClosed().subscribe((result) => {
        console.log("Has selected on ", result);

        if (result) {
          this.selectedCommodityType$.set(result);
        }
      })
    );
  }

  cancel() {
    this.$dialogRef.close();
  }

  save() {
    console.log("do save form...", this.formGroup.value);

    if (!this.data) {
      this.data = {
        commodity: {},
      };
    }

    if (!this.data.commodity) {
      this.data.commodity = {};
    }

    this.data.commodity.comName = this.formGroup.value.comName;
    this.data.commodity.comTypeId = this.selectedCommodityType$()?.typeId;

    this.registerSubscription(
      this.$commodityService.sync(this.data.commodity).subscribe((result) => {
        this.$dialogRef.close(result);
      })
    );
  }
}
