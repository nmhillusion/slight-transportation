package tech.nmhillusion.slight_transportation.domains.commodity.commodityExport.exportItem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.nmhillusion.slight_transportation.entity.business.WarehouseExportItemEntity;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-21
 */
public interface WarehouseExportItemRepository extends JpaRepository<WarehouseExportItemEntity, String> {

    @Query("select e from WarehouseExportItemEntity e where e.exportId = :exportId")
    Page<WarehouseExportItemEntity> search(long exportId, PageRequest pageRequest);

}
