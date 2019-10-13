const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const booking = require('./routes/booking');
const user = require('./routes/user');
const bus = require('./routes/bus');
const cors = require('cors');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect("mongodb://localhost/bus_reserve", {useNewUrlParser: true,useUnifiedTopology: true});

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use('/book',booking);
app.use('/user',passport.authenticate('jwt', {session: false}), user);
app.use('/bus',bus);





app.listen(3002,'127.0.0.1', () => {
    console.log("Server started");
})