const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoute = require('./routes/auth');

const mongodbStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/sessionauth'

mongoose.connect(mongoURI , {useNewUrlParser : true , useCreateIndex : true , useUnifiedTopology : true}).then(console.log("connected"));

const store = new mongodbStore({
    uri : mongoURI,
    collection : "session"
});

app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    store : store,
    cookie : {
        maxAge : 20 * 60 * 6000 
    }
}))

app.use(cookieParser());
app.use(cors({
    credentials : true,
    origin : ["http://localhost:3000"],
    methods : ['GET','POST']
}));
app.use(bodyparser.json());
app.use('/api',authRoute);
app.listen(8000);