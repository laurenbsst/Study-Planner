const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')
const { json } = require('express/lib/response')

function $(x) {return document.getElementById(x);} 

app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/index.html")
})

app.get('/signUp', (req, res) => {
    res.sendFile(__dirname + '/static/signUp.html')
})

app.post('/signUp', (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    res.setHeader('Content-type','text/html')
    //res.send(req.body)
    
    var loginDetails = Date.now()
    loginDetails += '.txt'

    fs.appendFile(loginDetails, JSON.stringify(req.body), function(err){
        if (err) throw err;
        console.log('Data Saved')
    })
    res.redirect('/dashboard')
    //res.send('Data Received and Saved')
})

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/static/dashboard.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html')
})

app.get('/calendar', (req, res) => {
    res.sendFile(__dirname + '/static/calendar.html')
})

app.get('/account-settings', (req, res) => {
    res.sendFile(__dirname + '/static/account-settings.html')
})

//app.get('/', (req, res) => {res.sendFile(__dirname + '/index.html')})
//app.get("/", (req, res) => {
  //  res.sendFile(__dirname + "/index.html")
//})



app.listen(port, ()=> console.log('listening'))