package tech.nmhillusion.slight_transportation.domains.warehouse.warehouseItem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.nmhillusion.slight_transportation.entity.business.WarehouseItemEntity;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-15
 */
public interface WarehouseItemRepository extends JpaRepository<WarehouseItemEntity, String> {

    @Query("""
            select w
                from WarehouseItemEntity w
                where w.warehouseId = :warehouseId
                and (:from is null or w.createTime >= :from)
                and (:to is null or w.createTime <= :to)
            """)
    Page<WarehouseItemEntity> searchItemsInWarehouse(String warehouseId, ZonedDateTime from, ZonedDateTime to, PageRequest pageRequest);

    @Query("""
                select w
                from WarehouseItemEntity w
                where w.importId = :importId
                and (:from is null or w.createTime >= :from)
                and (:to is null or w.createTime <= :to)
            """)
    Page<WarehouseItemEntity> searchItemsInImport(String importId, ZonedDateTime from, ZonedDateTime to, PageRequest pageRequest);

    @Query("select max(w.itemId) from WarehouseItemEntity w")
    long getMaxId();

    @Query(" select w from WarehouseItemEntity w where w.warehouseId = :warehouseId and w.comId = :commodityId and w.usedQuantity < w.quantity ")
    List<WarehouseItemEntity> getAvailableItemsInWarehouse(String warehouseId, String commodityId);
}
