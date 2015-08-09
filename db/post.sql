drop table if exists post;
create table post (
  id serial primary key,
  user_id integer,
  tag varchar(255),
  user_post varchar(255),
  photo_url varchar(225)
  );