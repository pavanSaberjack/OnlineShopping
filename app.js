const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');
const expressHbs = require('express-handlebars');

const app = express();

app.set('view engine', 'ejs');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { docTitle: "Page Not found!" });
});

app.listen(3000);