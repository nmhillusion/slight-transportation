package tech.nmhillusion.slight_transportation.entity.business;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import tech.nmhillusion.n2mix.type.Stringeable;

import java.time.ZonedDateTime;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-11-16
 */
@Entity
@Table(name = "t_cx_delivery")
public class DeliveryEntity extends Stringeable {
    @Id
    @Column(name = "delivery_id", nullable = false)
    private String deliveryId;

    @Column(name = "recipient_id", nullable = false)
    private String recipientId;

    @Column(name = "commodity_id", nullable = false)
    private String commodityId;

    @Column(name = "com_quantity", nullable = false)
    private double comQuantity;

    @Column(name = "start_time")
    private ZonedDateTime startTime;

    @Column(name = "end_time")
    private ZonedDateTime endTime;

    @Column(name = "current_attempt_id")
    private String currentAttemptId;

    @Column(name = "delivery_status_id", nullable = false)
    private String deliveryStatusId;

    public String getDeliveryId() {
        return deliveryId;
    }

    public DeliveryEntity setDeliveryId(String deliveryId) {
        this.deliveryId = deliveryId;
        return this;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public DeliveryEntity setRecipientId(String recipientId) {
        this.recipientId = recipientId;
        return this;
    }

    public String getCommodityId() {
        return commodityId;
    }

    public DeliveryEntity setCommodityId(String commodityId) {
        this.commodityId = commodityId;
        return this;
    }

    public double getComQuantity() {
        return comQuantity;
    }

    public DeliveryEntity setComQuantity(double comQuantity) {
        this.comQuantity = comQuantity;
        return this;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public DeliveryEntity setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public DeliveryEntity setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public String getCurrentAttemptId() {
        return currentAttemptId;
    }

    public DeliveryEntity setCurrentAttemptId(String currentAttemptId) {
        this.currentAttemptId = currentAttemptId;
        return this;
    }

    public String getDeliveryStatusId() {
        return deliveryStatusId;
    }

    public DeliveryEntity setDeliveryStatusId(String deliveryStatusId) {
        this.deliveryStatusId = deliveryStatusId;
        return this;
    }

    public enum ID {
        DELIVERY_ID
    }
}
