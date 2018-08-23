# Cat spotter

A simple ExpressJS app using PostgreSQL.


Create a database called `cat-spotter`:

```
sudo -u postgres createdb spotter;
```

You should already have a `coder` user.

If not do this:

```
sudo -u postgres createuser coder -P;
```

Enter the password `pg123` when prompted after executing the `createuser` command. 

Now run *psql* as the *postgres* user:

```
sudo -u postgres psql;
```

Grant the `coder` user access to the `my_products` database by running this command: 

```
grant all privileges on database cat-spotter to coder;
```

## SQL

Database name: `cat-spotter`

Remeber to give your db user access to this database.

```
create table cats (id serial primary key, cat_name text not null, spotted_count int not null);
```
