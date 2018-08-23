# Cat spotter

A simple ExpressJS app using PostgreSQL.

## SQL

Database name: `cat-spotter`

Remeber to give your db user access to this database.

```
create table cats (id serial primary key, cat_name text not null, spotted_count int not null);
```