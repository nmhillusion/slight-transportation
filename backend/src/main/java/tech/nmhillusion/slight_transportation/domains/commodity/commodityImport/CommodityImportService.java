package tech.nmhillusion.slight_transportation.domains.commodity.commodityImport;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import tech.nmhillusion.n2mix.helper.log.LogHelper;
import tech.nmhillusion.n2mix.util.StringUtil;
import tech.nmhillusion.slight_transportation.annotation.TransactionalService;
import tech.nmhillusion.slight_transportation.entity.business.CommodityImportEntity;

import java.util.Map;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-14
 */
public interface CommodityImportService {
    Page<CommodityImportEntity> search(Map<String, ?> dto, int pageIndex, int pageSize);

    CommodityImportEntity sync(CommodityImportEntity dto);

    CommodityImportEntity findById(long id);

    void deleteById(long id);

    @TransactionalService
    class Impl implements CommodityImportService {
        private final CommodityImportRepository repository;

        public Impl(CommodityImportRepository repository) {
            this.repository = repository;
        }

        @Override
        public Page<CommodityImportEntity> search(Map<String, ?> dto, int pageIndex, int pageSize) {
            final String importName = StringUtil.trimWithNull(dto.get("importName"));
            return repository.search(importName, PageRequest.of(pageIndex, pageSize));
        }

        @Override
        public CommodityImportEntity sync(CommodityImportEntity dto) {
            final CommodityImportEntity savedEntity = repository.save(dto);

            LogHelper.getLogger(this).info("savedEntity: {}", savedEntity);

            return savedEntity;
        }

        @Override
        public CommodityImportEntity findById(long id) {
            return repository.findById(id).orElse(null);
        }

        @Override
        public void deleteById(long id) {
            repository.deleteById(id);
        }
    }
}
