import { Component, inject, model, signal } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeliveryModel } from "@app/model/business/delivery.model";
import { IdType } from "@app/model/core/id.model";
import { LogModel } from "@app/model/core/log.model";
import { Nullable } from "@app/model/core/nullable.model";
import { BasePage } from "@app/pages/base.page";
import { DeliveryService } from "@app/service/delivery.service";
import { AppSelectRecipientWidget } from "../../shared/recipient/app-select-recipient/widget.component";
import { AppCommonModule } from "@app/core/app-common.module";
import { AppInlineLogMessage } from "@app/widget/component/inline-log-message/inline-log-message.component";
import { AppSelectCommodityWidget } from "../../shared/commodity/app-select-commotity/widget.component";
import { BehaviorSubject } from "rxjs";
import { DialogRef } from "@angular/cdk/dialog";

@Component({
  standalone: true,
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  imports: [
    AppCommonModule,
    AppInlineLogMessage,
    AppSelectRecipientWidget,
    AppSelectCommodityWidget,
  ],
})
export class EditComponent extends BasePage {
  dialogData = inject<{
    delivery: DeliveryModel;
  }>(MAT_DIALOG_DATA);

  formGroup = new FormGroup({
    recipientId: new FormControl<Nullable<IdType>>(-1, [Validators.required]),
    commodityId: new FormControl<Nullable<IdType>>(-1, [Validators.required]),
    comQuantity: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  formModels = {
    recipientId: {
      $: new BehaviorSubject<Nullable<IdType>>(-1),
      validators: [Validators.required],
    },
    commodityId: {
      $: new BehaviorSubject<Nullable<IdType>>(-1),
      validators: [Validators.required],
    },
  };

  logMessage$ = signal<Nullable<LogModel>>(null);

  /// methods
  constructor(private $deliveryService: DeliveryService,
    private $dialogRef: DialogRef<DeliveryModel>,
  ) {
    super();
  }

  protected override __ngOnInit__() {
    if (this.dialogData && this.dialogData.delivery) {
      this.formGroup.patchValue(this.dialogData.delivery);
    }

    this.registerSubscription(
      this.formModels.recipientId.$.subscribe((recipientId) => {
        this.formGroup.patchValue({
          recipientId,
        });
      })
    );

    this.registerSubscription(
      this.formModels.commodityId.$.subscribe((commodityId) => {
        this.formGroup.patchValue({
          commodityId,
        });
      })
    );
  }

  save() {
    this.formUtils.revalidateForm(this.formGroup);

    if (!this.formGroup.valid) {
      this.logMessage$.set({
        logType: "error",
        message: "Form is not valid, please check",
      });
      return;
    }

    console.log("do save form...", this.formGroup.value);

    this.registerSubscription(
      this.$deliveryService
        .save({
          commodityId: this.formGroup.value.commodityId!,
          recipientId: this.formGroup.value.recipientId!,
          comQuantity: this.formGroup.value.comQuantity || 0,
        })
        .subscribe({
          next: (result) => {
            this.$dialogRef.close(result);
          },
          error: (error) => {
            this.logMessage$.set({
              logType: "error",
              message: "Error: " + error,
            });
          },
        })
    );
  }
}
