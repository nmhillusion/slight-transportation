package tech.nmhillusion.slight_transportation.domains.shipper.shipper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.nmhillusion.slight_transportation.entity.business.ShipperEntity;

/**
 * created by: minguy1
 * <p>
 * created date: 2025-01-26
 */
public interface ShipperRepository extends JpaRepository<ShipperEntity, Integer> {

    @Query("""
             select s
             from ShipperEntity s
             join ShipperTypeEntity st on s.shipperTypeId = st.typeId
            where 1 = 1
              and (:name is null or lower(s.shipperName) like %:name%)
              and (:deliveryTypeId is null or st.deliveryTypeId = :deliveryTypeId)
            """)
    Page<ShipperEntity> search(String deliveryTypeId, String name, PageRequest pageRequest);

    @Query(" select max(s.shipperId) from ShipperEntity s ")
    long getMaxId();
}
