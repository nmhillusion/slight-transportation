package tech.nmhillusion.slight_transportation.domains.commodity.commodityExport;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.nmhillusion.slight_transportation.entity.business.CommodityExportEntity;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-21
 */
public interface CommodityExportRepository extends JpaRepository<CommodityExportEntity, Long> {

    @Query("select c from CommodityExportEntity c where c.warehouseId = :warehouseId")
    Page<CommodityExportEntity> search(String warehouseId, PageRequest pageRequest);

}
