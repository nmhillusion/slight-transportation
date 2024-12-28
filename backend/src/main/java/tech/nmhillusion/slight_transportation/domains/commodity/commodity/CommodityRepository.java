package tech.nmhillusion.slight_transportation.domains.commodity.commodity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.nmhillusion.slight_transportation.entity.business.CommodityEntity;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-07
 */
public interface CommodityRepository extends JpaRepository<CommodityEntity, Long> {

    @Query("select max(t.comId) from CommodityEntity t")
    long getMaxId();

}
