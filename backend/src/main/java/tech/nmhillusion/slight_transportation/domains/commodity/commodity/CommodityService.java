package tech.nmhillusion.slight_transportation.domains.commodity.commodity;

import org.springframework.transaction.annotation.Transactional;
import tech.nmhillusion.slight_transportation.annotation.TransactionalService;
import tech.nmhillusion.slight_transportation.entity.business.CommodityEntity;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-07
 */
public interface CommodityService {

    List<CommodityEntity> findAll();

    CommodityEntity sync(CommodityEntity commodityEntity);

    @TransactionalService
    class Impl implements CommodityService {
        private final CommodityRepository repository;

        public Impl(CommodityRepository repository) {
            this.repository = repository;
        }

        @Override
        public List<CommodityEntity> findAll() {
            return repository.findAll();
        }

        @Transactional
        @Override
        public CommodityEntity sync(CommodityEntity commodityEntity) {
            if (null == commodityEntity.getCreateTime()) {
                commodityEntity.setCreateTime(
                        ZonedDateTime.now()
                );
            }

            return repository.save(commodityEntity);
        }
    }

}
