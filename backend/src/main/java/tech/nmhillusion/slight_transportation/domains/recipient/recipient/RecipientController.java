package tech.nmhillusion.slight_transportation.domains.recipient.recipient;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.nmhillusion.slight_transportation.entity.business.RecipientEntity;

import java.util.List;
import java.util.Map;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-12-09
 */

@RestController
@RequestMapping("/api/recipient")
public class RecipientController {

    private final RecipientService service;

    public RecipientController(RecipientService service) {
        this.service = service;
    }

    @PostMapping(value = "/sync", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public RecipientEntity sync(@RequestBody RecipientEntity recipientEntity) {
        return service.sync(recipientEntity);
    }

    @PostMapping(value = "/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<RecipientEntity> search(@RequestBody Map<String, ?> dto, @RequestParam int pageIndex, @RequestParam int pageSize) {
        return service.search(dto, pageIndex, pageSize);
    }

    @PostMapping(value = "/import/excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<RecipientEntity> importExcelFile(@RequestPart MultipartFile excelFile) {
        return service.importExcelFile(excelFile);
    }

    @GetMapping(value = "/{recipientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public RecipientEntity findById(@PathVariable String recipientId) {
        return service.findById(recipientId);
    }

}
