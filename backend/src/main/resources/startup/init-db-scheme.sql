
create table if not exists t_cx_customer (
  customer_id int primary key,
  full_name nvarchar(200),
  id_card_number nvarchar(30)
);

create table if not exists t_cx_commodity_type (
  type_id int primary key,
  type_name nvarchar(100)
);

----

create table if not exists t_cx_commodity (
  com_id int primary key,
  com_name nvarchar(200),
  com_type_id int
);

alter table t_cx_commodity
add constraint fk_cx_commodity__com_type_id
foreign key (com_type_id)
REFERENCES t_cx_commodity_type(type_id);

----

create table if not exists t_cx_delivery_type (
  type_id int primary key,
  type_name nvarchar(100)
);

create table if not exists t_cx_delivery_status (
  status_id int primary key,
  status_name nvarchar(100)
);


create table if not exists t_cx_delivery (
  delivery_id varchar(200) primary key,
  customer_id int,
  commodity_id int,
  com_quantity NUMERIC,
  start_time TIMESTAMP with time zone,
  end_time TIMESTAMP with time zone,
  current_attempt_id varchar(100),
  delivery_status_id int
);

----

create table if not exists t_cx_shipper_type (
  type_id int primary key,
  type_name nvarchar(100)
);

create table if not exists t_cx_shipper (
  shipper_id int primary key,
  shipper_type_id int,
  shipper_code varchar(100),
  shipper_name nvarchar(100)
);

alter table t_cx_shipper
add constraint fk_cx_shipper
foreign key (shipper_type_id)
references t_cx_shipper_type (type_id);

----
create table if not exists t_cx_delivery_attempt (
  attempt_id varchar(100) primary key,
  delivery_id int,
  delivery_type_id int,
  shipper_id varchar(100),
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  delivery_status_id int
);

alter table t_cx_delivery_attempt
add constraint fk_cx_delivery_attempt__delivery_type_id
foreign key (delivery_type_id)
REFERENCES t_cx_delivery_type (type_id);

alter table t_cx_delivery_attempt
add constraint fk_cx_delivery_attempt__delivery_status_id
foreign key (delivery_status_id)
REFERENCES t_cx_delivery_status (status_id);

alter table t_cx_delivery_attempt
add constraint fk_cx_delivery_attempt__delivery_id
foreign key (delivery_id)
REFERENCES t_cx_delivery (delivery_id);

alter table t_cx_delivery_attempt
add constraint fk_cx_delivery_attempt__shipper_id
foreign key (shipper_id)
references t_cx_shipper (shipper_id);

----

alter table t_cx_delivery
add constraint fk_cx_delivery__customer_id
foreign key (customer_id)
REFERENCES t_cx_customer (customer_id);

alter table t_cx_delivery
add constraint fk_cx_delivery__commodity_id
foreign key (commodity_id)
REFERENCES t_cx_commodity (com_id);

alter table t_cx_delivery
add constraint fk_cx_delivery__current_attempt_id
foreign key (current_attempt_id)
REFERENCES t_cx_delivery_attempt (attempt_id);

alter table t_cx_delivery
add constraint fk_cx_delivery__delivery_status_id
foreign key (delivery_status_id)
REFERENCES t_cx_delivery_status (status_id);

----

create table t_cx_commodity_import (
  import_id int primary key,
  import_time timestamp with time zone
);

create table t_cx_commodity_import_item (
  item_id varchar(100) primary key,
  import_id int,
  commodity_id int,
  quantity numeric
);

alter table t_cx_commodity_import_item
add constraint fk_cx_commodity_import_item__import_id
foreign key (import_id)
references t_cx_commodity_import (import_id);

alter table t_cx_commodity_import_item
add constraint fk_cx_commodity_import_item__commodity_id
foreign key (commodity_id)
references t_cx_commodity (com_id);

----

create table t_cx_note (
  note_id int primary key,
  note_content text,
  note_time timestamp with time zone,
  customer_id int,
  delivery_id varchar(100),
  delivery_attempt_id varchar(100),
  import_id int,
  import_item_id varchar(100)
);

alter table t_cx_note
add constraint fk_cx_note__customer_id
foreign key (customer_id)
references t_cx_customer (customer_id)
;

alter table t_cx_note
add constraint fk_cx_note__delivery_id
foreign key (delivery_id)
references t_cx_delivery (delivery_id)
;

alter table t_cx_note
add constraint fk_cx_note__delivery_attempt_id
foreign key (delivery_attempt_id)
references t_cx_delivery_attempt (attempt_id)
;

alter table t_cx_note
add constraint fk_cx_note__import_id
foreign key (import_id)
references t_cx_commodity_import (import_id)
;

alter table t_cx_note
add constraint fk_cx_note__import_item_id
foreign key (import_item_id)
references t_cx_commodity_import_item (item_id)
;