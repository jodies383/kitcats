# Cat spotter

An ExpressJS app that can add cats to a PostgreSQL database. Once a cat is in the database it keeps a count of when they are spotted.

Create a database called `kitcats`:

```
sudo -u postgres createdb kitcats;
```

## Create a database user

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

## Grant the user access to the database

Grant the `coder` user access to the `kitcats` database by running this command: 

```
grant all privileges on database kitcats to coder;
```

## Create the cats table

Create the `cats` table in the `kitcats` database using the create script below.

```
create table cats (id serial primary key, cat_name text not null, spotted_count int not null);
```

> Remember to give your db user access to this database.

## Access the database

You can access the database from the terminal using this command:

```
psql kitcats
```

Run this sql select query:

```sql
select * from cats;
```

To see all the cats in the database.

Add a new cat like this:

```sql
insert into cats (cat_name, spotted_count) values ('Snowy', 7);
```

You should be able to see the entry for `Snowy` in the web front-end.

