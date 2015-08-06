drop table if exists users;
create table users (
  id serial primary key,
  user_name varchar(255),
  email_address varchar(255),
  password_hash varchar(255)
  );