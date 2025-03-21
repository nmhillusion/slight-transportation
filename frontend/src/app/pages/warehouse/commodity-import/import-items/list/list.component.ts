import { Component, signal } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AppCommonModule } from "@app/core/app-common.module";
import { MainLayoutComponent } from "@app/layout/main-layout/main-layout.component";
import { PAGE } from "@app/layout/page.constant";
import { SIZE } from "@app/layout/size.constant";
import {
  WarehouseItemFEModel,
  WarehouseItemModel,
} from "@app/model/business/warehouse-item.model";
import { Nullable } from "@app/model/core/nullable.model";
import { mapPage } from "@app/model/core/page.model";
import { BasePage } from "@app/pages/base.page";
import { CommodityImportService } from "@app/service/commodity-import.service";
import { WarehouseItemService } from "@app/service/warehouse-item.service";
import { EditDialog } from "../edit/edit.component";
import { CommodityImportModel } from "@app/model/business/commodity-import.model";

@Component({
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  imports: [AppCommonModule, MainLayoutComponent],
})
export class ListComponent extends BasePage {
  private commodityImportId: string = "";
  commodityImport$ = signal<Nullable<CommodityImportModel>>(null);

  tableDatasource = new MatTableDataSource<WarehouseItemFEModel>();

  paginator = this.generatePaginator();

  displayedColumns = [
    "itemId",
    "importId",
    "warehouse",
    "commodity",
    "quantity",
    "createTime",
  ];

  /// methods
  constructor(
    private $commodityImportService: CommodityImportService,
    private $warehouseItemService: WarehouseItemService
  ) {
    super("Import Items");
  }

  protected override __ngOnInit__() {
    this.commodityImportId =
      this.$activatedRoute.snapshot.paramMap.get("commodityImportId") || "";

    this.registerSubscription(
      this.$commodityImportService
        .findById(this.commodityImportId)
        .subscribe((commodityImport) => {
          this.commodityImport$.set(commodityImport);
        })
    );

    this.search(PAGE.DEFAULT_PAGE_EVENT);
  }

  override search(pageEvt: PageEvent) {
    this.registerSubscription(
      this.$warehouseItemService
        .searchItemsInImport(
          this.commodityImportId,
          pageEvt.pageIndex,
          pageEvt.pageSize,
          {
            name: "",
          }
        )
        .subscribe((resultPage) => {
          console.log("result of search items in import: ", resultPage);

          this.handlePageDataUpdate<WarehouseItemFEModel>(
            mapPage(resultPage, (it) =>
              this.$warehouseItemService.convertToWarehouseItemFE(it, this)
            ),
            this.paginator,
            this.tableDatasource
          );
        })
    );
  }

  private openEditDialog(warehouseItem?: WarehouseItemModel) {
    const dialogRef = this.$dialog.open(EditDialog, {
      data: {
        commodityImport: this.commodityImport$(),
        warehouseItem,
      },
      width: SIZE.DIALOG.width,
      maxHeight: SIZE.DIALOG.height,
    });

    this.registerSubscription(
      dialogRef.afterClosed().subscribe((r) => {
        this.search(PAGE.DEFAULT_PAGE_EVENT);
      })
    );
  }

  addImportItems() {
    this.openEditDialog();
  }

  editImportItems(warehouseItem: WarehouseItemModel) {
    this.openEditDialog(warehouseItem);
  }
}
