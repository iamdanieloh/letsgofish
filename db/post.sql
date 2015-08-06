drop table if exists posts;
create table posts (
  id serial primary key,
  user_id integer,
  user_post varchar(255),
  photo_url varchar(225)
  );