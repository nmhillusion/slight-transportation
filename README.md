
# DESIGN

`Commodity`

`Warehouse`

`WarehouseItem`: Từng nhóm vật phẩm trong kho (cùng loại commodity với số lượng nhất định)

`CommodityImport`: Từng đợt nhập hàng vào kho hàng, mỗi đợt nhập hàng sẽ tạo ra 1 `WarehouseItem` khác nhau

`CommodityExport`: Từng đợt xuất hàng từ kho hàng

`WarehouseExportItem`: Từng item trong đợt xuat, cùng 1 loại commodity với số lượng nhất định.

---

`Delivery`

`DeliveryPackage`: từng gói hàng dùng trong delivery

`DeliveryPackageItem`: item trong gói hàng dùng, của cùng 1 loại commodity

`DeliveryAttempt`: Từng lần cố gắng giao hàng tới người nhận
