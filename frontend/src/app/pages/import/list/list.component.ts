import {Component, signal} from "@angular/core";
import { AppCommonModule } from "@app/core/app-common.module";
import { MainLayoutComponent } from "@app/layout/main-layout/main-layout.component";
import { BasePage } from "@app/pages/base.page";
import {CommodityImportModel} from "@app/model/business/commodity-import.model";
import {MatTableDataSource} from "@angular/material/table";
import {SIZE} from "@app/layout/size.constant";
import {EditComponent} from "../edit/edit.component";
import {PageEvent} from "@angular/material/paginator";
import {DEFAULT_PAGE_EVENT, PAGE} from "@app/layout/page.constant";
import {CommodityImportService} from "@app/service/commodity-import.service";
import {PaginatorHandler} from "@app/model/core/page.model";

@Component({
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  imports: [
    AppCommonModule,
    MainLayoutComponent
  ]
})
export class ListComponent extends BasePage {
  importDataSource = new MatTableDataSource<CommodityImportModel>();

  pageHandler: PaginatorHandler = {
    length$: signal(0),
    pageSize$: signal(10),
    pageIndex$: signal(0),
    pageSizeOptions$: signal(PAGE.SIZE_OPTIONS),
    onPageChange: this.search.bind(this),
  };

  displayedColumns: string[] = [
    "importId",
    "importName",
    "importTime",
    "warehouse",
    "action"
  ];

  /// Methods

  constructor(private $commodityImportService: CommodityImportService) {
    super("Import");
  }

  protected override __ngOnInit__() {
    this.search();
  }

  private search(pageEvt: PageEvent = DEFAULT_PAGE_EVENT) {
    console.log("search...");

    this.registerSubscription(
      this.$commodityImportService
        .search("", pageEvt.pageIndex, pageEvt.pageSize)
        .subscribe((result) => {
          this.handlePageDataUpdate(
            result,
            this.pageHandler,
            this.importDataSource
          )
        })
    );
  }


  createImport() {
    console.log("create import");

    this.openEditDialog();
  }

  editImport(import_ : CommodityImportModel) {
    console.log("edit import: ", import_);

    this.openEditDialog(import_);
  }

  private openEditDialog(import_?: CommodityImportModel) {
    const ref = this.$dialog.open<EditComponent>(EditComponent, {
      width: SIZE.DIALOG.width,
      maxHeight: SIZE.DIALOG.height,
      data: {
        import_,
      },
    });

    this.registerSubscription(
      ref.afterClosed().subscribe((result) => {
        this.search();
      })
    );
  }
}
