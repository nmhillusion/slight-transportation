import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@app/../environments/environment";
import { WarehouseModel } from "@app/model/business/warehouse.model";

@Injectable({
  providedIn: "root",
})
export class WarehouseService {
  constructor(private $http: HttpClient) {}

  buildApiUrl(path: string): string {
    return `${environment.LINK.API_BASE_URL}/api/warehouse${path}`;
  }

  findAll() {
    return this.$http.get<WarehouseModel[]>(this.buildApiUrl("/find-all"));
  }

  sync(warehouse: WarehouseModel) {
    return this.$http.post<WarehouseModel>(
      this.buildApiUrl("/sync"),
      warehouse
    );
  }

  findById(warehouseId: number) {
    return this.$http.get<WarehouseModel>(this.buildApiUrl(`/${warehouseId}`));
  }

  importExcel(excelFile: File) {
    const submitForm = new FormData();
    submitForm.append("excelFile", new Blob([excelFile]));

    return this.$http.post<WarehouseModel[]>(
      this.buildApiUrl("/import/excel"),
      submitForm
    );
  }
}
