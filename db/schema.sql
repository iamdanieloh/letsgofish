drop table if exists users;
create table users (
  id serial primary key,
  email_address varchar(255),
  password_hash varchar(255)
  );