const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'coder:pg123@postgresql://localhost:5432/cat_spotter';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const app = express();
app.use(session({
    secret: 'keyboard cat5 run all 0v3r',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/add', function(req, res) {
    res.render('add');
})

app.post('/add', async function(req, res) {
    let catName = req.body.cat_name;
    if (catName && catName !== '') {
        await pool.query('insert into cats (cat_name, spotted_count) values ($1, $2)' , [catName, 1]);    
    }

    res.redirect('/');
});

app.post('/spotted/:cat_id', async function(req, res) {
    let catId = req.params.cat_id;

    // get the current spottedCount from the database
    let results = await pool.query('select spotted_count from cats where id = $1', [catId]);
    let cat = results.rows[0];
    let spottedCount = cat.spotted_count;
    spottedCount++;
    
    // put the updated value back into the db
    await pool.query('update cats set spotted_count = $1 where id = $2', 
        [spottedCount, catId]);

    res.redirect('/');
});

app.get('/', async function (req, res) {

    let results = await pool.query('select * from cats order by spotted_count desc');    
    let cats = results.rows;
    res.render('home', { cats });
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log("started on: ", this.address().port);
});