import { Component, signal } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AppCommonModule } from "@app/core/app-common.module";
import { MainLayoutComponent } from "@app/layout/main-layout/main-layout.component";
import { SIZE } from "@app/layout/size.constant";
import { NoteOwnerDto } from "@app/model/business/note.model";
import {
  RecipientFEModel,
  RecipientModel,
} from "@app/model/business/recipient.model";
import { Page } from "@app/model/core/page.model";
import { BasePage } from "@app/pages/base.page";
import { NoteDialog } from "@app/pages/shared/note/note-dialog/note-dialog.component";
import { RecipientTypeService } from "@app/service/recipient-type.service";
import { RecipientService } from "@app/service/recipient.service";
import { BehaviorSubject } from "rxjs";
import { EditComponent } from "../edit/edit.component";
import { ImportComponent } from "./import/import.component";

@Component({
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  imports: [AppCommonModule, MainLayoutComponent],
})
export class ListComponent extends BasePage {
  pageHandler = this.generatePaginator();

  recipientDataSource = new MatTableDataSource<RecipientFEModel>();

  displayedColumns = [
    "recipientId",
    "fullName",
    "idCardNumber",
    "recipientType",
    ///
    "action",
  ];

  /// methods

  constructor(
    private $recipientService: RecipientService,
    private $recipientTypeService: RecipientTypeService
  ) {
    super("Recipient");
  }

  protected override __ngOnInit__() {
    this.search();
  }

  override search(pageEvent?: PageEvent) {
    if (!pageEvent) {
      pageEvent = {
        pageIndex: this.pageHandler.pageIndex$(),
        pageSize: this.pageHandler.pageSize$(),
        length: this.pageHandler.length$(),
      };
    }

    this.registerSubscription(
      this.$recipientService
        .search(
          {
            name: "",
          },
          pageEvent.pageIndex,
          pageEvent.pageSize
        )
        .subscribe(async (result) => {
          const convertedPageContent = result.content.map((recipient) => {
            const convertedRecipient = recipient as RecipientFEModel;
            convertedRecipient.recipientType$ = signal(null);

            this.registerSubscription(
              this.$recipientTypeService
                .findById(recipient.recipientTypeId || 0)
                .subscribe((recipientType) => {
                  convertedRecipient.recipientType$.set(recipientType);
                })
            );

            return convertedRecipient;
          });
          const convertedResult: Page<RecipientFEModel> = {
            page: result.page,
            content: convertedPageContent,
          };

          this.handlePageDataUpdate(
            convertedResult,
            this.pageHandler,
            this.recipientDataSource
          );
        })
    );
  }

  addRecipient() {
    this.openEditDialog();
  }

  editRecipient(recipient: RecipientModel) {
    this.openEditDialog(recipient);
  }

  private openEditDialog(recipient?: RecipientModel) {
    const ref = this.$dialog.open<EditComponent>(EditComponent, {
      width: SIZE.DIALOG.width,
      maxHeight: SIZE.DIALOG.height,
      data: {
        recipient,
      },
    });

    this.registerSubscription(
      ref.afterClosed().subscribe((result) => {
        this.search();
      })
    );
  }

  importRecipients() {
    const ref_ = this.$dialog.open<ImportComponent>(ImportComponent, {
      width: SIZE.DIALOG.width,
      maxHeight: SIZE.DIALOG.height,
    });

    this.registerSubscription(
      ref_.afterClosed().subscribe((result) => {
        this.search();
      })
    );
  }

  noteRecipient(recipient: RecipientModel) {
    this.showNoteDialog(
      new BehaviorSubject<NoteOwnerDto>({
        recipientId: recipient.recipientId,
      }),
      NoteDialog
    );
  }
}
