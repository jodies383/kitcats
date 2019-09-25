# Cat spotter

A simple ExpressJS app using PostgreSQL that add cats that can then the counted when spotted.

Create a database called `cat_spotter`:

```
sudo -u postgres createdb cat_spotter;
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

Grant the `coder` user access to the `cat_spotter` database by running this command: 

```
grant all privileges on database cat_spotter to coder;
```

## SQL

Database name: `cat_spotter`

Remember to give your db user access to this database.

Create the `cats` table in the `cat_spotter` database using the create script below.

```
create table cats (id serial primary key, cat_name text not null, spotted_count int not null);
```
