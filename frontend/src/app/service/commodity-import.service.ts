import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@app/../environments/environment";
import { CommodityImportModel } from "@app/model/business/commodity-import.model";
import { Page } from "@app/model/core/page.model";
import { IdType } from "@app/model/core/id.model";

@Injectable({
  providedIn: "root",
})
export class CommodityImportService {
  constructor(private $http: HttpClient) {}

  private buildApiUrl(path: string): string {
    return `${environment.LINK.API_BASE_URL}/api/commodity-import${path}`;
  }

  search(dto: {
    warehouseId?: IdType
    importName?: string
  }, pageIndex: number, pageSize: number) {
    return this.$http.post<Page<CommodityImportModel>>(
      this.buildApiUrl(`/search`),
      dto,
      {
        params: {
          pageIndex,
          pageSize,
        },
      }
    );
  }

  sync(commodityImport: CommodityImportModel) {
    return this.$http.post<CommodityImportModel>(
      this.buildApiUrl("/sync"),
      commodityImport
    );
  }

  findById(importId: string | number) {
    return this.$http.get<CommodityImportModel>(
      this.buildApiUrl("/" + importId)
    );
  }
}
