package tech.nmhillusion.slight_transportation.domains.commodity.commodityExport;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import tech.nmhillusion.n2mix.util.StringUtil;
import tech.nmhillusion.slight_transportation.annotation.TransactionalService;
import tech.nmhillusion.slight_transportation.constant.IdConstant;
import tech.nmhillusion.slight_transportation.domains.sequence.SequenceService;
import tech.nmhillusion.slight_transportation.entity.business.CommodityExportEntity;

import java.util.Map;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-21
 */
public interface CommodityExportService {
    Page<CommodityExportEntity> search(Map<String, ?> dto, int pageIndex, int pageSize);

    CommodityExportEntity findById(long exportId);

    void deleteById(long exportId);

    CommodityExportEntity save(CommodityExportEntity commodityExportEntity);

    @TransactionalService
    class Impl implements CommodityExportService {
        private final CommodityExportRepository repository;
        private final SequenceService sequenceService;

        public Impl(CommodityExportRepository repository, SequenceService sequenceService) {
            this.repository = repository;
            this.sequenceService = sequenceService;
        }


        @Override
        public Page<CommodityExportEntity> search(Map<String, ?> dto, int pageIndex, int pageSize) {
            final String warehouseId = StringUtil.trimWithNull(dto.get("warehouseId"));

            return repository.search(warehouseId, PageRequest.of(pageIndex, pageSize));
        }

        @Override
        public CommodityExportEntity findById(long exportId) {
            return repository.findById(exportId).orElse(null);
        }

        @Override
        public void deleteById(long exportId) {
            repository.deleteById(exportId);
        }

        @Override
        public CommodityExportEntity save(CommodityExportEntity commodityExportEntity) {

            if (IdConstant.MIN_ID > commodityExportEntity.getExportId()) {
                commodityExportEntity.setExportId(
                        sequenceService.nextValue(
                                sequenceService.generateSeqNameForClass(
                                        getClass()
                                        , CommodityExportEntity.ID.EXPORT_ID.name()
                                )
                        )
                );
            }

            return repository.save(commodityExportEntity);
        }
    }
}
