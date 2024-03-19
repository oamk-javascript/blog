
create table post (
  id serial primary key,
  message text not null
);


insert into post (message) values ('My test message');
insert into post (message) values ('My another test message');
