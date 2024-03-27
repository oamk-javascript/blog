


create table account (
  id serial primary key,
  email varchar(100) unique not null,
  password varchar(255) not null
);

create table post (
  id serial primary key,
  message text not null
);


insert into account (email,password) values ('admin@foo.com','admin123');

insert into post (message) values ('My test message');
insert into post (message) values ('My another test message');
