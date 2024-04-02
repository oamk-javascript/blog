drop table if exists post;
drop table if exists account;

create table account (
  id serial primary key,
  email varchar(100) unique not null,
  password varchar(255) not null
);

create table post (
  id serial primary key,
  title varchar(100) not null,
  message text not null,
  saved timestamp default current_timestamp,
  account_id int,
    constraint fk_account
      foreign key(account_id)
        references account(id)
);