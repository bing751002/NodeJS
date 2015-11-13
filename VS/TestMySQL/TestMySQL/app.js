var express = require("express");
var mysql = require('mysql');
var bodyParser = require("body-parser"); // Require Body parser module
var route = express.Router();
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '80082',
    database : 'test2'
});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data



connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});


/*
route.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!'});
});
*/

app.get("/:table/:id", function (req, res) {
    
    connection.query('SELECT * FROM  ' + req.params.table + ' WHERE UUID =' + req.params.id + ';', function (err, rows, fields)
        {
        
        if (rows != null && rows[0] != null) {
            if (req.params.table == "gwstate") {
                var msg = {
                    "APCONFIG": rows[0].APCONFIG,
                    "HOSTNAME": rows[0].HOSTNAME,
                    "GETURL": rows[0].GETURL,
                    "PUTURL": rows[0].PUTURL,
                    "BLEDEFDEV": rows[0].BLEDEFDEV,
                    "BLECONNLIST": rows[0].BLECONNLIST,
                    "BLELOSTCONNLIST": rows[0].BLELOSTCONNLIST,
                    "DATE": rows[0].DATE
                }
                res.json(msg);

            }
            else
            res.json(rows[0]);
        }
        else {
            var data = { "ERROR": "id or table does not exist" };
            res.json(data);
        }
    }
    );
 });

app.put("/:table/:id", function (req, res) {
    connection.query('SELECT * FROM ' +req.params.table +  ' WHERE UUID = ' + req.params.id , function (err, rows, fields) {
        if (rows!=null && rows[0] != null) {
            if (req.params.table == 'operation') {
                connection.query('UPDATE ' + req.params.table + ' SET  _CHANGE = ' + req.body.CHANGE + ', CMD = ' + req.body.CMD + ' , DATA = ' + req.body.DATA + ' , BLE_AD = ' + req.body.ble + ' WHERE UUID = ' + req.params.id + ';', function (err, rows2, fields) {
                    if (err) {
                        res.send('update data into database failed', err);
                        console.log(err);
                    }
                    else {
                        res.send('update data successful');                    }

                })
            }
            else if (req.params.table == 'message') {
                connection.query('UPDATE ' + req.params.table + ' SET  _CHANGE = ' + req.body.CHANGE + ', MSG = ' + req.body.MSG + ' , DATA = ' + req.body.DATA + ' , BLE_AD = ' + req.body.BLE_AD + ' , DATE =' + req.body.DATE + ' WHERE UUID = ' + req.params.id + ';', function (err, rows2, fields) {
                    if (err) {
                        res.send('update data into database failed'+ err);
                        console.log(err);
                    }
                    else {
                        res.send('update data successful');
                    }

                })
            }
            else if(req.params.table == 'gwstate') {
                connection.query('UPDATE ' + req.params.table + ' SET  APCONFIG = ' + req.body.APCONFIG + ', HOSTNAME = ' + req.body.HOSTNAME + ' , GETURL = ' + req.body.GETURL + ' , PUTURL = ' + req.body.PUTURL + ' , BLEDEFDEV =' + req.body.BLEDEFDEV + ' , BLECONNLIST =' + req.body.BLECONNLIST + ' , BLELOSTCONNLIST =' + req.body.BLELOSTCONNLIST + ' , DATE =' + req.body.DATE + ' WHERE UUID = ' + req.params.id + ';', function (err, rows2, fields) {
                    if (err) {
                        res.send('update data into database failed' + err);
                    }
                    else {
                        res.send('update data successful');
                    }

                })
            }
        }
        else {
            if (req.params.table == 'message') {
                connection.query('INSERT INTO ' + req.params.table + '(_CHANGE, MSG, DATA, BLE_AD, UUID, DATE) VALUES (' 
                + req.body.change + ',' 
                + req.body.msg + ', ' 
                + req.body.data + ',' 
                + req.body.ble + ', ' 
                + req.params.id + ',' 
                + req.body.date + ')' , function (err, rows, fields) {
                    if (err) {
                        res.send('insert data into database failed');
                        console.log(err);
                    }
                    else {
                        res.send('insert data successful');
                    }
                });
            }
            else if (req.params.table == 'operation') {
                connection.query('INSERT INTO ' + req.params.table + '(_CHANGE, CMD, DATA, BLE, UUID) VALUES (' 
                + req.body.change + ',' 
                + req.body.cmd + ', ' 
                + req.body.data + ',' 
                + req.body.ble + ', ' 
                + req.params.id + ')' , function (err, rows, fields) {
                    if (err) {
                        res.send('insert data into database failed');
                        console.log(err);
                    }
                    else {
                        res.send('insert data successful');
                    }
                });
            }
            else if (req.params.table == 'gwstate') {
                connection.query('INSERT INTO ' + req.params.table + '(APCONFIG, HOSTNAME, GETURL, PUTURL, BLEDEFDEV, BLECONNLIST, BLELOSTCONNLIST, uuid, DATE) VALUES (' 
                + req.body.APCONFIG + ',' 
                + req.body.HOSTNAME + ', ' 
                + req.body.GETURL + ',' 
                + req.body.PUTURL + ', ' 
                + req.body.BLEDEFDEV + ', ' 
                + req.body.BLECONNLIST + ', ' 
                + req.body.BLELOSTCONNLIST + ', ' 
                + req.params.id + ', ' 
                + req.body.DATE + ')' , function (err, rows, fields) {
                    if (err) {
                        res.send('insert data into database failed');
                        console.log(err);
                    }
                    else {
                        res.send('insert data successful');
                    }
                });
            }
            }
        
    });
});





app.listen(3000);
console.log('Magic happens at http://localhost:3000');
