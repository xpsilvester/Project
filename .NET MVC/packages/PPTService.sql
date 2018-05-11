use PPTService;

CREATE TABLE PPTItem
(
id int not null identity(1,1),
classId int not null ,
title varchar(255) NOT NULL,
author varchar(40)not null,
validDate datetime not null,
description varchar(200) not null,
pptSrc varchar(50) not null,
thumbnailSrc varchar(60)not null,
visible bit not null,
updateDate datetime not null,
updateUser varchar(40) not null,
PRIMARY KEY (id)
)

CREATE TABLE PPTClass
(
id int not null,
className varchar(50) not null,
classTip varchar(50) not null,
classLevel smallint not null,
isLastLevel bit not null,
parentClassId int not null,
PRIMARY KEY (id)
)

insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (1,'行业案例','industrycase',1,'false',0);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (2,'通用资源','recources',1,'false',0);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (3,'产品PPT','proppt',1,'false',0);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (4,'其他','other',2,'true',0);

insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (5,'酒店','hotel',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (6,'企业','enterprise',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (7,'工厂','factory',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (8,'医院','hospital',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (9,'别墅','villas',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (10,'商场','mall',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (11,'学校','school',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (12,'网吧','netbar',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (13,'农村','village',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (14,'小区','areas',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (15,'公园','park',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (16,'景区','scenic',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (17,'出租屋','lethouse',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (18,'远距离无线','longdistancewireless',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (19,'视频监控','camerassurveillance',2,'true',1);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (20,'酒吧','bars',2,'true',1);

insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (21,'公司介绍','enterpriseintro',2,'true',2);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (22,'产品介绍','productintro',2,'true',2);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (23,'经典案例介绍','casesintro',2,'true',2);

insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (24,'无线路由器','wirelessrouter',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (25,'企业无线','enterprisewireless',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (26,'交换机','switch',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (27,'安防监控','security',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (28,'无线扩展器','expander',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (29,'电力线产品','powerline',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (30,'路由器','router',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (31,'综合布线','cabling',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (32,'网卡','network',2,'true',3);
insert into PPTClass(id,className,classTip,classLevel,isLastLevel,parentClassId) values (33,'其他','other',2,'true',3);