//dependencies links
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//controller links
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//database
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123qzwxecrvtb!@#',
    database : 'detectface'
  }
});

//main
const app = express();
app.use(bodyParser.json());
app.use(cors());

//root
app.get('/', (req, res) => {res.send('it is working')});
//signin
app.post('/signIn', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
//register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
//profile  
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});  
//image
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
//api call
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
//port
app.listen(process.env.PORT, () => {
	console.log(`app is running on port ${process.env.PORT}`);
}) 
