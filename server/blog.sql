drop table if exists comment;
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
  image_name varchar(100),
  saved timestamp default current_timestamp,
  account_id int not null,
    constraint fk_account
      foreign key(account_id)
        references account(id)
);

create table comment (
  id serial primary key,
  comment_text text not null,
  saved timestamp default current_timestamp,
  post_id int not null,
    constraint fk_post
      foreign key (post_id)
        references post(id),
  account_id int not null,
    constraint fk_account
      foreign key (account_id)
        references account(id)
)