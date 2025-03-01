package tech.nmhillusion.slight_transportation.domains.delivery.deliveryAttempt;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import tech.nmhillusion.n2mix.exception.NotFoundException;
import tech.nmhillusion.slight_transportation.entity.business.DeliveryAttemptEntity;
import tech.nmhillusion.slight_transportation.entity.business.DeliveryStatusEntity;

import java.util.List;
import java.util.Map;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2025-02-03
 */

@RestController
@RequestMapping("/api/delivery-attempt")
public class DeliveryAttemptController {
    private final DeliveryAttemptService deliveryAttemptService;

    public DeliveryAttemptController(DeliveryAttemptService deliveryAttemptService) {
        this.deliveryAttemptService = deliveryAttemptService;
    }

    @PostMapping(value = "/{deliveryId}/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<DeliveryAttemptEntity> search(@PathVariable String deliveryId,
                                              @RequestBody Map<String, ?> dto,
                                              @RequestParam int pageIndex,
                                              @RequestParam int pageSize) {
        return deliveryAttemptService.search(deliveryId, dto, pageIndex, pageSize);
    }

    @GetMapping(value = "/{attemptId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public DeliveryAttemptEntity findById(@PathVariable String attemptId) {
        return deliveryAttemptService.findById(attemptId);
    }

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public DeliveryAttemptEntity save(@RequestBody DeliveryAttemptEntity deliveryAttemptEntity) {
        return deliveryAttemptService.save(deliveryAttemptEntity);
    }

    @DeleteMapping(value = "/{attemptId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteById(@PathVariable String attemptId) {
        deliveryAttemptService.deleteById(attemptId);
    }

    @PostMapping(value = "/{attemptId}/process", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public DeliveryAttemptEntity process(@PathVariable @NotBlank String attemptId,
                                         @RequestBody @Valid ProcessAttemptDto processAttemptDto) throws NotFoundException {
        return deliveryAttemptService.process(attemptId, processAttemptDto);
    }

    @GetMapping(value = "/{attemptId}/available-status-for-process", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DeliveryStatusEntity> getAvailableStatusForProcess(@PathVariable @NotBlank String attemptId) {
        return deliveryAttemptService.getAvailableStatusForProcess(attemptId);
    }
}
