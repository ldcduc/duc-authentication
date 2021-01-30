const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
const helpers = require('./helpers/data_helper')

app.use(bodyParser.urlencoded({ extended: false })); // more secure
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Middleware example')
    next()
})
app.use(cookieParser())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    cookie = req.cookies
    username = helpers.readUsernameBySession(cookie['sessionId'])
    if (username === undefined) {
      username = "You\'re not logged in"
    }
    res.render('pages/index.ejs', {username})
})

app.get('/signup', (req, res) => {
    res.render('pages/signup.ejs')
})

app.post('/signup', (req, res) => {
    data = helpers.readUserData(req.body['username'])
    if (data === undefined) {
      helpers.register(req.body['username'], req.body['password'])
      res.redirect('/login')
    } else {
      res.send('Username not available')
    }
})

app.get('/login', (req, res) => {
    res.render('pages/login.ejs')
})

app.post('/login', (req, res) => {
    username = req.body['username']
    data = helpers.readUserData(username)
    if (data !== undefined && req.body['password'] === data['password']) {
      let randomNumber = Math.random().toString();
      cookieNumber = randomNumber.substring(2,randomNumber.length);
      helpers.writeSession(cookieNumber, username)
      res.cookie('sessionId', cookieNumber, { maxAge: 900000, httpOnly: true })
      res.redirect('/')
    } else {
      res.send('Invalid username or password')
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
