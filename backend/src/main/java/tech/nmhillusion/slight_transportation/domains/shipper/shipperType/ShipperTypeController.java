package tech.nmhillusion.slight_transportation.domains.shipper.shipperType;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.nmhillusion.slight_transportation.entity.business.ShipperTypeEntity;

import java.util.List;

/**
 * created by: chubb
 * <p>
 * created date: 2024-11-30
 */

@RestController
@RequestMapping(value = "/api/shipper-type")
public class ShipperTypeController {

    private final ShipperTypeService shipperTypeService;

    public ShipperTypeController(ShipperTypeService shipperTypeService) {
        this.shipperTypeService = shipperTypeService;
    }

    @GetMapping(value = "/find-all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ShipperTypeEntity> findAll() {
        return shipperTypeService.findAll();
    }

}