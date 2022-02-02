const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword@123',
    database: 'employeesystem',
    multipleStatements: true
})

app.post('/create', (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
    'INSERT INTO employees (name, age, country, position,wage) VALUES(?,?,?,?,?)', 
    [name, age, country, position, wage], 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Values inserted")
        }
    })

});

app.get('/employees' ,(req, res) => {
    db.query('SELECT * FROM employees',(err, result) => {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)

        }
    })
})

app.listen(3001, () => {
    console.log("yey,your server is running on port 3001")
})