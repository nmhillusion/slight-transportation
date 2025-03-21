package tech.nmhillusion.slight_transportation.entity.business;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import tech.nmhillusion.n2mix.type.Stringeable;

/**
 * created by: minguy1
 * <p>
 * created date: 2025-01-26
 */
@Entity
@Table(name = "t_cx_shipper")
public class ShipperEntity extends Stringeable {
    @Id
    @Column(name = "shipper_id", nullable = false)
    private String shipperId;
    @Column(name = "shipper_type_id", nullable = false)
    private String shipperTypeId;
    @Column(name = "shipper_code", nullable = false)
    private String shipperCode;
    @Column(name = "shipper_name", nullable = false)
    private String shipperName;

    public String getShipperId() {
        return shipperId;
    }

    public ShipperEntity setShipperId(String shipperId) {
        this.shipperId = shipperId;
        return this;
    }

    public String getShipperTypeId() {
        return shipperTypeId;
    }

    public ShipperEntity setShipperTypeId(String shipperTypeId) {
        this.shipperTypeId = shipperTypeId;
        return this;
    }

    public String getShipperCode() {
        return shipperCode;
    }

    public ShipperEntity setShipperCode(String shipperCode) {
        this.shipperCode = shipperCode;
        return this;
    }

    public String getShipperName() {
        return shipperName;
    }

    public ShipperEntity setShipperName(String shipperName) {
        this.shipperName = shipperName;
        return this;
    }

    public enum ID {
        SHIPPER_ID
    }
}
