const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'db_enquetes',
})


app.post('/api/create', (req, res) => {
    const date = new Date();
    const sendingData = { ...req.body };
    const dataArr = [req.body.title, req.body.actualDate, req.body.actualHours, req.body.expireDate, req.body.expireTime, req.body.option1, req.body.option2, req.body.option3, req.body.option4, req.body.option5, req.body.option6]
    const postQuery = 'INSERT INTO tb_post (title, post_time_date, post_time_horario, fim_enquete_date, fim_enquete_horario, option1, option2, option3, option4, option5, option6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?)';

    db.query(postQuery, [...dataArr], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
    console.log(dataArr);
})

app.get('/api/get', (req, res) => {
    const gettingData = "SELECT * FROM tb_post";
    db.query(gettingData, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("everything is working well")
})