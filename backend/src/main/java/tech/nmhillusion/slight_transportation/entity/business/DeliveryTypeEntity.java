package tech.nmhillusion.slight_transportation.entity.business;

import tech.nmhillusion.n2mix.type.Stringeable;

/**
 * created by: chubb
 * <p>
 * created date: 2024-11-16
 */
public class DeliveryTypeEntity extends Stringeable {
    private String typeId;
    private String typeName;

    public String getTypeId() {
        return typeId;
    }

    public DeliveryTypeEntity setTypeId(String typeId) {
        this.typeId = typeId;
        return this;
    }

    public String getTypeName() {
        return typeName;
    }

    public DeliveryTypeEntity setTypeName(String typeName) {
        this.typeName = typeName;
        return this;
    }
}
